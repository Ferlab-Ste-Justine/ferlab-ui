import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { AiOutlinePlus } from 'react-icons/ai';
import { Button, Dropdown, Menu, Modal, Switch } from 'antd';
import isEmpty from 'lodash/isEmpty';
import StackLayout from '../../layout/StackLayout';
import AndOperator from './icons/AndOperator';
import OrOperator from './icons/OrOperator';
import QueryBar from './QueryBar';
import { createBrowserHistory, History } from 'history';

import { IDictionary, TOnChange, ArrayTenOrMore } from './types';
import { ISyntheticSqon, TSyntheticSqonContent } from '../../data/sqon/types';
import { getQueryBuilderCache, setQueryBuilderCache, updateQueryParam } from '../../data/filters/utils';
import {
    changeCombineOperator,
    generateEmptyQuery,
    isEmptySqon,
    isIndexReferencedInSqon,
    isNotEmptySqon,
    removeContentFromSqon,
    removeSqonAtIndex,
} from '../../data/sqon/utils';
import { BooleanOperators } from '../../data/sqon/operators';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilder.module.scss';

export interface IQueryBuilderProps {
    cacheKey: string;
    history?: History;
    filtersKey?: string;
    className?: string;
    dictionary?: IDictionary;
    total?: number;
    IconTotal?: React.ReactNode;
    currentQuery?: ISyntheticSqon | Record<string, never>;
    onChangeQuery?: TOnChange;
    onUpdate?: (state: IInitialQueryState) => void;
    loading?: boolean;
    enableCombine?: boolean;
    enableSingleQuery?: boolean;
    enableShowHideLabels?: boolean;
    initialShowLabelState?: boolean;
    initialState?: IInitialQueryState;
    referenceColors?: ArrayTenOrMore<string>;
}

interface IInitialQueryState {
    state: ISyntheticSqon[];
    active: string;
}

const getUpdatedState = (state: ISyntheticSqon[], active: string): IInitialQueryState => ({
    active,
    state,
});

