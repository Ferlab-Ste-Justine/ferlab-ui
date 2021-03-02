import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import {IFilter, IFilterCount, IFilterGroup, onChangeType, VisualType} from "@ferlab/ui/components/filters/Filters";
import {booleanFilters} from "./data";
import BooleanFilter, {BooleanFilterProps} from "@ferlab/ui/components/filters/BooleanFilter";

export default {
  title: "@ferlab/Components/Filters/BooleanFilter",
  component: BooleanFilter,
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

const BooleanFilterStory = ({title, filterGroup, onChange, ...props} : {
    title: string,
    filterGroup: IFilterGroup,
    onChange: onChangeType,
    filters: IFilter<IFilterCount>[];
    props: Story<BooleanFilterProps>}) => (
  <>
    <h3>{title}</h3>
    <BooleanFilter
        filterGroup={filterGroup}
        onChange={onChange}
        {...props} />
  </>
);

const filerGroup: IFilterGroup = {
    type: VisualType.Toggle,
    field: 'this.field',
    title: 'title_filter_group'
}

const onChangeTypeStory: onChangeType = () => null


export const TermFilterStoryMore = BooleanFilterStory.bind({});
TermFilterStoryMore.args = {
    title: 'BooleanFilter',
    filterGroup: filerGroup,
    filters: booleanFilters,
    onChange: onChangeTypeStory,

    onChangeType: onChangeTypeStory(filerGroup, booleanFilters),
};
