import React from 'react';

import {IFilter, IFilterGroup, onChangeType, VisualType} from './types';

import ToggleFilter from "./ToggleFilter";
import RangeFilter from "./RangeFilter";
import CheckboxFilter from "./CheckboxFilter";

type FilterSelectorProps = {
    onChange: onChangeType;
    filterGroup: IFilterGroup;
    selectedFilters?: IFilter[];
    searchInputVisible: boolean;
    maxShowing: number;
    filters: IFilter[];
    textMin?: string,
    textMax?: string,
    textClear?: string,
    textApply?: string,
}

const FilterSelector: React.FC<FilterSelectorProps> = ({
                                                      filterGroup,
                                                      filters,
                                                      maxShowing,
                                                      onChange,
                                                      searchInputVisible,
                                                      selectedFilters,
                                                      textMin,
                                                      textMax,
                                                      textClear,
                                                      textApply,
                                                  }) => {
    const commonProps = {
        filterGroup,
        onChange,
        selectedFilters,
    };
    switch (filterGroup.type) {
        case VisualType.Toggle:
            return <ToggleFilter {...commonProps} textClear={textClear} filters={filters} />;
        case VisualType.Range:
            return <RangeFilter
                {...commonProps}
                filters={filters}
                textApply={textApply}
                textMax={textMax}
                textMin={textMin}
                textClear={textClear}
            />;
        case VisualType.Checkbox:
        default:
            return (
                <CheckboxFilter
                    {...commonProps}
                    filters={filters}
                    hasSearchInput={searchInputVisible}
                    maxShowing={maxShowing}
                />
            );
    }
};

export default FilterSelector;
