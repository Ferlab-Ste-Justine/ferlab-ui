import React from 'react';

import {IDictionary, IFilter, IFilterGroup, onChangeType, VisualType} from './types';

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
    dictionary?: IDictionary;
}

const FilterSelector: React.FC<FilterSelectorProps> = ({
                                                      filterGroup,
                                                      filters,
                                                      maxShowing,
                                                      onChange,
                                                      searchInputVisible,
                                                      selectedFilters,
                                                      dictionary,
                                                  }) => {
    const commonProps = {
        filterGroup,
        onChange,
        selectedFilters,
    };
    switch (filterGroup.type) {
        case VisualType.Toggle:
            return <ToggleFilter {...commonProps} dictionary={dictionary} filters={filters} />;
        case VisualType.Range:
            return <RangeFilter
                {...commonProps}
                filters={filters}
                dictionary={dictionary}
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
