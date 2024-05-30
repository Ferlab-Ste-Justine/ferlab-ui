import React from 'react';

import { CheckboxFilter } from './CheckboxFilter';
import OntologyTreeModal from '../OntologyTreeFilter';
import RangeFilter from './RangeFilter';
import TextInputFilter from './TextInputFilter';
import ToggleFilter from './ToggleFilter';
import { IDictionary, IFilter, IFilterGroup, onChangeType, VisualType } from './types';

export type FilterSelectorProps = {
    onChange: onChangeType;
    filterGroup: IFilterGroup;
    selectedFilters?: IFilter[];
    searchInputVisible: boolean;
    maxShowing: number;
    filters: IFilter[];
    dictionary?: IDictionary;
    noDataInputOption?: boolean;
};

const FilterSelector = ({
    dictionary,
    filterGroup,
    filters,
    maxShowing,
    noDataInputOption,
    onChange,
    searchInputVisible,
    selectedFilters,
}: FilterSelectorProps): JSX.Element => {
    const commonProps = {
        dictionary,
        filterGroup,
        onChange,
        selectedFilters,
    };
    switch (filterGroup.type) {
        case VisualType.Toggle:
            return <ToggleFilter {...commonProps} filters={filters} />;
        case VisualType.Range:
            return <RangeFilter {...commonProps} filters={filters} noDataOption={noDataInputOption} />;
        case VisualType.Text:
            return <TextInputFilter {...commonProps} filters={filters} />;
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
