import { isEqual } from 'lodash';
import { isNotEmptySqon } from '../../../data/sqon/utils';
import { IQueriesState, ISavedFilter } from '../types';

export const isNewUnsavedFilter = (selectedSavedFilter: ISavedFilter, savedFilters: ISavedFilter[]) =>
    !selectedSavedFilter ||
    !savedFilters!.find((savedFilter: ISavedFilter) => savedFilter.id == selectedSavedFilter?.id);

export const hasQueries = (queriesState: IQueriesState) =>
    queriesState.queries.filter((sqon) => isNotEmptySqon(sqon)).length > 0;

export const hasUnsavedChanges = (
    selectedSavedFilter: ISavedFilter,
    savedFilters: ISavedFilter[],
    queriesState: IQueriesState,
) => {
    if (!(selectedSavedFilter && !isNewUnsavedFilter(selectedSavedFilter, savedFilters))) {
        return false;
    }

    if (selectedSavedFilter.queries?.length != queriesState.queries?.length) {
        return true;
    }

    return !selectedSavedFilter.queries.every((savedFilterQuery) => {
        const foundQuery = queriesState.queries.find((query) => query.id == savedFilterQuery.id);

        return !foundQuery
            ? false
            : isEqual(
                  {
                      id: foundQuery?.id,
                      op: foundQuery?.op,
                      content: foundQuery?.content,
                  },
                  {
                      id: savedFilterQuery?.id,
                      op: savedFilterQuery?.op,
                      content: savedFilterQuery?.content,
                  },
              );
    });
};
