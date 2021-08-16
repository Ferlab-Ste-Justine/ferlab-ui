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
import { cloneDeep, isEqual } from 'lodash';

import { IDictionary, TOnChange, ArrayTenOrMore } from './types';
import { ISyntheticSqon, TSyntheticSqonContent } from '../../data/sqon/types';
import { getQueryBuilderCache, getQueryParams, setQueryBuilderCache, updateQueryParam } from '../../data/filters/utils';
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
    const getQueryIndexById = (id: string) => queriesState.queries.findIndex((obj) => obj.id === id);
    const canCombine =
        queriesState.queries.filter((sqon) => isNotEmptySqon(sqon)).length >= 2 && selectedQueryIndices.length >= 2;
    const currentActiveSqonIndex = getQueryIndexById(queriesState.activeId);
    const selectedSyntheticSqon = queriesState.queries[currentActiveSqonIndex];
    const getColorForReference = (refIndex: number) => referenceColors[refIndex % referenceColors.length];

    const updateQueryById = (id: string, newQuery: ISyntheticSqon) => {
        if (isEmpty(newQuery.content)) {
            deleteQueryAndSetNext(id);
        } else {
            const currentQueryIndex = getQueryIndexById(id);
            const updatedQueries = cloneDeep(queriesState.queries);
            updatedQueries[currentQueryIndex] = {
                ...newQuery,
                op: newQuery.op,
                content: newQuery.content,
            };
            setQueriesState({
                ...queriesState,
                queries: cleanUpQueries(updatedQueries),
            });
            onQueryChange!(id, newQuery);
        }
    };

    const findNextSelectedQuery = (queries: ISyntheticSqon[], currentQueryIndex: number) =>
        queries.length - 1 >= currentQueryIndex
            ? currentQueryIndex
            : currentQueryIndex + 1 > queries.length - 1
            ? currentQueryIndex - 1 < queries.length && currentQueryIndex - 1 >= 0
                ? currentQueryIndex - 1
                : queries.length - 1
            : currentQueryIndex + 1;

    const deleteQueryAndSetNext = (id: string) => {
        if (queriesState.queries.length === 1) {
            setQueriesState({
                ...queriesState,
                queries: [{ id, total: 0, op: BooleanOperators.and, content: [] }],
            });
            onQueryChange('', {});
        } else {
            const currentQueryIndex = getQueryIndexById(id);

            console.log(removeSqonAtIndex(currentQueryIndex, queriesState.queries));

            const updatedQueries = cleanUpQueries(removeSqonAtIndex(currentQueryIndex, queriesState.queries));
            const nextSelectedIndex = findNextSelectedQuery(updatedQueries, currentQueryIndex);
            const nextQuery = updatedQueries[nextSelectedIndex];
            const nextID = nextQuery.id;

            console.log()
            console.log(updatedQueries);

            if (selectedQueryIndices.includes(currentQueryIndex)) {
                setSelectedQueryIndices(selectedQueryIndices.filter((index: number) => index !== currentQueryIndex));
            }

            setQueriesState({
                activeId: nextID!,
                queries: updatedQueries,
            });
        }
    };

    const addNewQuery = (
        id: string = v4(),
        op: BooleanOperators = BooleanOperators.and,
        content: TSyntheticSqonContent = [],
        total: number = 0,
    ) => {
        const newQuery = { id: id, op: op, content: content, total: total };
        setQueriesState({
            activeId: id,
            queries: cleanUpQueries(cloneDeep([...queriesState.queries, newQuery])),
        });
    };

    const cleanUpQueries = (tmpQuery: ISyntheticSqon[]) => {
        // Manage to remove multiple empty queries and put one at the bottom
        let newQueries = tmpQuery;
        const currentEmptyQueries = tmpQuery.filter((obj) => isEmptySqon(obj));
        const fullQueries = tmpQuery.filter((obj) => isNotEmptySqon(obj));
        if (currentEmptyQueries.length) {
            const emptyQuery = currentEmptyQueries.length ? currentEmptyQueries[0] : generateEmptyQuery();
            newQueries = cloneDeep([...fullQueries, emptyQuery]);
        }

        return newQueries;
    };

    const onQueryChange = (id: string, query: ISyntheticSqon | Record<string, never>) =>
        onChangeQuery ? onChangeQuery(id, query) : updateQueryParam(history, filtersKey, query);

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
        if (isEmptySqon(currentQuery) && total === 0) return;
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
                    return {
                        ...obj,
                        content: currentQuery.content ? currentQuery.content : [],
                        total: loading ? currentQuery.total : total,
                    };
                }
                return { ...obj };
            });

            setQueriesState({
                ...queriesState,
                queries: cleanUpQueries(tmpQuery),
            });
        }
    }, [currentQuery, total, loading]);

    useEffect(() => {
        let index = getQueryIndexById(queriesState.activeId);
        onQueryChange!(queriesState.activeId, queriesState.queries[index]);
    }, [queriesState.activeId]);

    useEffect(() => {
        const newState = getUpdatedState(queriesState.queries, queriesState.activeId);
        if (onUpdate) {
            onUpdate(newState);
        } else {
            setQueryBuilderCache(cacheKey, newState);

            const queryParams = getQueryParams();
            if (queryParams['filters']) {
                const currentQueryParams = JSON.parse(queryParams['filters'] as string) as ISyntheticSqon;
                const associatedQuery = queriesState.queries.filter((query) => query.id == currentQueryParams.id);
                if (associatedQuery.length && !isEqual(currentQueryParams.content, associatedQuery[0].content)) {
                    onQueryChange(associatedQuery[0].id!, associatedQuery[0]);
                }
            }
        }
    }, [queriesState.queries]);

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
                        onChangeQuery={(id) => {
                            setQueriesState((prevState) => {
                                return {
                                    ...prevState,
                                    activeId:
                                        prevState.queries.findIndex((obj) => obj.id == id) != -1
                                            ? id
                                            : queriesState.activeId,
                                };
                            });
                        }}
                        onCombineChange={(id, combinator) => {
                            const updatedQueries = cloneDeep(queriesState.queries);
                            const currentQueryIndex = getQueryIndexById(id);
                            const currentQuery = updatedQueries[currentQueryIndex];
                            const newQuery = changeCombineOperator(combinator, currentQuery);

                            updatedQueries[currentQueryIndex] = {
                                ...currentQuery,
                                op: newQuery.op,
                                content: newQuery.content,
                            };

                            setQueriesState((prevState) => {
                                return {
                                    ...prevState,
                                    queries: cleanUpQueries(updatedQueries),
                                };
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
