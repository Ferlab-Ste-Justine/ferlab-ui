import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import {TermFilterProps} from "@ferlab/ui/components/filters/CheckboxFilter";
import {IFilter, IFilterCount, IFilterGroup, onChangeType, VisualType} from "@ferlab/ui/components/filters/types";
import {booleanFilters, filters, rangeFilters} from "./data";
import FilterSelector from "@ferlab/ui/components/filters/FilterSelector";

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

const filerGroupRange: IFilterGroup = {
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

const onChangeTypeStory: onChangeType = () => null


export const TermFilterSelectorStory = FilterSelectorStory.bind({});
TermFilterSelectorStory.args = {
    title: 'FilterSelector Term',
    maxShowing: 6,
    filterGroup: filerGroupTerm,
    onChangeType: onChangeTypeStory(filerGroupTerm, filters),
    hasSearchInput: true,
    filters: filters,
};

export const BooleanFilterSelectorStory = FilterSelectorStory.bind({});
BooleanFilterSelectorStory.args = {
    title: 'FilterSelector Boolean',
    filterGroup: filerGroupBoolean,
    onChangeType: onChangeTypeStory(filerGroupBoolean, booleanFilters),
    hasSearchInput: true,
    filters: booleanFilters,
};

export const RangeFilterSelectorStory = FilterSelectorStory.bind({});
RangeFilterSelectorStory.args = {
    title: 'FilterSelector Range',
    filterGroup: filerGroupRange,
    onChangeType: onChangeTypeStory(filerGroupBoolean, rangeFilters),
    hasSearchInput: true,
    filters: rangeFilters,
};

