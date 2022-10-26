import {
    IFilter,
    IFilterCount,
    IFilterGroup,
    IFilterRange,
    IFilterText,
    IRangeAggs,
    VisualType,
} from '../../components/filters/types';
import { BooleanOperators, FieldOperators, RangeOperators, TermOperators } from '../sqon/operators';
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
} from '../sqon/types';
import { isReference } from '../sqon/utils';

export const getSelectedFiltersForRange = (
    filters: IFilter[],
    filterGroup: IFilterGroup,
    selectedFilters: ISyntheticSqon,
) => {
    const rangeData = getRangeSelection(selectedFilters, filterGroup);
    return filters.map((f) => ({ ...f, data: rangeData }));
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

export const isRangeAgg = (obj: IRangeAggs) => !!obj.stats;