const QueryBuilder: React.FC<IQueryBuilderProps> = ({
    className = '',
    cacheKey = '',
    filtersKey = 'filters',
    history = createBrowserHistory(),
    dictionary = {},
    total = 0,
    IconTotal = null,
    currentQuery = {},
    onChangeQuery = null,
    onUpdate = null,
    loading = false,
    enableCombine = false,
    enableSingleQuery = false,
    enableShowHideLabels = false,
    initialShowLabelState = true,
    initialState = {},
    referenceColors = [
        '#d72981',
        '#ec7f22',
        '#03e07f',
        '#1867e2',
        '#44e5e6',
        '#b92be4',
        '#bf332e',
        '#0cd336',
        '#971c59',
        '#e34c8b',
        '#333399',
        '#660033',
        '#660066',
        '#336600',
    ],
}) => {
    const [queriesState, setQueriesState] = useState<{
        activeId: string;
        queries: ISyntheticSqon[];
    }>({
        activeId: initialState?.active || getQueryBuilderCache(cacheKey).active || v4(),
        queries: initialState?.state || getQueryBuilderCache(cacheKey).state || [],
    });
    const [showLabels, setShowLabels] = useState(initialShowLabelState);
    const [selectedQueryIndices, setSelectedQueryIndices] = useState<number[]>([]);
    const [selectedCombineOperator, setSelectedCombineOperator] = useState<BooleanOperators>(BooleanOperators.and);

    const emptyQueries = queriesState.queries.filter((sqon) => isEmptySqon(sqon));
    const noData = queriesState.queries.length === emptyQueries.length;
    const hasEmptyQuery = emptyQueries.length >= 1;
    const canCombine =
        queriesState.queries.filter((sqon) => isNotEmptySqon(sqon)).length >= 2 && selectedQueryIndices.length >= 2;
    const currentActiveSqonIndex = queriesState.queries.findIndex((sqon) => sqon.id === queriesState.activeId);
    const selectedSyntheticSqon = queriesState.queries[currentActiveSqonIndex];
    const getColorForReference = (refIndex: number) => referenceColors[refIndex % referenceColors.length];

    const updateQueryById = (id: string, newQuery: ISyntheticSqon) => {
        if (isEmpty(newQuery.content)) {
            deleteQueryAndSetNext(id);
        } else {
            const currentQueryIndex = queriesState.queries.findIndex((obj) => obj.id === id);
            const updatedQueries = [...queriesState.queries];
            updatedQueries[currentQueryIndex] = {
                ...newQuery,
                op: newQuery.op,
                content: newQuery.content,
            };
            setQueriesState({
                ...queriesState,
                queries: updatedQueries,
            });
            onQueryChange!(id, newQuery);
        }
    };

    const findNextSelectedQuery = (queries: ISyntheticSqon[], currentQueryIndex: number) => {
        return currentQueryIndex + 1 > queries.length - 1
            ? currentQueryIndex - 1 < queries.length && currentQueryIndex - 1 >= 0
                ? currentQueryIndex - 1
                : queries.length - 1
            : currentQueryIndex + 1;
    };

    const deleteQueryAndSetNext = (id: string) => {
        if (queriesState.queries.length === 1) {
            onQueryChange!('', {});
            setQueriesState({
                ...queriesState,
                queries: [{ id, total: 0, op: BooleanOperators.and, content: [] }],
            });
        } else {
            const currentQueryIndex = queriesState.queries.findIndex((obj) => obj.id === id);
            const updatedQueries = formatEmptyQueries(removeSqonAtIndex(currentQueryIndex, queriesState.queries));
            const nextSelectedIndex = findNextSelectedQuery(updatedQueries, currentQueryIndex);
            const nextQuery = updatedQueries[nextSelectedIndex];
            const nextID = nextQuery.id;

            if (selectedQueryIndices.includes(currentQueryIndex)) {
                setSelectedQueryIndices(selectedQueryIndices.filter((index: number) => index !== currentQueryIndex));
            }

            setQueriesState({
                activeId: nextID!,
                queries: updatedQueries,
            });
            onQueryChange!(nextID!, nextQuery);
        }
    };

    const addNewQuery = (
        id: string = v4(),
        op: BooleanOperators = BooleanOperators.and,
        content: TSyntheticSqonContent = [],
        total: number = 0,
    ) => {
        const newQuery = { id: id, op: op, content: content, total: total };
        onQueryChange!(id, newQuery);
        setQueriesState({
            activeId: id,
            queries: formatEmptyQueries([...queriesState.queries, newQuery]),
        });
    };

    const formatEmptyQueries = (tmpQuery: ISyntheticSqon[]) => {
        // Manage to remove multiple empty queries and put one at the bottom
        let newQueries = tmpQuery;
        const currentEmptyQueries = tmpQuery.filter((obj) => isEmptySqon(obj));
        const fullQueries = tmpQuery.filter((obj) => isNotEmptySqon(obj));
        if (!fullQueries.length) {
            const emptyQuery = currentEmptyQueries.length ? currentEmptyQueries[0] : generateEmptyQuery();
            newQueries = [...fullQueries, emptyQuery];
        }
        return newQueries;
    };

    const onQueryChange = (id: string, query: ISyntheticSqon | Record<string, never>) => {
        if (onChangeQuery) {
            onChangeQuery(id, query);
        } else {
            updateQueryParam(history, filtersKey, query);
        }
    };

    useEffect(() => {
        if (queriesState.queries.length > 0) {
            const queryState = queriesState.queries.find((sqon) => sqon.id === queriesState.activeId);
            if (isNotEmptySqon(queryState!) && isEmptySqon(currentQuery)) {
                onQueryChange!(queriesState.activeId, queryState!);
            }
        }

        if (isEmpty(queriesState.queries) && isEmptySqon(currentQuery) && total === 0) {
            addNewQuery();
        }
    }, []);

    useEffect(() => {
        if ((isEmptySqon(currentQuery) && total === 0) || loading) return;
        if (queriesState.queries.length === 0) {
            setQueriesState({
                ...queriesState,
                queries: [
                    {
                        op: currentQuery.op,
                        content: currentQuery.content,
                        id: queriesState.activeId,
                        total: total,
                    },
                ],
            });
        } else {
            let tmpQuery = queriesState.queries.map((obj) => {
                if (obj.id === queriesState.activeId) {
                    return { ...obj, ...currentQuery, total };
                }
                return { ...obj };
            });

            setQueriesState({
                ...queriesState,
                queries: formatEmptyQueries(tmpQuery),
            });
        }
    }, [currentQuery, total, loading]);

    useEffect(() => {
        const newState = getUpdatedState(queriesState.queries, queriesState.activeId);

        if (onUpdate) {
            onUpdate(newState);
        } else {
            setQueryBuilderCache(cacheKey, newState);
        }
    }, [queriesState]);

    return (
        <StackLayout className={`${styles.container} ${className}`} vertical>
            <StackLayout className={styles.queryBars} vertical>
                {queriesState.queries.map((sqon, i) => (
                    <QueryBar
                        id={sqon.id!}
                        key={sqon.id!}
                        index={i}
                        Icon={IconTotal}
                        actionDisabled={isEmptySqon(sqon)}
                        isActive={sqon.id! === queriesState.activeId}
                        canDelete={!noData}
                        dictionary={dictionary}
                        getColorForReference={getColorForReference}
                        onChangeQuery={(id, query) => {
                            setQueriesState({
                                ...queriesState,
                                activeId: id,
                            });
                            onQueryChange!(id, query);
                        }}
                        onCombineChange={(id, combinator) => {
                            const updatedQueries = [...queriesState.queries];
                            const currentQueryIndex = queriesState.queries.findIndex((obj) => obj.id === id);
                            const currentQuery = updatedQueries[currentQueryIndex];

                            const newQuery = changeCombineOperator(combinator, currentQuery);
                            updatedQueries[currentQueryIndex] = {
                                ...currentQuery,
                                op: newQuery.op,
                                content: newQuery.content,
                            };

                            setQueriesState({
                                ...queriesState,
                                queries: updatedQueries,
                            });
                            onQueryChange!(id, updatedQueries[currentQueryIndex]);
                        }}
                        onDeleteQuery={deleteQueryAndSetNext}
                        onDuplicate={(_, query) =>
                            addNewQuery(v4(), query.op as BooleanOperators, query.content, query.total)
                        }
                        onRemoveFacet={(filter, query) => {
                            updateQueryById(query.id!, removeContentFromSqon(filter, query));
                        }}
                        onRemoveReference={(refIndex, query) => {
                            updateQueryById(query.id!, removeContentFromSqon(refIndex, query));
                        }}
                        onSelectBar={(id, toRemove) => {
                            if (toRemove) {
                                setSelectedQueryIndices(selectedQueryIndices.filter((index: number) => index !== id));
                                return;
                            }
                            setSelectedQueryIndices([...selectedQueryIndices, id]);
                        }}
                        query={sqon}
                        isReferenced={isIndexReferencedInSqon(i, selectedSyntheticSqon)}
                        isSelected={selectedQueryIndices.includes(i)}
                        selectionDisabled={queriesState.queries.length === 1 || !enableCombine}
                        showLabels={showLabels}
                        total={sqon.total!}
                    />
                ))}
            </StackLayout>
            <StackLayout className={styles.actions}>
                <StackLayout className={styles.leftActions}>
                    {!enableSingleQuery && !canCombine && (
                        <Button
                            className={styles.buttons}
                            disabled={noData || hasEmptyQuery}
                            onClick={() => {
                                addNewQuery();
                            }}
                            size="small"
                        >
                            <AiOutlinePlus />
                            {dictionary.actions?.addQuery || 'New query'}
                        </Button>
                    )}
                    {enableCombine && canCombine && (
                        <Dropdown.Button
                            disabled={!canCombine}
                            size="small"
                            overlay={
                                <Menu selectedKeys={[selectedCombineOperator]}>
                                    <Menu.Item
                                        key={BooleanOperators.and}
                                        onClick={() => setSelectedCombineOperator(BooleanOperators.and)}
                                    >
                                        <AndOperator />
                                    </Menu.Item>
                                    <Menu.Item
                                        key={BooleanOperators.or}
                                        onClick={() => setSelectedCombineOperator(BooleanOperators.or)}
                                    >
                                        <OrOperator />
                                    </Menu.Item>
                                </Menu>
                            }
                            trigger={['click']}
                            onClick={() => {
                                addNewQuery(
                                    v4(),
                                    selectedCombineOperator as BooleanOperators,
                                    selectedQueryIndices.sort(),
                                );
                                setSelectedQueryIndices([]);
                            }}
                        >
                            {dictionary.actions?.combine || 'Combine'}
                        </Dropdown.Button>
                    )}
                    {enableShowHideLabels && !canCombine && (
                        <span className={`${styles.switch} ${styles.withLabel}`}>
                            <Switch
                                checked={showLabels}
                                size="small"
                                onChange={(checked) => {
                                    setShowLabels(checked);
                                }}
                            />
                            <span className={styles.label}>{dictionary.actions?.labels || 'Labels'}</span>
                        </span>
                    )}
                </StackLayout>
                <StackLayout className={styles.rightActions}>
                    {!noData && !canCombine && (
                        <Button
                            className={styles.buttons}
                            onClick={() =>
                                Modal.confirm({
                                    cancelText: dictionary.actions?.clear?.cancel || 'Cancel',
                                    content:
                                        dictionary.actions?.clear?.description ||
                                        'You are about to delete all your queries. They will be lost forever.',
                                    okText: dictionary.actions?.clear?.confirm || 'Delete',
                                    onOk: () => {
                                        setSelectedQueryIndices([]);
                                        setQueriesState({
                                            ...queriesState,
                                            queries: [
                                                {
                                                    id: queriesState.activeId,
                                                    op: BooleanOperators.and,
                                                    content: [],
                                                    total: 0,
                                                },
                                            ],
                                        });
                                        onQueryChange!(queriesState.activeId, {});
                                    },
                                    title: dictionary.actions?.clear?.title || 'Delete all queries?',
                                })
                            }
                            size="small"
                            type="link"
                        >
                            {dictionary.actions?.clear?.buttonTitle || 'Clear all'}
                        </Button>
                    )}
                </StackLayout>
            </StackLayout>
        </StackLayout>
    );
};

export default QueryBuilder;
