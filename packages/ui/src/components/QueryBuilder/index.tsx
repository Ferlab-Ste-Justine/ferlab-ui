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
import { ISyntheticSqon, TSqonGroupOp } from '../../data/types';
import {
    combineSyntheticSqons,
    isEmptySqon,
    isIndexReferencedInSqon,
    isNotEmptySqon,
    removeContentFromSqon,
    removeSqonAtIndex,
} from '../../data/SqonUtils';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilder.module.scss';

export interface IQueryBuilderProps {
    className?: string;
    dictionary?: IDictionary;
    total?: number;
    IconTotal?: React.ReactNode;
    currentQuery?: ISyntheticSqon | Record<string, never>;
    onRemoveFacet: TCallbackRemoveAction;
    onRemoveReference: TCallbackRemoveReferenceAction;
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
    onRemoveFacet,
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
    const [activeQuery, setActiveQuery] = useState(initialState?.active || v4());
    const [showLabels, setShowLabels] = useState(initialShowLabelState);
    const [queries, setQueries] = useState<ISyntheticSqon[]>(initialState?.state || []);
    const [selectedSqonIndices, setSelectedSqonIndices] = useState<number[]>([]);
    const [selectedCombineOperator, setSelectedCombineOperator] = useState<TSqonGroupOp>('and');

    const emptyQueries = queries.filter((sqon) => isEmptySqon(sqon));
    const noData = queries.length === emptyQueries.length;
    const hasEmptyQuery = emptyQueries.length >= 1;
    const canCombine = queries.filter((sqon) => isNotEmptySqon(sqon)).length >= 2 && selectedSqonIndices.length >= 2;
    const currentActiveSqonIndex = queries.findIndex((sqon) => sqon.id === activeQuery);
    const selectedSyntheticSqon = queries[currentActiveSqonIndex];
    const getColorForReference = (refIndex: number) => referenceColors[refIndex % referenceColors.length];
    const isSqonReferenced = (sqonIndex: number) => isIndexReferencedInSqon(sqonIndex, selectedSyntheticSqon);

    const updateQueryById = (id: string, newQuery: ISyntheticSqon) => {
        const updatedQueries = [...queries];
        const currentQueryIndex = queries.findIndex((obj) => obj.id === id);
        if (isEmpty(newQuery.content)) {
            setQueries(updatedQueries.filter((q: ISyntheticSqon) => q.id != id));
            deleteQueryAndSetNext(id);
        } else {
            updatedQueries[currentQueryIndex] = {
                ...newQuery,
                op: newQuery.op,
                content: newQuery.content,
            };
            setQueries(updatedQueries);
        }
    };

    const findNextSelectedQuery = (currentQueryIndex: number) => {
        return currentQueryIndex + 1 > queries.length - 1
            ? currentQueryIndex - 1 < queries.length
                ? currentQueryIndex - 1
                : queries.length - 1
            : currentQueryIndex + 1;
    };

    const deleteQueryAndSetNext = (id: string) => {
        const currentQueryIndex = queries.findIndex((obj) => obj.id === id);
        const nextSelectedIndex = findNextSelectedQuery(currentQueryIndex);
        const nextQuery = queries[nextSelectedIndex];
        const nextID = nextQuery.id;
        if (selectedSqonIndices.includes(currentQueryIndex)) {
            setSelectedSqonIndices(selectedSqonIndices.filter((index: number) => index !== currentQueryIndex));
        }
        setQueries(removeSqonAtIndex(currentQueryIndex, queries));
        setActiveQuery(nextID!);
        onChangeQuery(nextID!, nextQuery);
    };

    useEffect(() => {
        if (queries.length > 0) {
            const queryState = queries.find((sqon) => sqon.id === activeQuery);
            if (isNotEmptySqon(queryState!) && isEmptySqon(currentQuery)) {
                onChangeQuery(activeQuery, queryState!);
            }
        }

        if (isEmpty(queries) && isEmptySqon(currentQuery) && total === 0) {
            setQueries([
                {
                    op: currentQuery.op,
                    content: currentQuery.content,
                    id: activeQuery,
                    total: total,
                },
            ]);
        }
    }, []);

    useEffect(() => {
        if ((isEmptySqon(currentQuery) && total === 0) || loading) return;
        if (queries.length === 0) {
            setQueries([
                {
                    op: currentQuery.op,
                    content: currentQuery.content,
                    id: activeQuery,
                    total: total,
                },
            ]);
        } else {
            const tmpQuery = queries.map((obj) => {
                if (obj.id === activeQuery) {
                    return { ...obj, total, ...currentQuery };
                }
                return { ...obj };
            });

            // Manage to remove multiple empty queries and put one at the bottom
            let newQueries = tmpQuery;
            const currentEmptyQueries = tmpQuery.filter((obj) => isEmptySqon(obj));
            if (currentEmptyQueries.length >= 1) {
                const emptyQuery = currentEmptyQueries[0];
                const fullQueries = tmpQuery.filter((obj) => isNotEmptySqon(obj));
                newQueries = [...fullQueries, emptyQuery];
            }

            setQueries(newQueries);
        }
    }, [currentQuery, total, loading]);

