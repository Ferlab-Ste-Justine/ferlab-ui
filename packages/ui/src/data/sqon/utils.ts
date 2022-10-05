import { cloneDeep, isEmpty, isUndefined, merge, union } from 'lodash';
import { v4 } from 'uuid';

import {
    IFilter,
    IFilterCount,
    IFilterGroup,
    IFilterRange,
    IFilterText,
    VisualType,
} from '../../components/filters/types';
import { getActiveQuery } from '../../components/QueryBuilder/utils/useQueryBuilderState';

import { BooleanOperators, FieldOperators, RangeOperators, TermOperators } from './operators';
import {
    IMergeOptions,
    ISqonGroupFilter,
    ISyntheticSqon,
    IValueContent,
    IValueFilter,
    MERGE_OPERATOR_STRATEGIES,
    MERGE_VALUES_STRATEGIES,
    SET_ID_PREFIX,
    TFilterValue,
    TSqonContent,
    TSqonContentValue,
    TSqonGroupOp,
    TSyntheticSqonContent,
    TSyntheticSqonContentValue,
} from './types';

/**
 * Check if a synthetic sqon is empty.
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isEmptySqon = (sqon: ISyntheticSqon | Record<string, never>) =>
    !Object.keys(sqon).length || isEmpty(sqon?.content);

export const isNotEmptySqon = (sqon: ISyntheticSqon | Record<string, never> | TSyntheticSqonContentValue) =>
    !isEmptySqon(sqon as ISyntheticSqon);

/**
 * Check if a synthetic sqon is a reference to another sqon.
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isReference = (sqon: ISyntheticSqon | Record<string, never> | TSyntheticSqonContentValue) =>
    !isNotReference(sqon);

export const isNotReference = (sqon: any) => isNaN(sqon);

/**
 * Check if a sqon value is a set.
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isSet = (value: IValueFilter) =>
    value.content.value.some((value) => value.toString().startsWith(SET_ID_PREFIX)) ||
    !isEmpty(value.content.overrideValuesName);

export const isNotSet = (value: IValueFilter) => !isSet(value);

/**
 * Check if a synthetic sqon is a boolean operator
 * Operator is either one of the following: 'or', 'and' or 'not'
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isBooleanOperator = (sqon: ISyntheticSqon | Record<string, never> | TSyntheticSqonContentValue) =>
    typeof sqon === 'object' && isNotEmptySqon(sqon) && sqon.op in BooleanOperators;

/**
 * Check if a synthetic sqon is a field operator
 * Operator is either one of the following: '>', '<', 'between', '>=','<=', 'in', 'not-in' or 'all'
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isFieldOperator = (sqon: ISyntheticSqon | Record<string, never> | ISqonGroupFilter) =>
    typeof sqon === 'object' && isNotEmptySqon(sqon) && sqon.op in FieldOperators;

/**
 * Check if a query filter is a boolean one.
 *
 * @param {Boolean}
 */
export const isBooleanFilter = (query: IValueFilter) =>
    query.content.value.every((val) => ['false', 'true'].includes(val.toString().toLowerCase()));

/**
 * Check if a query filter is a range one.
 *
 * @param {Boolean}
 */
export const isRangeFilter = (query: IValueFilter) => query.op in RangeOperators;

/**
 * Generates an empty synthetic sqon
 *
 * @param {ISyntheticSqon} syntheticSqon The empty synthetic sqon
 */
export const generateEmptyQuery = (
    sqon: ISyntheticSqon = { content: [], id: v4(), op: BooleanOperators.and },
): ISyntheticSqon => ({
    ...sqon,
    content: [],
});

export const getDefaultSyntheticSqon = (id: string = v4()): ISyntheticSqon => ({
    content: [],
    id,
    op: BooleanOperators.and,
});

/**
 * Convert a synthetic sqon into an executable sqon. Resolve all references if needed.
 *
 * @param {Array<ISyntheticSqon>} sqonsList All synthetic sqons in the query builder
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to resolve
 *
 * @returns {ISqonGroupFilter} An executable sqon
 */
