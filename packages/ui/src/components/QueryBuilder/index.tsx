import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { cloneDeep, isEqual } from 'lodash';
import { createBrowserHistory, History } from 'history';
import isEmpty from 'lodash/isEmpty';
import QueryBar from './QueryBar';
import QueryTools from './QueryTools';
import StackLayout from '../../layout/StackLayout';
import QueryBuilderHeader from './QueryBuilderHeader';
import ConditionalWrapper from '../utils/ConditionalWrapper';
import { BooleanOperators } from '../../data/sqon/operators';
import { IDictionary, TOnChange, ArrayTenOrMore } from './types';
import { ISyntheticSqon, TSyntheticSqonContent } from '../../data/sqon/types';
import { getQueryBuilderCache, getQueryParams, setQueryBuilderCache, updateQueryParam } from '../../data/filters/utils';
import {
    changeCombineOperator,
    isEmptySqon,
    isIndexReferencedInSqon,
    isNotEmptySqon,
    removeContentFromSqon,
    removeSqonAtIndex,
} from '../../data/sqon/utils';

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
    showHeader?: boolean;
    showHeaderTools?: boolean;
    headerTitle?: string;
    enableCombine?: boolean;
    enableSingleQuery?: boolean;
    enableShowHideLabels?: boolean;
    initialShowLabelState?: boolean;
    initialState?: IInitialQueryState | Record<any, any>;
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

