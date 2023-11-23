import { cloneDeep, isEqual } from 'lodash';

import { ISyntheticSqon } from '../../../data/sqon/types';
import { IQueriesState, IQueryBuilderState } from '../types';

const removeTotal = (sqonList: ISyntheticSqon[]) =>
    sqonList.map((query) => {
        const { total, ...syntheticSqon } = query;
        return syntheticSqon;
    });

export const isQueryStateEqual = (queryBuilderState: IQueryBuilderState, queriesState: IQueriesState): boolean => {
    const cleanedQueriesState: IQueryBuilderState = {
        active: queriesState.activeId,
        state: removeTotal(cloneDeep(queriesState.queries)),
    };
    const cleanedQueryBuilderState: IQueryBuilderState = {
        ...queryBuilderState,
        state: removeTotal(cloneDeep(queryBuilderState.state ?? [])),
    };

    return isEqual(cleanedQueryBuilderState, cleanedQueriesState);
};
