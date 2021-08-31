import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import {IFilter, IFilterCount, IFilterGroup, onChangeType, VisualType} from "@ferlab/ui/components/filters/types";
import {booleanFilters, dictionaryFrench, booleanFiltersBigCount} from "./data";
import ToggleFilter, {BooleanFilterProps} from "@ferlab/ui/components/filters/ToggleFilter";

export default {
  title: "@ferlab/Components/Filters/ToggleFilter",
  component: ToggleFilter,
    decorators: [(Story) =>
        <><div className={'story_container'} style={{display:'inline-grid', minWidth: '225px'}}><Story/></div></>],
  argTypes: {
    className: {
      control: 'string',
    },
    children: {
      control: 'object',
    },
  },
} as Meta;

const ToggleFilterStory = ({title, filterGroup, onChange, ...props} : {
    title: string,
    filterGroup: IFilterGroup,
    onChange: onChangeType,
    filters: IFilter<IFilterCount>[];
    props: Story<BooleanFilterProps>}) => (
  <>
    <h3>{title}</h3>
    <ToggleFilter
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


export const ToggleFilterStoryMore = ToggleFilterStory.bind({});
ToggleFilterStoryMore.args = {
    title: 'ToggleFilter',
    filterGroup: filerGroup,
    filters: booleanFilters,
    onChange: onChangeTypeStory,

    onChangeType: onChangeTypeStory(filerGroup, booleanFilters),
};


export const ToggleFilterStoryBigCount = ToggleFilterStory.bind({});
ToggleFilterStoryBigCount.args = {
    title: 'ToggleFilter Big Count',
    filterGroup: filerGroup,
    filters: booleanFiltersBigCount,
    onChange: onChangeTypeStory,
    dictionary: dictionaryFrench,
    onChangeType: onChangeTypeStory(filerGroup, booleanFiltersBigCount),
};


export const ToggleFilterStoryDictionary = ToggleFilterStory.bind({});
ToggleFilterStoryDictionary.args = {
    title: 'ToggleFilter in French',
    filterGroup: filerGroup,
    filters: booleanFilters,
    onChange: onChangeTypeStory,
    dictionary: dictionaryFrench,
    onChangeType: onChangeTypeStory(filerGroup, booleanFilters),
};