const QueryBuilder = ({
    className = '',
    cacheKey = '',
    filtersKey = 'filters',
    history = createBrowserHistory(),
    dictionary = {},
    total = 0,
    IconTotal = null,
    currentQuery = {},
    onChangeQuery = undefined,
    onUpdate = undefined,
    loading = false,
    showHeader = false,
    showHeaderTools = false,
    headerTitle = 'Query Builder',
    enableCombine = false,
    enableSingleQuery = false,
    enableShowHideLabels = false,
    initialShowLabelState = true,
    initialState = {},
    referenceColors = [
        '#C31D7E',
        '#328536',
        '#AA00FF',
        '#C2410C',
        '#047ABE',
        '#E5231F',
        '#007D85',
        '#C51162',
        '#7B5A90',
        '#B85C00',
        '#722ED1',
        '#4D7C0F',
        '#9F1239',
        '#2D7D9A',
        '#847545',
    ],
}: IQueryBuilderProps) => {
    const [queriesState, setQueriesState] = useState<{
        activeId: string;
        queries: ISyntheticSqon[];
    }>({
        activeId: initialState?.active || getQueryBuilderCache(cacheKey).active || v4(),
        queries: initialState?.state || getQueryBuilderCache(cacheKey).state || [],
    });
    const [queryBuilderCollapsed, toggleQueryBuilder] = useState(false);
    const [showLabels, setShowLabels] = useState(initialShowLabelState);
    const [selectedQueryIndices, setSelectedQueryIndices] = useState<number[]>([]);
    const emptyQueries = queriesState.queries.filter((sqon) => isEmptySqon(sqon));
    const noQueries = queriesState.queries.length === emptyQueries.length;
    const queryCount = queriesState.queries.length - emptyQueries.length;
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

    const findNextSelectedQuery = (queries: ISyntheticSqon[], currentQueryIndex: number) => {
        if (queries.length - 1 >= currentQueryIndex) {
            return currentQueryIndex;
        }

        if (currentQueryIndex + 1 > queries.length - 1) {
            if (currentQueryIndex - 1 < queries.length && currentQueryIndex - 1 >= 0) {
                return currentQueryIndex - 1;
            } else {
                return queries.length - 1;
            }
        }

        return currentQueryIndex + 1;
    };

    const resetQueries = (id: string) => {
        setQueriesState({
            activeId: id,
            queries: [{ id, total: 0, op: BooleanOperators.and, content: [] }],
        });
        onQueryChange(id, {});
    };

    const deleteQueryAndSetNext = (id: string) => {
        if (queriesState.queries.length === 1) {
            resetQueries(id);
        } else {
            const currentQueryIndex = getQueryIndexById(id);
            const updatedQueries = cleanUpQueries(removeSqonAtIndex(currentQueryIndex, queriesState.queries));

            if (updatedQueries.length) {
                const nextSelectedIndex = findNextSelectedQuery(updatedQueries, currentQueryIndex);
                const nextQuery = updatedQueries[nextSelectedIndex];
                const nextID = nextQuery.id!;

                if (selectedQueryIndices.includes(currentQueryIndex)) {
                    setSelectedQueryIndices(
                        selectedQueryIndices.filter((index: number) => index !== currentQueryIndex),
                    );
                }

                setQueriesState({
                    activeId: nextID!,
                    queries: updatedQueries,
                });
            } else {
                resetQueries(id);
            }
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
        let newQueries = tmpQuery;
        const currentEmptyQueries = tmpQuery.filter((obj) => isEmptySqon(obj));
        const fullQueries = tmpQuery.filter((obj) => isNotEmptySqon(obj));
        if (currentEmptyQueries.length) {
            const emptyQuery = currentEmptyQueries[0];
            newQueries = cloneDeep([...fullQueries, emptyQuery]);
        }
        return newQueries;
    };

    const onQueryChange = (id: string, query: ISyntheticSqon | Record<string, never>) =>
        onChangeQuery ? onChangeQuery(id, query) : updateQueryParam(history, filtersKey, query);

    const onCombineClick = (operator: BooleanOperators) => {
        addNewQuery(v4(), operator, selectedQueryIndices.sort());
        setSelectedQueryIndices([]);
    };

    const showQueryTools = () =>
        (!enableSingleQuery && !canCombine) ||
        (enableCombine && canCombine) ||
        (enableShowHideLabels && !canCombine) ||
        (!noQueries && !canCombine && queryCount > 1);

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
        <ConditionalWrapper
            condition={showHeader}
            wrapper={(children: JSX.Element) => (
                <QueryBuilderHeader
                    title={headerTitle}
                    collapsed={queryBuilderCollapsed}
                    noQueries={noQueries}
                    showTools={showHeaderTools}
                    hasEmptyQuery={hasEmptyQuery}
                    enableSingleQuery={enableSingleQuery}
                    dictionary={dictionary}
                    toggleQb={toggleQueryBuilder}
                    onAddQuery={() => addNewQuery()}
                    onDeleteQuery={() => deleteQueryAndSetNext(queriesState.activeId)}
                >
                    {children}
                </QueryBuilderHeader>
            )}
        >
            <StackLayout
                className={`${styles.container} ${!queryBuilderCollapsed && styles.hasHeader} ${className}`}
                vertical
            >
                <StackLayout className={styles.queryBars} vertical>
                    {queriesState.queries.map((sqon, i) => (
                        <QueryBar
                            id={sqon.id!}
                            key={sqon.id!}
                            index={i}
                            Icon={IconTotal}
                            actionDisabled={isEmptySqon(sqon)}
                            isActive={sqon.id! === queriesState.activeId}
                            canDelete={!noQueries}
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
                                    setSelectedQueryIndices(
                                        selectedQueryIndices.filter((index: number) => index !== id),
                                    );
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
                {showQueryTools() && (
                    <QueryTools
                        dictionary={dictionary}
                        showLabels={showLabels}
                        noQueries={noQueries}
                        enableSingleQuery={enableSingleQuery}
                        canCombine={canCombine}
                        enableCombine={enableCombine}
                        hasEmptyQuery={hasEmptyQuery}
                        enableShowHideLabels={enableShowHideLabels}
                        addNewQuery={addNewQuery}
                        queryCount={queryCount}
                        onDeleteAll={() => {
                            setSelectedQueryIndices([]);
                            resetQueries(queriesState.activeId);
                        }}
                        onCombineClick={onCombineClick}
                        setShowLabels={setShowLabels}
                    />
                )}
            </StackLayout>
        </ConditionalWrapper>
    );
};

export default QueryBuilder;
