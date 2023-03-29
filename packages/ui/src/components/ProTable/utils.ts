import { SortDirection } from '../../graphql/constants';
import { IQueryConfig, ISort } from '../../graphql/types';

type TTieBreaker = {
    sort: ISort[];
    defaultSort: ISort[];
    field: string;
    order: SortDirection;
};
export const tieBreaker = ({ field, defaultSort, order = SortDirection.Asc, sort }: TTieBreaker): ISort[] => {
    const resultSort = sort.length > 0 ? sort : defaultSort;
    return resultSort.some((e) => e.field === field) ? resultSort : ([...resultSort, { field, order }] as ISort[]);
};

export const reverseSortDirection = (queryConfig: IQueryConfig): ISort[] =>
    queryConfig.sort.map((sort: ISort) => {
        if (!sort.order) {
            return sort;
        }

        return {
            ...sort,
            order: sort.order === SortDirection.Asc ? SortDirection.Desc : SortDirection.Asc,
        };
    });

export const resetSearchAfterQueryConfig = (
    queryConfig: IQueryConfig,
    setQueryConfig: (queryConfig: IQueryConfig) => void,
): void => {
    setQueryConfig({
        ...queryConfig,
        firstPageFlag: undefined,
        operations: undefined,
        pageIndex: 1,
        searchAfter: undefined,
    });
};
