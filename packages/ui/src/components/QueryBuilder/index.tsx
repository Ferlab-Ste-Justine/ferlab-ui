import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { cloneDeep } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import ConditionalWrapper from '../utils/ConditionalWrapper';
import QueryBuilderHeader from './Header';
import QueryBar from './QueryBar';
import QueryTools from './QueryTools';
import { BooleanOperators } from '../../data/sqon/operators';
import {
    IDictionary,
    ArrayTenOrMore,
    IFacetFilterConfig,
    IQueryBuilderHeaderConfig,
    IQueriesState,
    IQueryBuilderState,
    IFetchQueryCount,
    IGetResolvedQueryForCount,
} from './types';
import { ISyntheticSqon, TSyntheticSqonContent } from '../../data/sqon/types';
import {
    changeCombineOperator,
    getDefaultSyntheticSqon,
    isEmptySqon,
    isIndexReferencedInSqon,
    isNotEmptySqon,
    removeContentFromSqon,
    removeSqonAtIndex,
} from '../../data/sqon/utils';
import useQueryBuilderState, { setQueryBuilderState } from './utils/useQueryBuilderState';
import { isQueryStateEqual } from './utils/helper';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilder.module.scss';

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
    fetchQueryCount: IFetchQueryCount;
    getResolvedQueryForCount: IGetResolvedQueryForCount;
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
    headerConfig = {
        showHeader: false,
        showTools: false,
        defaultTitle: 'Untitled Filter',
        options: {
            enableDuplicate: true,
            enableEditTitle: true,
            enableShare: false,
            enableFavoriteFilter: false,
            enableUndoChanges: false,
        },
        savedFilters: [],
        selectedSavedFilter: null,
        onSetAsFavorite: () => {},
        onShareFilter: () => {},
        onUpdateFilter: () => {},
        onSaveFilter: () => {},
        onDeleteFilter: () => {},
    },
    facetFilterConfig = {
        enable: false,
        onFacetClick: () => {},
        blacklistedFacets: [],
    },
    fetchQueryCount,
    getResolvedQueryForCount,
}: IQueryBuilderProps) => {
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
                op: newQuery.op,
                content: newQuery.content,
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
        const newQuery = { id: id, op: op, content: content };
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
                        op: currentQuery.op,
                        content: currentQuery.content,
                        id: queriesState.activeId,
                    },
                ],
            });
        } else {
            const index = queriesState.queries.findIndex((obj) => obj.id == queriesState.activeId);
            const current = queriesState.queries[index];

            if (current.content && current.content.length > 0 && isEmpty(currentQuery)) {
                deleteQueryAndSetNext(queriesState.activeId);
            } else {
                let tmpQuery = queriesState.queries.map((obj) => {
                    // Ensure there is always a op and content
                    if (obj.id === queriesState.activeId) {
                        return {
                            ...obj,
                            op: obj.op || BooleanOperators.and,
                            content: currentQuery.content ? currentQuery.content : [],
                        };
                    }
                    return {
                        ...obj,
                        op: obj.op || BooleanOperators.and,
                        content: obj.content ? obj.content : [],
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
        <ConditionalWrapper
            condition={true}
            wrapper={(children: JSX.Element) =>
                headerConfig?.showHeader ? (
                    <QueryBuilderHeader
                        queryBuilderId={id}
                        config={headerConfig}
                        queriesState={queriesState}
                        selectedSavedFilter={selectedSavedFilter!}
                        onSavedFilterChange={setSelectedSavedFilter}
                        dictionary={dictionary}
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
                            id={sqon.id!}
                            key={sqon.id!}
                            index={i}
                            Icon={IconTotal}
                            queryBuilderId={id}
                            actionDisabled={isEmptySqon(sqon)}
                            isActive={sqon.id! === queriesState.activeId}
                            canDelete={!noQueries}
                            dictionary={dictionary}
                            getColorForReference={getColorForReference}
                            onChangeQuery={(id, query) => {
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
                            }}
                            onDeleteQuery={deleteQueryAndSetNext}
                            onDuplicate={(_, query) => addNewQuery(v4(), query.op as BooleanOperators, query.content)}
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
                            facetFilterConfig={facetFilterConfig}
                            isReferenced={isIndexReferencedInSqon(i, selectedSyntheticSqon)}
                            isSelected={selectedQueryIndices.includes(i)}
                            selectionDisabled={queriesState.queries.length === 1 || !enableCombine}
                            showLabels={showLabels}
                            fetchQueryCount={fetchQueryCount}
                            getResolvedQueryForCount={getResolvedQueryForCount}
                        />
                    ))}
                </div>
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
            </div>
        </ConditionalWrapper>
    );
};

export default QueryBuilder;
