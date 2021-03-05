import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import CheckboxFilter, {TermFilterProps} from "@ferlab/ui/components/filters/CheckboxFilter";
import {
    IDictionary,
    IFilter,
    IFilterCount,
    IFilterGroup,
    onChangeType,
    VisualType
} from "@ferlab/ui/components/filters/types";
import {dictionaryFrench, filters} from "./data";

export default {
  title: "@ferlab/Components/Filters/CheckboxFilter",
  component: CheckboxFilter,
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
    dictionary: IDictionary;
    props: Story<TermFilterProps>}) => (
  <>
    <h3>{title}</h3>
    <CheckboxFilter maxShowing={maxShowing} filterGroup={filterGroup} onChange={onChange} {...props} />
  </>
);

const filerGroup: IFilterGroup = {
    type: VisualType.Checkbox,
    field: 'this.field',
    title: 'title_filter_group'
}

const onChangeTypeStory: onChangeType = () => null


export const TermFilterStoryMore = TermFilterStory.bind({});
TermFilterStoryMore.args = {
    title: 'CheckboxFilter More',
    maxShowing: 6,
    filterGroup: filerGroup,
    onChangeType: onChangeTypeStory(filerGroup, filters),
    hasSearchInput: true,
    filters: filters,
};

export const TermFilterStoryFew = TermFilterStory.bind({});
TermFilterStoryFew.args = {
    title: 'CheckboxFilter Few',
    maxShowing: 6,
    filterGroup: filerGroup,
    onChangeType: onChangeTypeStory(filerGroup, filters),
    hasSearchInput: true,
    filters: filters.slice(0, 4),
};

export const TermFilterStoryNoData = TermFilterStory.bind({});
TermFilterStoryNoData.args = {
    title: 'CheckboxFilter No Data',
    maxShowing: 6,
    filterGroup: filerGroup,
    onChangeType: onChangeTypeStory(filerGroup, filters),
    hasSearchInput: true,
    filters: [],
};

export const TermFilterStoryInFrench = TermFilterStory.bind({});
TermFilterStoryInFrench.args = {
    dictionary: dictionaryFrench,
    title: 'CheckboxFilter in French',
    maxShowing: 6,
    filterGroup: filerGroup,
    onChangeType: onChangeTypeStory(filerGroup, filters),
    hasSearchInput: true,
    filters: filters,
};
