import qs from 'query-string';
import get from 'lodash/get';
import { isEmpty } from 'lodash';
import { IFilter, IFilterCount, IFilterGroup, IFilterRange, VisualType } from '../../components/filters/types';
import {
    ISyntheticSqon,
    IValueContent,
    IValueFilter,
    TSqonContent,
    TSqonGroupOp,
    TSyntheticSqonContent,
} from '../sqon/types';
import xss, { IFilterXSSOptions } from 'xss';
import { isFieldOperator, isNotReference, isReference } from '../sqon/utils';
import { BooleanOperators, FieldOperators } from '../sqon/operators';

const xssConfig: IFilterXSSOptions = {
    escapeHtml: (f) => f,

    stripIgnoreTag: true, // filter out all HTML not in the whitelist

    stripIgnoreTagBody: ['script'], // the script tag is a special case, we need to filter out its content

    whiteList: {}, // empty, means filter out all tags
};

export const getQueryParams = (search: string | null = null) =>
    search ? qs.parse(search) : qs.parse(window.location.search);

export const updateFilters = (history: any, filterGroup: IFilterGroup, selected: IFilter[]): void => {
    const newSelectedFilters: TSqonContent = createSQONFromFilters(filterGroup, selected);

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

export const createSQONFromFilters = (filterGroup: IFilterGroup, selectedFilters: IFilter[]): TSqonContent => {
    switch (filterGroup.type) {
        case VisualType.Range:
            return createRangeFilter(filterGroup.field, selectedFilters);
        default:
            return createInlineFilters(filterGroup.field, selectedFilters);
    }
};

export const createRangeFilter = (field: string, filters: IFilter<IFilterRange>[]) => {
    const selectedFilters: TSqonContent = [];
    if (filters.length === 0) {
        return selectedFilters;
    }

    const selectedRange = filters[0];
    if (selectedRange.data.min && selectedRange.data.max) {
        selectedFilters.push({
            content: { field, value: [selectedRange.data.min, selectedRange.data.max] },
            op: FieldOperators.between,
        });
    } else {
        if (selectedRange.data.max) {
            selectedFilters.push({
                content: { field, value: [selectedRange.data.max] },
                op: FieldOperators['<='],
            });
        }
        if (selectedRange.data.min) {
            selectedFilters.push({
                content: { field, value: [selectedRange.data.min] },
                op: FieldOperators['>='],
            });
        }
    }

    return selectedFilters;
};

export const createInlineFilters = (field: string, filters: IFilter<IFilterCount>[]): TSqonContent => {
    const arrayFilters = filters.map((v) => v.data.key);
    return arrayFilters.length > 0
        ? [
              {
                  content: { field, value: arrayFilters },
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
        const filterWithoutSelection = getFilterWithNoSelection(currentFilter, field);
        if (isEmpty(filterWithoutSelection.content) && isEmpty(filters)) {
            newFilters = {};
        } else {
            newFilters = {
                ...filterWithoutSelection,
                content: [...filterWithoutSelection.content, ...filters],
            };
        }
    }

    updateQueryParam(history, 'filters', newFilters);
};

const getFilterWithNoSelection = (filters: ISyntheticSqon, field: string): ISyntheticSqon => {
    const filtered = filters.content.filter((filter: any) =>
        isNotReference(filter) ? filter.content.field !== field : true,
    );

    return {
        ...filters,
        content: filtered,
    };
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
    let result = get<any, any, T>(query, key, options.defaultValue)!;
    result = xss(result, xssConfig);
    if (!isEmpty(options.whiteList) && !options.whiteList!.includes(result)) {
        result = options.defaultValue;
    }

    return result;
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
        const filt = filter as IValueFilter;
        if (filt.content.field === filterGroup.field) {
            if (filt.op === FieldOperators.between) {
                rangeSelection = {
                    ...rangeSelection,
                    max: filt.content.value[1] as number,
                    min: filt.content.value[0] as number,
                };
            } else {
                const op = filt.op === FieldOperators['>='] ? 'min' : 'max';
                rangeSelection = { ...rangeSelection, [op]: filt.content.value[0] };
            }
        }
    }

    return rangeSelection;
};

export const isFilterSelected = (filters: ISyntheticSqon, filterGroup: IFilterGroup, key: string) : boolean => {
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

export const useFilters = () => {
    const searchParams = new URLSearchParams(window.location.search);

    // @ts-ignore
    const paramsValues = [...searchParams.values()];
    // @ts-ignore
    const filters = paramsValues.length > 0 ? JSON.parse(paramsValues) : emptySqon;

    return { filters };
};

export const getQueryBuilderCache = (type: string): any => {
    const items = localStorage.getItem(`query-builder-cache-${type}`);

    if (isEmpty(items)) {
        return {};
    }

    try {
        return JSON.parse(items!);
    } catch (e) {
        return {};
    }
};

export const setQueryBuilderCache = (type: string, items: any): void => {
    localStorage.setItem(`query-builder-cache-${type}`, JSON.stringify(items));
};
