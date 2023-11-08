import React, { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { v4 } from 'uuid';

import { BooleanOperators } from '../../data/sqon/operators';
import { IRemoteComponent, ISyntheticSqon, TSyntheticSqonContent } from '../../data/sqon/types';
import {
    changeCombineOperator,
    getDefaultSyntheticSqon,
    isEmptySqon,
    isIndexReferencedInSqon,
    isNotEmptySqon,
    removeContentFromSqon,
    removeQueryFromSqon,
    removeSqonAtIndex,
} from '../../data/sqon/utils';
import ConditionalWrapper from '../utils/ConditionalWrapper';

import { isQueryStateEqual } from './utils/helper';
import useQueryBuilderState, { setQueryBuilderState } from './utils/useQueryBuilderState';
import {
    defaultCustomPillConfig,
    defaultFacetFilterConfig,
    defaultHeaderConfig,
    QueryBuilderContext,
    QueryCommonContext,
} from './context';
import QueryBuilderHeader from './Header';
import QueryBar from './QueryBar';
import QueryTools from './QueryTools';
import {
    ArrayTenOrMore,
    defaultReferenceColors,
    ICustomPillConfig,
    IDictionary,
    IFacetFilterConfig,
    IFetchQueryCount,
    IGetResolvedQueryForCount,
    IQueriesState,
    IQueryBuilderHeaderConfig,
} from './types';

import styles from './index.module.scss';

export interface IQueryBuilderProps {
    id: string;
    className?: string;
    dictionary?: IDictionary;
    total?: number;
    IconTotal?: React.ReactNode;
    currentQuery?: ISyntheticSqon | Record<string, never>;
    enableCombine?: boolean;
    enableSingleQuery?: boolean;
    enableShowHideLabels?: boolean;
    initialShowLabelState?: boolean;
    referenceColors?: ArrayTenOrMore<string>;
    headerConfig?: IQueryBuilderHeaderConfig;
    facetFilterConfig?: IFacetFilterConfig;
    customPillConfig?: ICustomPillConfig;
    fetchQueryCount: IFetchQueryCount;
    getResolvedQueryForCount: IGetResolvedQueryForCount;
    remoteComponentMapping?: (props: IRemoteComponent) => void;
}

const QueryBuilder = ({
    className = '',
    id = '',
    dictionary = {},
    total = 0,
    IconTotal = null,
    currentQuery = {},
    enableCombine = false,
    enableSingleQuery = false,
    enableShowHideLabels = false,
    initialShowLabelState = true,
    referenceColors = defaultReferenceColors,
    headerConfig = defaultHeaderConfig,
    facetFilterConfig = defaultFacetFilterConfig,
    customPillConfig = defaultCustomPillConfig,
    fetchQueryCount,
    getResolvedQueryForCount,
    remoteComponentMapping,
}: IQueryBuilderProps): JSX.Element => {
    const [selectedSavedFilter, setSelectedSavedFilter] = useState(headerConfig?.selectedSavedFilter || null);
    const { state: queryBuilderState } = useQueryBuilderState(id);
    const [queriesState, setQueriesState] = useState<IQueriesState>({
        activeId: queryBuilderState?.active || v4(),
        queries: queryBuilderState?.state || [],
    });
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
                content: newQuery.content,
                op: newQuery.op,
            };
            setQueriesState({
                ...queriesState,
                queries: cleanUpQueries(updatedQueries),
            });
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
            queries: [getDefaultSyntheticSqon(id)],
        });
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
    ) => {
        const newQuery = { content: content, id: id, op: op };
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

    const onCombineClick = (operator: BooleanOperators) => {
        addNewQuery(v4(), operator, selectedQueryIndices.sort());
        setSelectedQueryIndices([]);
    };

    const showQueryTools = () =>
        !noQueries &&
        ((!enableSingleQuery && !canCombine) ||
            (enableCombine && canCombine) ||
            (enableShowHideLabels && !canCombine) ||
            (!canCombine && queryCount > 1));

    useEffect(() => {
        if (selectedSavedFilter?.queries?.length!) {
            const activeQuery = selectedSavedFilter.queries.find(({ id }) => id === queryBuilderState?.active);
            const activeId = activeQuery?.id ?? selectedSavedFilter.queries[0].id!;

            setQueriesState({
                activeId: activeId,
                queries: selectedSavedFilter.queries,
            });
        }
    }, [JSON.stringify(selectedSavedFilter)]);

    useEffect(() => {
        if (!isEmpty(headerConfig?.selectedSavedFilter!)) {
            setSelectedSavedFilter(headerConfig?.selectedSavedFilter!);
        }
    }, [headerConfig?.selectedSavedFilter]);

    useEffect(() => {
        if (
            isEmpty(queriesState.queries) &&
            isEmptySqon(currentQuery) &&
            total === 0 &&
            !headerConfig.savedFilters?.length
        ) {
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
                        content: currentQuery.content,
                        id: queriesState.activeId,
                        op: currentQuery.op,
                    },
                ],
            });
        } else {
            const index = queriesState.queries.findIndex((obj) => obj.id == queriesState.activeId);
            const current = queriesState.queries[index];

            if (current.content && current.content.length > 0 && isEmpty(currentQuery)) {
                deleteQueryAndSetNext(queriesState.activeId);
            } else {
                const tmpQuery = queriesState.queries.map((obj) => {
                    // Ensure there is always a op and content
                    if (obj.id === queriesState.activeId) {
                        return {
                            ...obj,
                            content: currentQuery.content ? currentQuery.content : [],
                            op: obj.op || BooleanOperators.and,
                        };
                    }
                    return {
                        ...obj,
                        content: obj.content ? obj.content : [],
                        op: obj.op || BooleanOperators.and,
                    };
                });

                setQueriesState({
                    ...queriesState,
                    queries: cleanUpQueries(tmpQuery),
                });
            }
        }
    }, [JSON.stringify(currentQuery)]);

    useEffect(() => {
        if (queryBuilderState) {
            if (!isQueryStateEqual(queryBuilderState, queriesState)) {
                setQueriesState({
                    activeId: queryBuilderState?.active!,
                    queries: queryBuilderState.state!,
                });
            }
        }
    }, [JSON.stringify(queryBuilderState)]);

    useEffect(() => {
        if (queryBuilderState) {
            if (!isQueryStateEqual(queryBuilderState, queriesState)) {
                setQueryBuilderState(id, {
                    active: queriesState.activeId,
                    state: queriesState.queries,
                });
            }
        }
    }, [JSON.stringify(queriesState)]);

    return (
        <QueryCommonContext.Provider value={{ dictionary, facetFilterConfig, showLabels }}>
            <QueryBuilderContext.Provider
                value={{
                    canCombine,
                    customPillConfig,
                    enableCombine,
                    enableShowHideLabels,
                    enableSingleQuery,
                    hasEmptyQuery,
                    headerConfig,
                    noQueries,
                    queriesState,
                    queryBuilderId: id,
                    selectedSavedFilter,
                }}
            >
                <ConditionalWrapper
                    condition={true}
                    wrapper={(children: JSX.Element) =>
                        headerConfig?.showHeader ? (
                            <QueryBuilderHeader
                                onSavedFilterChange={setSelectedSavedFilter}
                                resetQueriesState={resetQueries}
                            >
                                {children}
                            </QueryBuilderHeader>
                        ) : (
                            <div className={`${styles.queryBuilderWrapper} ${className}`}>{children}</div>
                        )
                    }
                >
                    <div className={`${styles.queryBuilderContainer} ${className}`}>
                        <div className={styles.queryBars}>
                            {queriesState.queries.map((sqon, i) => (
                                <QueryBar
                                    Icon={IconTotal}
                                    actionDisabled={isEmptySqon(sqon)}
                                    fetchQueryCount={fetchQueryCount}
                                    getColorForReference={getColorForReference}
                                    getResolvedQueryForCount={getResolvedQueryForCount}
                                    id={sqon.id!}
                                    index={i}
                                    isActive={sqon.id! === queriesState.activeId}
                                    isReferenced={isIndexReferencedInSqon(i, selectedSyntheticSqon)}
                                    isSelected={selectedQueryIndices.includes(i)}
                                    key={sqon.id!}
                                    onChangeQuery={(id) => {
                                        setQueriesState((prevState) => ({
                                            ...prevState,
                                            activeId:
                                                prevState.queries.findIndex((obj) => obj.id == id) != -1
                                                    ? id
                                                    : queriesState.activeId,
                                        }));
                                    }}
                                    onCombineChange={(id, combinator) => {
                                        const updatedQueries = cloneDeep(queriesState.queries);
                                        const currentQueryIndex = getQueryIndexById(id);
                                        const currentQuery = updatedQueries[currentQueryIndex];
                                        const newQuery = changeCombineOperator(combinator, currentQuery);

                                        updatedQueries[currentQueryIndex] = {
                                            ...currentQuery,
                                            content: newQuery.content,
                                            op: newQuery.op,
                                        };

                                        setQueriesState((prevState) => ({
                                            ...prevState,
                                            queries: cleanUpQueries(updatedQueries),
                                        }));
                                    }}
                                    onDeleteQuery={deleteQueryAndSetNext}
                                    onDuplicate={(_, query) =>
                                        addNewQuery(v4(), query.op as BooleanOperators, query.content)
                                    }
                                    onRemoveFacet={(field, query) => {
                                        updateQueryById(query.id!, removeContentFromSqon(field, query));
                                    }}
                                    onRemoveQuery={(id, query) => {
                                        updateQueryById(query.id!, removeQueryFromSqon(id, query));
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
                                    remoteComponentMapping={remoteComponentMapping}
                                    selectionDisabled={
                                        queriesState.queries.length === 1 ||
                                        !enableCombine ||
                                        queriesState.queries[i].content.length === 0
                                    }
                                    updateQueryById={updateQueryById}
                                />
                            ))}
                        </div>
                        {showQueryTools() && (
                            <QueryTools
                                addNewQuery={addNewQuery}
                                onCombineClick={onCombineClick}
                                onDeleteAll={() => {
                                    setSelectedQueryIndices([]);
                                    resetQueries(queriesState.activeId);
                                }}
                                queryCount={queryCount}
                                setShowLabels={setShowLabels}
                            />
                        )}
                    </div>
                </ConditionalWrapper>
            </QueryBuilderContext.Provider>
        </QueryCommonContext.Provider>
    );
};

export default QueryBuilder;
