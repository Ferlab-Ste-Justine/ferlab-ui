import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import TermFilter, {TermFilterProps} from "@ferlab/ui/components/filters/TermFilter";
import {IFilter, IFilterCount, IFilterGroup, onChangeType} from "@ferlab/ui/components/filters/Filters";
import {filters} from "./data";

export default {
  title: "@ferlab/Components/Filters/TermFilter",
  component: TermFilter,
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

const TermFilterStory = ({title, maxShowing, filterGroup, onChange, ...props} : {
    title: string,
    maxShowing: number,
    filterGroup: IFilterGroup,
    onChange: onChangeType,
    hasSearchInput: boolean;
    filters: IFilter<IFilterCount>[];
    props: Story<TermFilterProps>}) => (
  <>
    <h3>{title}</h3>
    <TermFilter maxShowing={maxShowing} filterGroup={filterGroup} onChange={onChange} {...props} />
  </>
);

const filerGroup: IFilterGroup = {
    field: 'this.field',
    title: 'title_filter_group',
}

const onChangeTypeStory: onChangeType = () => null


export const TermFilterStoryMore = TermFilterStory.bind({});
TermFilterStoryMore.args = {
    title: 'TermFilter More',
    maxShowing: 6,
    filterGroup: filerGroup,
    onChangeType: onChangeTypeStory(filerGroup, filters),
    hasSearchInput: true,
    filters: filters,
};

export const TermFilterStoryFew = TermFilterStory.bind({});
TermFilterStoryFew.args = {
    title: 'TermFilter Few',
    maxShowing: 6,
    filterGroup: filerGroup,
    onChangeType: onChangeTypeStory(filerGroup, filters),
    hasSearchInput: true,
    filters: filters.slice(0, 4),
};

export const TermFilterStoryNoData = TermFilterStory.bind({});
TermFilterStoryNoData.args = {
    title: 'TermFilter No Data',
    maxShowing: 6,
    filterGroup: filerGroup,
    onChangeType: onChangeTypeStory(filerGroup, filters),
    hasSearchInput: true,
    filters: [],
};