export const resolveSyntheticSqon = (
    sqonsList: ISyntheticSqon[],
    syntheticSqon: ISyntheticSqon | Record<string, never> | TSyntheticSqonContentValue,
    pivot?: string,
): ISqonGroupFilter => {
    const getNewContent = (
        syntheticSqon: ISyntheticSqon | Record<string, never> | TSyntheticSqonContentValue,
    ): TSqonContent =>
        (syntheticSqon as ISyntheticSqon).content
            .map((c: TSyntheticSqonContentValue) => (isReference(c) ? sqonsList[c as number] : c))
            .map((c: ISyntheticSqon | TSyntheticSqonContentValue) => resolveSyntheticSqon(sqonsList, c));

    if (isBooleanOperator(syntheticSqon)) {
        return Object.assign(
            {
                content: getNewContent(syntheticSqon),
                op: (syntheticSqon as ISqonGroupFilter).op,
            },
            pivot ? { pivot: pivot } : null,
        );
    }

    return Object.assign(
        {
            content: (syntheticSqon as ISqonGroupFilter).content as TSqonContent,
            op: (syntheticSqon as ISqonGroupFilter).op,
        },
        pivot ? { pivot: pivot } : null,
    );
};

/**
 * Remove recursively a sqon using its index.
 *
 * @param {number} indexToRemove Index of the synthetic sqon to remove
 * @param {Array<ISyntheticSqon>} sqonsList All synthetic sqons in the query builder
 *
 * @returns {Array<ISyntheticSqon>} The new synthetic sqons list
 */
export const removeSqonAtIndex = (indexToRemove: number, sqonsList: ISyntheticSqon[]): Array<ISyntheticSqon> => {
    const getNewContent = (indexToRemove: number, content: TSyntheticSqonContent) =>
        content
            .filter((content: TSyntheticSqonContentValue | TSqonContentValue) => content !== indexToRemove)
            .map((s: TSyntheticSqonContentValue | TSqonContentValue) =>
                isReference(s) ? (s > indexToRemove ? (s as number) - 1 : s) : s,
            );

    const result = sqonsList
        .filter((s, i) => i !== indexToRemove)
        .map((sqon) => {
            if (isEmptySqon(sqon)) {
                return sqon;
            }

            return {
                ...sqon,
                content: getNewContent(indexToRemove, sqon.content),
            };
        });

    const emptyQueries = result.filter((s) => isEmpty(s.content));

    if (emptyQueries.length) {
        return removeSqonAtIndex(
            result.findIndex((s) => s.id == emptyQueries[0].id),
            result,
        );
    }

    return result;
};

/**
 * Recursively change the operator throughout a given synthetic sqon
 *
 * @param {TSqonGroupOp} operator The new operator
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to update
 *
 * @returns {ISyntheticSqon} The modified synthetic sqon
 */
export const changeCombineOperator = (operator: TSqonGroupOp, syntheticSqon: ISyntheticSqon): ISyntheticSqon => ({
    ...syntheticSqon,
    content: syntheticSqon.content.map((subContent: TSyntheticSqonContentValue) =>
        isBooleanOperator(subContent) ? changeCombineOperator(operator, subContent as ISyntheticSqon) : subContent,
    ) as TSyntheticSqonContent,
    op: operator,
});

/**
 * Recursively check if a synthetic sqon index is referenced inside a given synthetic sqon
 *
 * @param {number} indexReference The index of the synthetic sqon to check
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon from which to verified
 *
 * @returns {boolean} If the index is referenced or not
 */
export const isIndexReferencedInSqon = (
    indexReference: number,
    syntheticSqon: ISyntheticSqon | Record<string, never>,
): boolean =>
    isBooleanOperator(syntheticSqon)
        ? syntheticSqon.content.reduce(
              (acc: boolean, contentSqon: TSyntheticSqonContentValue) =>
                  acc || isIndexReferencedInSqon(indexReference, contentSqon as ISyntheticSqon),
              false,
          )
        : typeof syntheticSqon === 'number' && syntheticSqon === indexReference;

/**
 * Remove a value from a given synthetic sqon
 *
 * @param {*} contentToRemove The content/value to remove
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to update
 *
 * @returns {ISyntheticSqon} The modified synthetic sqon
 */
export const removeContentFromSqon = (
    contentToRemove: TSyntheticSqonContentValue,
    syntheticSqon: ISyntheticSqon | Record<string, never>,
) => ({
    ...syntheticSqon,
    content: syntheticSqon.content.filter((content: TSyntheticSqonContentValue) => content !== contentToRemove),
    op: syntheticSqon.op,
});

