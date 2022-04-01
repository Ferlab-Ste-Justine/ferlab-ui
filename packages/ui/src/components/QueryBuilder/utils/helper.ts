import { clone, isEqual } from 'lodash';
import { ISyntheticSqon } from '../../../data/sqon/types';
import { IQueriesState, IQueryBuilderState } from '../types';

const removeTotal = (sqonList: ISyntheticSqon[]) =>
    sqonList.map((query) => {
        const { total, ...syntheticSqon } = query;
        return syntheticSqon;
    });

export const isQueryStateEqual = (queryBuilderState: IQueryBuilderState, queriesState: IQueriesState) => {
    const cleanedQueriesState: IQueryBuilderState = {
        active: queriesState.activeId,
        state: removeTotal(clone(queriesState.queries)),
    };
    const cleanedQueryBuilderState: IQueryBuilderState = {
        ...queryBuilderState,
        state: removeTotal(clone(queryBuilderState.state ?? [])),
    };

    return isEqual(cleanedQueryBuilderState, cleanedQueriesState);
};
