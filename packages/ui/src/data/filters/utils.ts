import { isEmpty } from 'lodash';
import get from 'lodash/get';
import qs from 'query-string';

import {
    IFacetDictionary,
    IFilter,
    IFilterGroup,
    TExtendedMapping,
    TFilterGroupDefaults,
    VisualType,
} from '../../components/filters/types';
import { BooleanOperators } from '../sqon/operators';
import { ISyntheticSqon, TSqonGroupOp, TSyntheticSqonContent } from '../sqon/types';
import { createSQONFromFilters, isReference } from '../sqon/utils';

import { isRangeAgg } from './Range';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getQueryParams = (search: string | null = null) =>
    search ? qs.parse(search) : qs.parse(window.location.search);

/** @deprecated */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const updateFilters = (history: any, filterGroup: IFilterGroup, selected: IFilter[], index?: string): void =>
    updateQueryFilters(history, filterGroup.field, createSQONFromFilters(filterGroup, selected, index));

export const getFilterType = (fieldType: string): VisualType => {
    if (['long', 'float', 'double', 'integer', 'date'].includes(fieldType)) {
        return VisualType.Range;
    } else if (['boolean'].includes(fieldType)) {
        return VisualType.Toggle;
    }
    return VisualType.Checkbox;
};

/** @deprecated */
export const updateQueryFilters = (
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    history: any,
    field: string,
    filters: TSyntheticSqonContent,
    operator: TSqonGroupOp = BooleanOperators.and,
): void => {
    const currentFilter = getFiltersQuery();

    let newFilters: ISyntheticSqon | Record<string, unknown> = { content: filters, op: operator };

    if (!isEmpty(currentFilter)) {
        const results = getFilterWithNoSelection(currentFilter, field);

        const fieldIndex = results[0];
        const filterWithoutSelection = results[1] as ISyntheticSqon;

        if (isEmpty(filterWithoutSelection.content) && isEmpty(filters)) {
            newFilters = {};
        } else {
            if (typeof fieldIndex === 'number' && fieldIndex >= 0) {
                filterWithoutSelection.content.splice(fieldIndex as number, 0, ...filters);
            } else {
                filterWithoutSelection.content = [...filterWithoutSelection.content, ...filters];
            }

            newFilters = {
                ...filterWithoutSelection,
                content: [...filterWithoutSelection.content],
            };
        }
    }

    updateQueryParam(history, 'filters', newFilters);
};

/** @deprecated */
const getFilterWithNoSelection = (filters: ISyntheticSqon, field: string) => {
    let fieldIndex = -1;
    const filtered = filters.content.filter((filter: any, index: number) => {
        if (isReference(filter)) {
            return true;
        }

        if (filter.content.field == field) {
            fieldIndex = index;
        }
        return filter.content.field !== field;
    });

    return [
        fieldIndex,
        {
            ...filters,
            content: filtered,
        },
    ];
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const updateQueryParam = (history: any, key: string, value: any): void => {
    const query = getQueryParams();

    if (isEmpty(value) && !query[key]) {
        return;
    }
    if (isEmpty(value) && query[key]) {
        delete query[key];
    } else {
        query[key] = typeof value === 'object' ? JSON.stringify(value) : value;
    }

    if (history) {
        history.push({
            search: `?${qs.stringify(query)}`,
        });
    } else {
        window.location.search = `?${qs.stringify(query)}`;
    }
};

/** @deprecated */
export const getFiltersQuery = (search: any = null): ISyntheticSqon => {
    const filters = readQueryParam('filters', { defaultValue: JSON.stringify({}) }, search);

    return JSON.parse(filters);
};

interface IValues<T> {
    defaultValue: T;
    whiteList?: Array<T>;
}

export const readQueryParam = <T = ''>(key: string, options: IValues<T>, search: any = null): any => {
    const query = getQueryParams(search);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return get<any, any, T>(query, key, options.defaultValue)!;
};

interface IUsefilters {
    filters: {
        content: never[];
        op: BooleanOperators;
    };
}
/** @deprecated */
export const useFilters = (filterKey = 'filters'): IUsefilters => {
    let filters = { filters: { content: [], op: BooleanOperators.and } };
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has(filterKey) && searchParams.get(filterKey)) {
        try {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const filterData = JSON.parse(searchParams.get(filterKey)!);
            if (typeof filterData == 'object') {
                filters = { filters: filterData };
            }
        } catch {}
    }

    return filters;
};

/** @deprecated */
export const getQueryBuilderCache = (type: string): any => {
    const items = localStorage.getItem(`query-builder-cache-${type}`);

    if (isEmpty(items)) {
        return {};
    }

    try {
        // To support old query builder cache format
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const qbCache = JSON.parse(items!);
        const state = qbCache.state || [];
        return {
            ...qbCache,
            state: state.map((queryState: any) => {
                if (queryState.query) {
                    return {
                        content: [],
                        id: queryState.id,
                        op: BooleanOperators.and,
                        total: queryState.total,
                        ...queryState.query,
                    };
                } else {
                    return queryState;
                }
            }),
        };
    } catch (e) {
        return {};
    }
};

/** @deprecated */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const setQueryBuilderCache = (type: string, items: any): void => {
    localStorage.setItem(`query-builder-cache-${type}`, JSON.stringify(items));
};

interface IQueryParams {
    [key: string]: string | any;
}

export const createQueryParams = (queryParams: IQueryParams): string => {
    const query: Record<string, string> = {};
    for (const queryKey in queryParams) {
        if (typeof queryParams[queryKey] === 'object') {
            query[queryKey] = JSON.stringify(queryParams[queryKey]);
        } else {
            query[queryKey] = queryParams[queryKey] as string;
        }
    }

    return `?${qs.stringify(query)}`;
};

interface IGetFilterGroup {
    extendedMapping: TExtendedMapping | undefined;
    aggregation: any;
    rangeTypes: string[];
    filterFooter: boolean;
    headerTooltip?: boolean;
    dictionary?: IFacetDictionary;
    noDataInputOption?: boolean;
    intervalDecimal?: number;
    defaults?: TFilterGroupDefaults;
}

export const getFilterGroup = ({
    aggregation,
    defaults,
    dictionary,
    extendedMapping,
    filterFooter,
    headerTooltip,
    intervalDecimal,
    noDataInputOption = true,
    rangeTypes,
}: IGetFilterGroup): IFilterGroup => {
    if (isRangeAgg(aggregation)) {
        return {
            config: {
                defaultMax: defaults?.max,
                defaultMin: defaults?.min,
                defaultOperator: defaults?.operator,
                intervalDecimal,
                max: aggregation.stats.max,
                min: aggregation.stats.min,
                noDataInputOption: noDataInputOption,
                rangeTypes: rangeTypes.map((r) => ({
                    key: r,
                    name: r,
                })),
            },
            field: extendedMapping?.field || '',
            headerTooltip: headerTooltip
                ? get(dictionary, `tooltips.${extendedMapping?.field}`, extendedMapping?.displayName || '')
                : undefined,
            title: get(dictionary, `${extendedMapping?.field}`, extendedMapping?.displayName || ''),
            type: getFilterType(extendedMapping?.type || ''),
        };
    }

    return {
        config: {
            withFooter: filterFooter,
        },
        field: extendedMapping?.field || '',
        headerTooltip: headerTooltip
            ? get(dictionary, `tooltips.${extendedMapping?.field}`, extendedMapping?.displayName || '')
            : undefined,
        title: get(dictionary, `${extendedMapping?.field}`, extendedMapping?.displayName || ''),
        type: getFilterType(extendedMapping?.type || ''),
    };
};