export const termToSqon = ({ field, value }: IValueContent) => ({
    content: {
        field: field,
        value: [value].flat(),
    },
    op: TermOperators.in,
});

export const addToSqons = ({ fieldsWValues, sqons }: { fieldsWValues: IValueContent[]; sqons: ISyntheticSqon[] }) => {
    const currentSqon = {
        content: fieldsWValues.map(({ field, value }) => ({ ...termToSqon({ field, value }) })),
        op: BooleanOperators.and,
    };

    if (!sqons || sqons.length === 0) {
        return [currentSqon];
    }

    if (isEmptySqon(sqons[sqons.length - 1])) {
        return [...sqons.slice(0, sqons.length - 1), currentSqon];
    }

    return [...sqons, currentSqon];
};

export const deepMergeSqonValue = (sourceSqon: ISyntheticSqon, newSqon: IValueFilter, opts: IMergeOptions) => {
    const clonedSqons = cloneDeep(sourceSqon);

    opts = merge(
        {},
        {
            operator: MERGE_OPERATOR_STRATEGIES.DEFAULT,
            values: MERGE_VALUES_STRATEGIES.DEFAULT,
        },
        opts,
    );

    const found = deeplySetSqonValue(clonedSqons, newSqon, opts);

    return found
        ? clonedSqons
        : {
              ...clonedSqons,
              content: [...clonedSqons.content, newSqon],
          };
};

/**
  * Recursively traverse the `sourceSqon` and mutate the matching field's value and, optionaly, it's operator.

  * @param {Object} sourceSqon - a sqon object to traverse recursively and mutate
  * @param {Object} newSqon - a sqon, that may omit the operator,
  * that provide the field name searched and value to be set
  * @param {Object} opts - options to handle merging the values.
  *
  * @returns `true` if the field was found; `false` otherwise.
  */
const deeplySetSqonValue = (sourceSqon: ISyntheticSqon, newSqon: IValueFilter, opts: IMergeOptions) => {
    let found = false;

    sourceSqon.content.forEach((sqon) => {
        // dont follow references
        if (isReference(sqon)) return;

        const castedSqon = sqon as TSqonContentValue;

        // traverse nested sqons recursively
        if (isBooleanOperator(castedSqon)) {
            found = deeplySetSqonValue(castedSqon as ISyntheticSqon, newSqon, opts);
            return;
        }

        const castedValueSqon = castedSqon as IValueFilter;

        // field found, set the value and operator
        if (castedValueSqon.content.field === newSqon.content.field) {
            found = true;

            if (newSqon.content.overrideValuesName) {
                castedValueSqon.content.overrideValuesName = newSqon.content.overrideValuesName;
            }

            if (newSqon.op) {
                if (opts.operator !== MERGE_OPERATOR_STRATEGIES.KEEP_OPERATOR) {
                    castedValueSqon.op = newSqon.op;
                }
            }

            if (opts.values === MERGE_VALUES_STRATEGIES.APPEND_VALUES) {
                castedValueSqon.content.value = union([], castedValueSqon.content.value, newSqon.content.value);
            }

            if (opts.values === MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES) {
                castedValueSqon.content.value = newSqon.content.value;
            }
        }
    });

    return found;
};

export const deepMergeFieldInActiveQuery = ({
    queryBuilderId,
    field,
    value,
    index,
    merge_strategy = MERGE_VALUES_STRATEGIES.APPEND_VALUES,
    operator = TermOperators.in,
    overrideValuesName,
}: {
    queryBuilderId: string;
    field: string;
    value: Array<string | number | boolean>;
    index?: string;
    merge_strategy?: MERGE_VALUES_STRATEGIES;
    operator?: TermOperators;
    overrideValuesName?: string;
}) => {
    let newSqon;
    const activeQuery = getActiveQuery(queryBuilderId);
    const newSqonContent: IValueFilter = {
        content: {
            field,
            index,
            overrideValuesName,
            value,
        },
        op: operator,
    };

    if (!isEmpty(activeQuery)) {
        newSqon = deepMergeSqonValue(activeQuery, newSqonContent, {
            operator: MERGE_OPERATOR_STRATEGIES.OVERRIDE_OPERATOR,
            values: merge_strategy,
        });
    } else {
        newSqon = getDefaultSyntheticSqon();
        newSqon.content = [newSqonContent];
    }

    return newSqon;
};

