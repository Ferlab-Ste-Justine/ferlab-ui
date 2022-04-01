import { v4 } from 'uuid';
import { useEffect, useState } from 'react';
import { ISyntheticSqon, MERGE_VALUES_STRATEGIES, TSyntheticSqonContent } from '../../../data/sqon/types';
import { BooleanOperators, TermOperators } from '../../../data/sqon/operators';
import { IQueryBuilderState } from '../types';
import { IFilter, IFilterGroup } from '../../filters/types';
import {
    deepMergeFieldInActiveQuery,
    getUpdatedActiveQuery,
    getUpdatedActiveQueryByFilterGroup,
} from '../../../data/sqon/utils';

export const QB_UPDATE_EVENT_KEY = 'QBCacheUpdate';
export const QB_CACHE_KEY_PREFIX = 'query-builder-cache';

type TQBUpdateEvent = Event & {
    key?: string;
    value?: IQueryBuilderState;
};

/**
 * Dynamically add new query to a given QueryBuilder
 *
 * @param params
 * ```json
 * - queryBuilderId: QueryBuilder unique identifier
 * - query: Synthetic sqon to add
 * - setAsActive: To set this query as active
 * ```
 */
export const addQuery = ({
    queryBuilderId,
    query,
    setAsActive = false,
}: {
    queryBuilderId: string;
    query: ISyntheticSqon;
    setAsActive?: boolean;
}) => {
    const qbState = getQueryBuilderState(queryBuilderId);
    setQueryBuilderState(queryBuilderId, {
        active: setAsActive ? query.id! : qbState?.active ?? query.id!,
        state: [query, ...qbState?.state!],
    });
};

/**
 * Get the current active query from a given QueryBuilder
 *
 * @param queryBuilderId QueryBuilder unique identifier
 */
export const getActiveQuery = (queryBuilderId: string) => {
    const qbState = getQueryBuilderState(queryBuilderId);
    return (
        qbState?.state?.find(({ id }) => id === qbState.active) ?? {
            content: [],
            op: BooleanOperators.and,
        }
    );
};

/**
 * Dynamically update the filters of the active query of a given QueryBuilder
 * by generating sqon content using FilterGroup and Filter
 *
 * @param params
 * ```json
 * - queryBuilderId: QueryBuilder unique identifier
 * - filterGroup: FilterGroup config
 * - selected: Selected filter value list
 * - index: Index related to the selected filters
 * ```
 */
export const updateActiveQueryFilters = ({
    queryBuilderId,
    filterGroup,
    selectedFilters,
    index,
}: {
    queryBuilderId: string;
    filterGroup: IFilterGroup;
    selectedFilters: IFilter[];
    index?: string;
}) =>
    updateQuery({
        queryBuilderId,
        query: getUpdatedActiveQueryByFilterGroup({
            queryBuilderId,
            filterGroup,
            selectedFilters,
            index,
        }),
    });

/**
 * Dynamically update the filters of the active query of a given QueryBuilder
 *
 * @param params
 * ```json
 * - queryBuilderId: QueryBuilder unique identifier
 * - field: Field name to update
 * - sqonContent: List of sqon content to use
 * - operator: Boolean Operator
 * ```
 */
export const updateActiveQuery = ({
    queryBuilderId,
    field,
    sqonContent,
    operator = BooleanOperators.and,
}: {
    queryBuilderId: string;
    field: string;
    sqonContent: TSyntheticSqonContent;
    operator?: BooleanOperators;
}) =>
    updateQuery({
        queryBuilderId,
        query: getUpdatedActiveQuery({
            queryBuilderId,
            field,
            sqonContent,
            operator,
        }),
    });

/**
 * Dynamically add field value to the active query of a given QueryBuilder by
 * deep merging the values using a Merge Strategy
 *
 *
 * @param params
 * ```json
 * - queryBuilderId: QueryBuilder unique identifier
 * - field: Field name to update
 * - value: List of values for the given field
 * - merge_strategy: How to merge the values
 * - operator: Term operator
 * - index: Index related to the field
 * ```
 */
export const addFieldToActiveQuery = ({
    queryBuilderId,
    field,
    value,
    merge_strategy = MERGE_VALUES_STRATEGIES.APPEND_VALUES,
    operator = TermOperators.in,
    index,
}: {
    queryBuilderId: string;
    field: string;
    value: Array<string | number | boolean>;
    merge_strategy?: MERGE_VALUES_STRATEGIES;
    operator?: TermOperators;
    index?: string;
}) =>
    updateQuery({
        queryBuilderId,
        query: deepMergeFieldInActiveQuery({
            queryBuilderId,
            field,
            value,
            index,
            merge_strategy,
            operator,
        }),
    });

const updateQuery = ({ queryBuilderId, query }: { queryBuilderId: string; query: ISyntheticSqon }) => {
    const qbState = getQueryBuilderState(queryBuilderId);
    const queryToUpdate = qbState?.state?.find(({ id }) => id === query.id)!;
    queryToUpdate.content = query.content;
    queryToUpdate.op = query.op;

    setQueryBuilderState(queryBuilderId, qbState!);
};

/**
 * Update the state of a given QueryBuilder.
 * Dispatch a custom QueryBuilder Update event.
 *
 * @param queryBuilderId QueryBuilder unique identifier
 * @param value The new state value
 * ```
 */
export const setQueryBuilderState = (queryBuilderId: string, value: IQueryBuilderState) => {
    const QBUpdateEvent: TQBUpdateEvent = new Event(QB_UPDATE_EVENT_KEY);

    QBUpdateEvent.key = queryBuilderId;
    QBUpdateEvent.value = value;

    window.localStorage.setItem(`${QB_CACHE_KEY_PREFIX}-${queryBuilderId}`, JSON.stringify(value));
    document.dispatchEvent(QBUpdateEvent);
};

export const getQueryBuilderState = (queryBuilderId: string): IQueryBuilderState | undefined => {
    const qbState = window.localStorage.getItem(`${QB_CACHE_KEY_PREFIX}-${queryBuilderId}`);

    if (!qbState) return undefined;

    return JSON.parse(qbState);
};

/**
 * Custom hook used to listen to state changes for a given QueryBuilder.
 *
 * @param queryBuilderId: QueryBuilder unique identifier
 *
 * @returns The state and the activeQuery of the QueryBuilder.
 */
const useQueryBuilderState = (queryBuilderId: string) => {
    const [state, setState] = useState<IQueryBuilderState | undefined>(getQueryBuilderState(queryBuilderId));

    useEffect(() => {
        const listener = (event: TQBUpdateEvent) => {
            if (event.key === queryBuilderId) {
                setState({
                    active: event.value?.active ?? v4(),
                    state: event.value?.state ?? [],
                });
            }
        };

        document.addEventListener(QB_UPDATE_EVENT_KEY, listener);

        return () => window.removeEventListener(QB_UPDATE_EVENT_KEY, listener);
    }, []);

    return {
        state,
        activeQueryId: state?.active,
        queryList: state?.state ?? [],
        activeQuery: getActiveQuery(queryBuilderId),
    };
};

export default useQueryBuilderState;
