import qs from 'query-string';
import get from 'lodash/get';
import { isEmpty } from 'lodash';
import {
    IFilter,
    IFilterCount,
    IFilterGroup,
    IFilterRange,
    IFilterText,
    VisualType,
} from '../../components/filters/types';
import {
    ISyntheticSqon,
    IValueContent,
    IValueFilter,
    TSqonContent,
    TSqonGroupOp,
    TSyntheticSqonContent,
} from '../sqon/types';
import { isFieldOperator, isReference } from '../sqon/utils';
import { BooleanOperators, FieldOperators, RangeOperators } from '../sqon/operators';

export const getQueryParams = (search: string | null = null) =>
    search ? qs.parse(search) : qs.parse(window.location.search);

export const updateFilters = (history: any, filterGroup: IFilterGroup, selected: IFilter[], index?: string): void => {
    const newSelectedFilters: TSqonContent = createSQONFromFilters(filterGroup, selected, index);

    updateQueryFilters(history, filterGroup.field, newSelectedFilters);
};

export const getFilterType = (fieldType: string): VisualType => {
    if (['long', 'float', 'integer', 'date'].includes(fieldType)) {
        return VisualType.Range;
    } else if (['boolean'].includes(fieldType)) {
        return VisualType.Toggle;
    }
    return VisualType.Checkbox;
};

export const createSQONFromFilters = (
    filterGroup: IFilterGroup,
    selectedFilters: IFilter[],
    index?: string,
): TSqonContent => {
    switch (filterGroup.type) {
        case VisualType.Range:
            return createRangeFilter(filterGroup.field, selectedFilters, index);
        case VisualType.Text:
            return createTextFilter(filterGroup.field, selectedFilters, index);
        default:
            return createInlineFilters(filterGroup.field, selectedFilters, index);
    }
};

export const createTextFilter = (field: string, filters: IFilter<IFilterText>[], index?: string) => {
    if (filters.length === 0) {
        return [];
    }

    const selectedTextFilter = filters[0];

    return [
        {
            content: { field, value: [selectedTextFilter.data.text], index },
            op: FieldOperators.in,
        },
    ];
};

export const createRangeFilter = (field: string, filters: IFilter<IFilterRange>[], index?: string) => {
    const selectedFilters: TSqonContent = [];
    if (filters.length === 0) {
        return [];
    }

    const selectedRange = filters[0];

    switch (selectedRange.data.operator) {
        case RangeOperators.between:
            if (selectedRange.data.min && selectedRange.data.max) {
                selectedFilters.push({
                    content: { field, value: [selectedRange.data.min, selectedRange.data.max], index },
                    op: FieldOperators.between,
                });
            }
            break;
        case RangeOperators['<']:
        case RangeOperators['<=']:
            if (selectedRange.data.max) {
                selectedFilters.push({
                    content: { field, value: [selectedRange.data.max], index },
                    op: FieldOperators[selectedRange.data.operator],
                });
            }
            break;
        case RangeOperators['>']:
        case RangeOperators['>=']:
            if (selectedRange.data.min) {
                selectedFilters.push({
                    content: { field, value: [selectedRange.data.min], index },
                    op: FieldOperators[selectedRange.data.operator],
                });
            }
            break;
    }

    return selectedFilters;
};

export const createInlineFilters = (field: string, filters: IFilter<IFilterCount>[], index?: string): TSqonContent => {
    const arrayFilters = filters.map((v) => v.data.key);
    return arrayFilters.length > 0
        ? [
              {
                  content: { field, value: arrayFilters, index },
                  op: FieldOperators.in,
              },
          ]
        : [];
};

