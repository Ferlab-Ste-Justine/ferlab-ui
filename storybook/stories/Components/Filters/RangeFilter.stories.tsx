import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import {
    IFilter,
    IFilterGroup,
    IFilterRange,
    onChangeType,
    TFilterGroupConfig, VisualType
} from "@ferlab/ui/components/filters/types";
import {filters, rangeFilters} from "./data";
import RangeFilter, {RangeFilterProps} from "@ferlab/ui/components/filters/RangeFilter";

export default {
  title: "@ferlab/Components/Filters/RangeFilter",
  component: RangeFilter,
    decorators: [(Story) =>
        <><div className={'story_container'} style={{display:'inline-grid'}}><Story/></div></>],
  argTypes: {
    className: {
      control: 'string',
    },
    children: {
      control: 'object',
    },
  },
} as Meta;

const RangeFilterStory = ({title, filterGroup, onChange, ...props} : {
    title: string,
    filterGroup: IFilterGroup,
    onChange: onChangeType,
    filters: IFilter<IFilterRange>[];
    props: Story<RangeFilterProps>}) => (
  <>
    <h3>{title}</h3>
    <RangeFilter
        filterGroup={filterGroup}
        onChange={onChange}
        {...props} />
  </>
);

const filterGroupConfig: TFilterGroupConfig = {
    rangeTypes: [{
        key: 'this.field',
        name: 'Years',
    }],
    min: 1,
    max: 2,
}

const filerGroup: IFilterGroup = {
    type: VisualType.Range,
    field: 'this.field',
    config: filterGroupConfig,
    title: 'title_filter_group'
}

const onChangeTypeStory: onChangeType = () => null


export const TermFilterStoryMore = RangeFilterStory.bind({});
TermFilterStoryMore.args = {
    title: 'RangeFilter',
    filterGroup: filerGroup,
    filters: rangeFilters,
    onChange: onChangeTypeStory,
    maxShowing: 6,

    onChangeType: onChangeTypeStory(filerGroup, filters),
    hasSearchInput: true,
};