export const generateQuery = ({
    filters,
    newFilters,
    operator = BooleanOperators.and,
}: {
    newFilters: IValueFilter[];
    filters?: ISyntheticSqon;
    operator?: BooleanOperators;
}): ISyntheticSqon => {
    if (isEmpty(filters)) {
        return {
            content: newFilters,
            id: v4(),
            op: operator,
        };
    }

    return {
        content: [...filters!.content, ...newFilters],
        id: filters?.id || v4(),
        op: filters?.op || operator,
    };
};

export const generateValueFilter = ({
    field,
    value,
    index = '',
    operator = TermOperators.in,
    overrideValuesName,
}: {
    field: string;
    value: string[];
    index?: string;
    operator?: TermOperators;
    overrideValuesName?: string;
}) => ({
    content: { field, index, overrideValuesName, value },
    op: operator,
});

export const findSqonValueByField = (field: string, sqon: ISqonGroupFilter, prevValue: any = undefined) => {
    let value: any = prevValue;
    sqon.content.forEach((content) => {
        if (isReference(content)) {
            return;
        } else if (isBooleanOperator(content)) {
            value = value || findSqonValueByField(field, content as ISqonGroupFilter, prevValue);
        } else {
            const valueContent = content as IValueFilter;

            if (valueContent.content.field === field) {
                value = value || valueContent.content.value;
            }
        }
    });
    return value;
};

export const removeFieldFromSqon = (field: string, sqon: ISyntheticSqon) => ({
    ...sqon,
    content: sqon.content.filter(function f(sqon: any): boolean {
        if (isReference(sqon)) {
            return true;
        }

        if (isBooleanOperator(sqon)) {
            return (sqon.content as TSqonContent).filter(f).length > 0;
        }

        return !((sqon as IValueFilter).content.field === field);
    }),
});

export const removeFieldFromActiveQuery = (queryBuilderId: string, field: string) =>
    removeFieldFromSqon(field, getActiveQuery(queryBuilderId));

export const getUpdatedActiveQueryByFilterGroup = ({
    filterGroup,
    index,
    operator,
    queryBuilderId,
    selectedFilters,
}: {
    queryBuilderId: string;
    filterGroup: IFilterGroup;
    selectedFilters: IFilter[];
    index?: string;
    operator?: TSqonGroupOp;
}): ISyntheticSqon =>
    getUpdatedActiveQuery({
        field: filterGroup.field,
        operator,
        queryBuilderId,
        sqonContent: createSQONFromFilters(filterGroup, selectedFilters, index),
    });

export const getUpdatedActiveQuery = ({
    queryBuilderId,
    field,
    sqonContent,
    operator = BooleanOperators.and,
}: {
    queryBuilderId: string;
    field: string;
    sqonContent: TSyntheticSqonContent;
    operator?: TSqonGroupOp;
}): ISyntheticSqon => {
    const activeQuery = getActiveQuery(queryBuilderId);
    let newQuery: ISyntheticSqon = { content: sqonContent, op: operator };

    if (!isEmpty(activeQuery)) {
        const results = getFilterWithNoSelection(activeQuery, field);

        const fieldIndex = results[0];
        const initialResults = results[1] as ISyntheticSqon;
        const filterWithoutSelection = { ...initialResults };

        if (isEmpty(filterWithoutSelection.content) && isEmpty(activeQuery)) {
            newQuery = { content: [], op: operator };
        } else {
            if (fieldIndex >= 0) {
                filterWithoutSelection.content.splice(fieldIndex as number, 0, ...sqonContent);
            } else {
                filterWithoutSelection.content = [...filterWithoutSelection.content, ...sqonContent];
            }

            newQuery = {
                ...filterWithoutSelection,
                content: [...filterWithoutSelection.content],
            };
            if (initialResults.content.length === 0) {
                newQuery.op = operator;
            }
        }
    }

    return newQuery;
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

export const createSQONFromFilters = (
    filterGroup: IFilterGroup,
    selectedFilters: IFilter[],
    index?: string,
): TSyntheticSqonContent => {
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
            content: { field, index, value: [selectedTextFilter.data.text] },
            op: FieldOperators.in,
        },
    ];
};