export const updateQueryFilters = (
    history: any,
    field: string,
    filters: TSyntheticSqonContent,
    operator: TSqonGroupOp = BooleanOperators.and,
): void => {
    const currentFilter = getFiltersQuery();

    let newFilters: ISyntheticSqon | object = { content: filters, op: operator };

    if (!isEmpty(currentFilter)) {
        const results = getFilterWithNoSelection(currentFilter, field);

        const fieldIndex = results[0];
        const filterWithoutSelection = results[1] as ISyntheticSqon;

        if (isEmpty(filterWithoutSelection.content) && isEmpty(filters)) {
            newFilters = {};
        } else {
            if (fieldIndex >= 0) {
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

interface IValues<T> {
    defaultValue: T;
    whiteList?: Array<T>;
}

export const readQueryParam = <T = ''>(key: string, options: IValues<T>, search: any = null): any => {
    const query = getQueryParams(search);
    return get<any, any, T>(query, key, options.defaultValue)!;
};

export const getFiltersQuery = (search: any = null): ISyntheticSqon => {
    const filters = readQueryParam('filters', { defaultValue: JSON.stringify({}) }, search);

    return JSON.parse(filters);
};

const getSelectedFiltersForRange = (filters: IFilter[], filterGroup: IFilterGroup, selectedFilters: ISyntheticSqon) => {
    const rangeData = getRangeSelection(selectedFilters, filterGroup);
    const currentFilter = filters[0] as IFilter<IFilterRange>;
    return [{ ...currentFilter, data: rangeData }];
};

const getSelectedFiltersOther = (filters: IFilter[], filterGroup: IFilterGroup, selectedFilters: ISyntheticSqon) => {
    const currentFilters = filters as IFilter<IFilterCount>[];
    return currentFilters.reduce<IFilter<IFilterCount>[]>((acc, filter) => {
        if (isFilterSelected(selectedFilters, filterGroup, filter.data.key)) {
            acc.push(filter);
        }
        return acc;
    }, []);
};

export const getSelectedFilters = (filters: IFilter[], filterGroup: IFilterGroup): IFilter[] => {
    const selectedFilters = getFiltersQuery();
    if (isEmpty(selectedFilters)) {
        return [];
    }

    switch (filterGroup.type) {
        case VisualType.Range:
            return getSelectedFiltersForRange(filters, filterGroup, selectedFilters);
        default:
            return getSelectedFiltersOther(filters, filterGroup, selectedFilters);
    }
};

export const getRangeSelection = (filters: ISyntheticSqon, filterGroup: IFilterGroup) => {
    let rangeSelection: IFilterRange = { max: undefined, min: undefined, rangeType: undefined };
    for (const filter of filters.content) {
        if (isReference(filter)) continue;
        const filt = filter as IValueFilter;
        if (filt.content.field === filterGroup.field) {
            switch (filt.op) {
                case RangeOperators.between:
                    rangeSelection = {
                        ...rangeSelection,
                        operator: RangeOperators.between,
                        max: filt.content.value[1] as number,
                        min: filt.content.value[0] as number,
                    };
                    break;
                case RangeOperators['<']:
                case RangeOperators['<=']:
                    rangeSelection = {
                        ...rangeSelection,
                        operator: RangeOperators[filt.op],
                        max: filt.content.value[0] as number,
                    };
                    break;
                case RangeOperators['>']:
                case RangeOperators['>=']:
                    rangeSelection = {
                        ...rangeSelection,
                        operator: RangeOperators[filt.op],
                        min: filt.content.value[0] as number,
                    };
                    break;
            }
        }
    }

    return rangeSelection;
};

export const isFilterSelected = (filters: ISyntheticSqon, filterGroup: IFilterGroup, key: string): boolean => {
    if (isReference(filters)) {
        return false;
    } else if (isFieldOperator(filters)) {
        const valueContent = (filters.content as unknown) as IValueContent;
        return valueContent.value.includes(key) && valueContent.field === filterGroup.field;
    } else {
        return filters.content.reduce(
            (acc: any, contentSqon: any) => acc || isFilterSelected(contentSqon, filterGroup, key),
            false,
        );
    }
};

const emptySqon = { content: [], op: BooleanOperators.and };

export const useFilters = (filterKey: string = 'filters') => {
    var filters = { filters: emptySqon };
    const searchParams = new URLSearchParams(window.location.search);

    if (searchParams.has(filterKey) && searchParams.get(filterKey)) {
        try {
            const filterData = JSON.parse(searchParams.get(filterKey)!);
            if (typeof filterData == 'object') {
                filters = { filters: filterData };
            }
        } catch {}
    }

    return filters;
};

export const getQueryBuilderCache = (type: string): any => {
    const items = localStorage.getItem(`query-builder-cache-${type}`);

    if (isEmpty(items)) {
        return {};
    }

    try {
        // To support old query builder cache format
        const qbCache = JSON.parse(items!);
        const state = qbCache.state || [];
        return {
            ...qbCache,
            state: state.map((queryState: any) => {
                if (queryState.query) {
                    return {
                        id: queryState.id,
                        total: queryState.total,
                        content: [],
                        op: BooleanOperators.and,
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

export const setQueryBuilderCache = (type: string, items: any): void => {
    localStorage.setItem(`query-builder-cache-${type}`, JSON.stringify(items));
};
