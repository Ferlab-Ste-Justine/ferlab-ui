import React from 'react';

import CheckboxFilter from './CheckboxFilter';
import RangeFilter from './RangeFilter';
import ToggleFilter from './ToggleFilter';
import { IDictionary, IFilter, IFilterGroup, onChangeType, VisualType } from './types';

type FilterSelectorProps = {
    onChange: onChangeType;
    filterGroup: IFilterGroup;
    selectedFilters?: IFilter[];
    searchInputVisible: boolean;
    maxShowing: number;
    filters: IFilter[];
    dictionary?: IDictionary;
};

const FilterSelector: React.FC<FilterSelectorProps> = ({
    dictionary,
    filterGroup,
    filters,
    maxShowing,
    onChange,
    searchInputVisible,
    selectedFilters,
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
            return <RangeFilter {...commonProps} dictionary={dictionary} filters={filters} />;
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