const tsqonFromRangeFilter = (
    field: string,
    selectedRange: IFilter<IFilterRange>,
    index?: string,
): TSqonContentValue | null => {
    const createContentValue = (value: TFilterValue, op: string) => ({
        content: { field, index, value },
        op,
    });

    switch (selectedRange.data.operator) {
        case RangeOperators.between:
            return !isUndefined(selectedRange.data.min) && !isUndefined(selectedRange.data.max)
                ? createContentValue(
                      [selectedRange.data.min, selectedRange.data.max],
                      RangeOperators[selectedRange.data.operator],
                  )
                : null;
        case RangeOperators['<']:
        case RangeOperators['<=']:
            return !isUndefined(selectedRange.data.max)
                ? createContentValue([selectedRange.data.max], RangeOperators[selectedRange.data.operator])
                : null;
        case RangeOperators['>']:
        case RangeOperators['>=']:
            return !isUndefined(selectedRange.data.min)
                ? createContentValue([selectedRange.data.min], RangeOperators[selectedRange.data.operator])
                : null;
        case RangeOperators['in']:
            return selectedRange.data.noDataSelected
                ? createContentValue(['__missing__'], RangeOperators[selectedRange.data.operator])
                : null;
    }

    return null;
};

export const createRangeFilter = (field: string, filters: IFilter<IFilterRange>[], index?: string): TSqonContent =>
    filters.length === 0
        ? []
        : (filters.map((f) => tsqonFromRangeFilter(field, f, index)).filter((f) => f !== null) as TSqonContent);

export const createInlineFilters = (field: string, filters: IFilter<IFilterCount>[], index?: string): TSqonContent => {
    const arrayFilters = filters.map((v) => v.data.key);
    const operator = isEmpty(filters) ? TermOperators.in : filters[0].data.operator || TermOperators.in;
    return arrayFilters.length > 0
        ? [
              {
                  content: { field, index, value: arrayFilters },
                  op: operator,
              },
          ]
        : [];
};

export const getSelectedFilters = ({
    filterGroup,
    filters,
    queryBuilderId,
}: {
    queryBuilderId: string;
    filters: IFilter[];
    filterGroup: IFilterGroup;
}): IFilter[] => {
    const selectedFilters = getActiveQuery(queryBuilderId);
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

const getSelectedFiltersForRange = (filters: IFilter[], filterGroup: IFilterGroup, selectedFilters: ISyntheticSqon) => {
    const rangeData = getRangeSelection(selectedFilters, filterGroup);
    return filters.map((f) => ({ ...f, data: rangeData }));
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

export const getRangeSelection = (filters: ISyntheticSqon, filterGroup: IFilterGroup): IFilterRange => {
    let rangeSelection: IFilterRange = { max: undefined, min: undefined, rangeType: undefined };
    for (const filter of filters.content) {
        if (isReference(filter)) continue;
        const filt = filter as IValueFilter;
        if (filt.content.field !== filterGroup.field) {
            continue;
        }
        switch (filt.op) {
            case RangeOperators.between:
                rangeSelection = {
                    ...rangeSelection,
                    max: filt.content.value[1] as number,
                    min: filt.content.value[0] as number,
                    operator: RangeOperators.between,
                };
                break;
            case RangeOperators['<']:
            case RangeOperators['<=']:
                rangeSelection = {
                    ...rangeSelection,
                    max: filt.content.value[0] as number,
                    operator: RangeOperators[filt.op],
                };
                break;
            case RangeOperators['>']:
            case RangeOperators['>=']:
                rangeSelection = {
                    ...rangeSelection,
                    min: filt.content.value[0] as number,
                    operator: RangeOperators[filt.op],
                };
                break;
            case RangeOperators['in']:
                rangeSelection = {
                    ...rangeSelection,
                    noDataSelected: !!filt.content.value,
                };
        }
    }

    return rangeSelection;
};

export const isFilterSelected = (filters: ISyntheticSqon, filterGroup: IFilterGroup, key: string): boolean => {
    if (isReference(filters)) {
        return false;
    } else if (isFieldOperator(filters)) {
        const valueContent = filters.content as unknown as IValueContent;
        return valueContent.value.includes(key) && valueContent.field === filterGroup.field;
    } else {
        return filters.content.reduce(
            (acc: any, contentSqon: any) => acc || isFilterSelected(contentSqon, filterGroup, key),
            false,
        );
    }
};
