import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import TermFilter, {TermFilterProps} from "@ferlab/ui/components/filters/TermFilter";
import {IFilter, IFilterCount, IFilterGroup, onChangeType} from "@ferlab/ui/components/filters/Filters";

export default {
  title: "@ferlab/Components/Filters/TermFilter",
  component: TermFilter,
    decorators: [(Story) =>
        <><div className={'story_container'} style={{height: 300, width: 400, display:'inline-grid'}}><Story/></div></>],
  argTypes: {
    className: {
      control: 'string',
    },
    children: {
      control: 'object',
    },
  },
} as Meta;

const TermFilterStory = ({title, maxShowing, field, filterGroup, onChange, ...props} : {
    title: string,
    field: string,
    maxShowing: number,
    filterGroup: IFilterGroup,
    onChange: onChangeType,
    hasSearchInput: boolean;
    filters: IFilter<IFilterCount>[];
    props: Story<TermFilterProps>}) => (
  <>
    <h3>{title}</h3>
    <TermFilter maxShowing={maxShowing} field={field} filterGroup={filterGroup} onChange={onChange} {...props} />
  </>
);

export const TermFilterStoryTOTO = TermFilterStory.bind({});
TermFilterStoryTOTO.args = {
    title: 'TableContent',
    field: 'this.field',
    maxShowing: 6,
    filterGroup:


};