    useEffect(() => {
        onUpdate(getUpdatedState(queries, activeQuery));
    }, [queries, activeQuery]);

    return (
        <StackLayout className={`${styles.container} ${className}`} vertical>
            <StackLayout className={styles.queryBars} vertical>
                {queries.map((sqon, i) => (
                    <QueryBar
                        id={sqon.id!}
                        key={sqon.id}
                        index={i}
                        Icon={IconTotal}
                        actionDisabled={isEmptySqon(sqon)}
                        isActive={sqon.id === activeQuery}
                        canDelete={!noData}
                        dictionary={dictionary}
                        getColorForReference={getColorForReference}
                        onChangeQuery={(id, query) => {
                            setActiveQuery(id);
                            onChangeQuery(id, query);
                        }}
                        onCombineChange={(id, combinator) => {
                            const updatedQueries = [...queries];
                            const currentQueryIndex = queries.findIndex((obj) => obj.id === id);
                            const currentQuery = updatedQueries[currentQueryIndex];
                            const newQuery = { content: currentQuery.content, op: combinator };
                            updatedQueries[currentQueryIndex] = {
                                ...currentQuery,
                                op: newQuery.op,
                                content: newQuery.content,
                            };
                            setQueries(updatedQueries);
                            onChangeQuery(id, newQuery);
                        }}
                        onDeleteQuery={(id) => {
                            if (queries.length === 1) {
                                setQueries([{ id, total: 0, op: 'and', content: [] }]);
                                onChangeQuery('', {});
                                return;
                            }

                            deleteQueryAndSetNext(id);
                        }}
                        onDuplicate={(_, query) => {
                            const newId = v4();

                            setActiveQuery(newId);
                            setQueries([
                                ...queries,
                                { id: newId, total: query.total, op: query.op, content: query.content },
                            ]);
                            onChangeQuery(newId, query);
                        }}
                        onRemoveFacet={onRemoveFacet}
                        onRemoveReference={(refIndex, query) => {
                            updateQueryById(query.id!, removeContentFromSqon(refIndex, query));
                        }}
                        onSelectBar={(id, toRemove) => {
                            if (toRemove) {
                                setSelectedSqonIndices(selectedSqonIndices.filter((index: number) => index !== id));
                                return;
                            }

                            setSelectedSqonIndices([...selectedSqonIndices, id]);
                        }}
                        query={sqon}
                        isReferenced={isSqonReferenced(i)}
                        isSelected={selectedSqonIndices.includes(i)}
                        selectionDisabled={queries.length === 1 || !enableCombine}
                        showLabels={showLabels}
                        total={sqon.total!}
                    />
                ))}
            </StackLayout>
            <StackLayout className={styles.actions}>
                {!enableSingleQuery && (
                    <Button
                        className={styles.buttons}
                        disabled={noData || hasEmptyQuery}
                        onClick={() => {
                            const id = v4();

                            setActiveQuery(id);
                            setQueries([...queries, { id, op: 'and', content: [], total: 0 }]);
                        }}
                        size="small"
                    >
                        <AiOutlinePlus />
                        {dictionary.actions?.addQuery || 'New query'}
                    </Button>
                )}
                {enableCombine && (
                    <Dropdown.Button
                        disabled={!canCombine}
                        size="small"
                        overlay={
                            <Menu>
                                <Menu.Item onClick={() => setSelectedCombineOperator('and')}>
                                    <AndOperator />
                                </Menu.Item>
                                <Menu.Item onClick={() => setSelectedCombineOperator('or')}>
                                    <OrOperator />
                                </Menu.Item>
                            </Menu>
                        }
                        trigger={['click']}
                        onClick={() => {
                            const newSyntheticSqon = combineSyntheticSqons(
                                selectedSqonIndices,
                                queries,
                                selectedCombineOperator,
                            );
                            setActiveQuery(newSyntheticSqon.id);
                            setSelectedSqonIndices([]);
                            setQueries([...queries, newSyntheticSqon]);
                            onChangeQuery(newSyntheticSqon.id, newSyntheticSqon);
                        }}
                    >
                        {dictionary.actions?.combine || 'Combine'}
                    </Dropdown.Button>
                )}
                {enableShowHideLabels && (
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
                {!noData && (
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
                                    setSelectedSqonIndices([]);
                                    setQueries([{ id: activeQuery, op: 'and', content: [], total: 0 }]);
                                    onChangeQuery(activeQuery, {});
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
    );
};

export default QueryBuilder;
