import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { AiOutlinePlus } from 'react-icons/ai';
import { Button, Dropdown, Menu, Modal, Switch } from 'antd';
import isEmpty from 'lodash/isEmpty';
import StackLayout from '../../layout/StackLayout';
import AndOperator from './icons/AndOperator';
import OrOperator from './icons/OrOperator';
import QueryBar from './QueryBar';
import { IDictionary, TCallbackRemoveAction, TCallbackRemoveReferenceAction, TOnChange, ArrayTenOrMore } from './types';
import { ISyntheticSqon, IValueFilter, TSyntheticSqonContent } from '../../data/sqon/types';
import {
    changeCombineOperator,
    generateEmptyQuery,
    isEmptySqon,
    isIndexReferencedInSqon,
    isNotEmptySqon,
    removeContentFromSqon,
    removeSqonAtIndex,
} from '../../data/sqon/utils';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilder.module.scss';
import { BooleanOperators } from '../../data/sqon/operators';

export interface IQueryBuilderProps {
    className?: string;
    dictionary?: IDictionary;
    total?: number;
    IconTotal?: React.ReactNode;
    currentQuery?: ISyntheticSqon | Record<string, never>;
    onChangeQuery: TOnChange;
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
    dictionary = {},
    total = 0,
    IconTotal = null,
    currentQuery = {},
    onChangeQuery,
    onUpdate = (f) => f,
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
    const [selectedQueryId, setSelectedQueryId] = useState(initialState?.active || v4());
    const [showLabels, setShowLabels] = useState(initialShowLabelState);
    const [queries, setQueries] = useState<ISyntheticSqon[]>(initialState?.state || []);
    const [selectedQueryIndices, setSelectedQueryIndices] = useState<number[]>([]);
    const [selectedCombineOperator, setSelectedCombineOperator] = useState<BooleanOperators>(BooleanOperators.and);

    const emptyQueries = queries.filter((sqon) => isEmptySqon(sqon));
    const noData = queries.length === emptyQueries.length;
    const hasEmptyQuery = emptyQueries.length >= 1;
    const canCombine = queries.filter((sqon) => isNotEmptySqon(sqon)).length >= 2 && selectedQueryIndices.length >= 2;
    const currentActiveSqonIndex = queries.findIndex((sqon) => sqon.id === selectedQueryId);
    const selectedSyntheticSqon = queries[currentActiveSqonIndex];
    const getColorForReference = (refIndex: number) => referenceColors[refIndex % referenceColors.length];

    const updateQueryById = (id: string, newQuery: ISyntheticSqon) => {
        const currentQueryIndex = queries.findIndex((obj) => obj.id === id);
        console.log(id);
        console.log(newQuery);
        console.log(currentActiveSqonIndex);

        if (isEmpty(newQuery.content)) {
            deleteQueryAndSetNext(id);
        } else {
            const updatedQueries = [...queries];
            updatedQueries[currentQueryIndex] = {
                ...newQuery,
                op: newQuery.op,
                content: newQuery.content,
            };
            setQueries(updatedQueries);
            onChangeQuery(id, newQuery);
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
        if (queries.length === 1) {
            onChangeQuery('', {});
            setQueries([{ id, total: 0, op: BooleanOperators.and, content: [] }]);
        } else {
            const currentQueryIndex = queries.findIndex((obj) => obj.id === id);
            const updatedQueries = removeSqonAtIndex(currentQueryIndex, queries);
            const nextSelectedIndex = findNextSelectedQuery(updatedQueries, currentQueryIndex);
            const nextQuery = updatedQueries[nextSelectedIndex];
            const nextID = nextQuery.id;

            if (selectedQueryIndices.includes(currentQueryIndex)) {
                setSelectedQueryIndices(selectedQueryIndices.filter((index: number) => index !== currentQueryIndex));
            }

            setQueries(updatedQueries);
            setSelectedQueryId(nextID!);
            onChangeQuery(nextID!, nextQuery);
        }
    };

    const addNewQuery = (
        id: string = v4(),
        op: BooleanOperators = BooleanOperators.and,
        content: TSyntheticSqonContent = [],
        total: number = 0,
    ) => {
        const newQuery = { id: id, op: op, content: content, total: total };
        setSelectedQueryId(id);
        onChangeQuery(id, newQuery);
        setQueries(formatEmptyQueries([...queries, newQuery]));
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

    useEffect(() => {
        if (queries.length > 0) {
            const queryState = queries.find((sqon) => sqon.id === selectedQueryId);
            if (isNotEmptySqon(queryState!) && isEmptySqon(currentQuery)) {
                onChangeQuery(selectedQueryId, queryState!);
            }
        }

        if (isEmpty(queries) && isEmptySqon(currentQuery) && total === 0) {
            addNewQuery();
        }
    }, []);

    useEffect(() => {
        if ((isEmptySqon(currentQuery) && total === 0) || loading) return;
        if (queries.length === 0) {
            setQueries([
                {
                    op: currentQuery.op,
                    content: currentQuery.content,
                    id: selectedQueryId,
                    total: total,
                },
            ]);
        } else {
            const tmpQuery = queries.map((obj) => {
                if (obj.id === selectedQueryId) {
                    return { ...obj, ...currentQuery, total };
                }
                return { ...obj };
            });

            setQueries(formatEmptyQueries(tmpQuery));
        }
    }, [currentQuery, total, loading]);

    useEffect(() => {
        onUpdate(getUpdatedState(queries, selectedQueryId));
    }, [queries, selectedQueryId]);

    return (
        <StackLayout className={`${styles.container} ${className}`} vertical>
            <StackLayout className={styles.queryBars} vertical>
                {queries.map((sqon, i) => (
                    <QueryBar
                        id={sqon.id!}
                        key={sqon.id!}
                        index={i}
                        Icon={IconTotal}
                        actionDisabled={isEmptySqon(sqon)}
                        isActive={sqon.id! === selectedQueryId}
                        canDelete={!noData}
                        dictionary={dictionary}
                        getColorForReference={getColorForReference}
                        onChangeQuery={(id, query) => {
                            setSelectedQueryId(id);
                            onChangeQuery(id, query);
                        }}
                        onCombineChange={(id, combinator) => {
                            const updatedQueries = [...queries];
                            const currentQueryIndex = queries.findIndex((obj) => obj.id === id);
                            const currentQuery = updatedQueries[currentQueryIndex];

                            const newQuery = changeCombineOperator(combinator, currentQuery);
                            updatedQueries[currentQueryIndex] = {
                                ...currentQuery,
                                op: newQuery.op,
                                content: newQuery.content,
                            };

                            setQueries(updatedQueries);
                            onChangeQuery(id, updatedQueries[currentQueryIndex]);
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
                        selectionDisabled={queries.length === 1 || !enableCombine}
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
                                        setQueries([
                                            { id: selectedQueryId, op: BooleanOperators.and, content: [], total: 0 },
                                        ]);
                                        onChangeQuery(selectedQueryId, {});
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
