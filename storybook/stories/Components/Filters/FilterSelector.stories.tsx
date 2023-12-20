import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import {TermFilterProps} from "@ferlab/ui/core/components/filters/CheckboxFilter";
import {IFilter, IFilterCount, IFilterGroup, IFilterRangeConfig, IFilterTextInputConfig, onChangeType, VisualType} from "@ferlab/ui/core/components/filters/types";
import {booleanFilters, filters, rangeFilters} from "./data";
import FilterSelector from "@ferlab/ui/core/components/filters/FilterSelector";

export default {
    title: "@ferlab/Components/Filters/FilterSelector",
    component: FilterSelector,
    decorators: [(Story) =>
        <>
            <div className={'story_container'} style={{display: 'inline-grid'}}><Story/></div>
        </>],
    argTypes: {
        className: {
            control: 'string',
        },
        children: {
            control: 'object',
        },
    },
} as Meta;

const FilterSelectorStory = ({title, maxShowing, filterGroup, onChange, ...props}: {
    title: string,
    maxShowing: number,
    filterGroup: IFilterGroup,
    onChange: onChangeType,
    searchInputVisible: boolean;
    filters: IFilter<IFilterCount>[];
    props: Story<TermFilterProps>
}) => (
    <>
        <h3>{title}</h3>
        <FilterSelector
            filterGroup={filterGroup}
            maxShowing={maxShowing}
            onChange={onChange}

            {...props}
        />
    </>
);

const filerGroupTerm: IFilterGroup = {
    field: 'this.field',
    title: 'title_filter_group',
    type: VisualType.Checkbox,
}

const filerGroupBoolean: IFilterGroup = {
    field: 'this.field',
    title: 'title_filter_group',
    type: VisualType.Toggle,
}

const filterGroupRange: IFilterGroup<IFilterRangeConfig> = {
    field: 'this.field',
    title: 'title_filter_group',
    config: {
        rangeTypes: [{
            key: 'this.field',
            name: 'Years',
        }],
        min: 1,
        max: 2,
    },
    type: VisualType.Range,
}

const filterGroupTextInput: IFilterGroup<IFilterTextInputConfig> = {
    field: 'this.field',
    title: 'title_filter_group',
    config: {
        label: "Filter Label",
        placeholder: "Filter placeholder"
    },
    type: VisualType.Text,
}

const onChangeTypeStory: onChangeType = () => null

export const TermFilterSelector = FilterSelectorStory.bind({});
TermFilterSelector.args = {
    title: 'FilterSelector Term',
    maxShowing: 6,
    filterGroup: filerGroupTerm,
    onChangeType: onChangeTypeStory(filerGroupTerm, filters),
    hasSearchInput: true,
    filters: filters,
};

export const BooleanFilterSelector = FilterSelectorStory.bind({});
BooleanFilterSelector.args = {
    title: 'FilterSelector Boolean',
    filterGroup: filerGroupBoolean,
    onChangeType: onChangeTypeStory(filerGroupBoolean, booleanFilters),
    hasSearchInput: true,
    filters: booleanFilters,
};

export const RangeFilterSelector = FilterSelectorStory.bind({});
RangeFilterSelector.args = {
    title: 'FilterSelector Range',
    filterGroup: filterGroupRange,
    onChangeType: onChangeTypeStory(filterGroupRange, rangeFilters),
    hasSearchInput: true,
    filters: rangeFilters,
};

export const TextInputFilterSelector = FilterSelectorStory.bind({});
TextInputFilterSelector.args = {
    title: 'FilterSelector Text Input',
    filterGroup: filterGroupTextInput,
    onChangeType: onChangeTypeStory(filterGroupTextInput, []),
    hasSearchInput: true,
    filters: [],
};


