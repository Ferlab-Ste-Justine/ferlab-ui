import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import {
    IFilter,
    IFilterGroup,
    IFilterRange,
    onChangeType,
    VisualType
} from "@ferlab/ui/components/filters/types";
import {dictionaryFrench, rangeFilters} from "./data";
import RangeFilter, {RangeFilterProps} from "@ferlab/ui/components/filters/RangeFilter";

export default {
  title: "@ferlab/Components/Filters/RangeFilter",
  component: RangeFilter,
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

export const TermFilterStoryMore = RangeFilterStory.bind({});
TermFilterStoryMore.args = {
    title: 'RangeFilter',
    filterGroup: {
      type: VisualType.Range,
      field: 'this.field',
      config: {
        rangeTypes: [{
            key: 'this.field',
            name: 'Years',
        }],
        step: 0.00001,
        min: 0.000029999999242136255,
        max: 0.9999300241470337,
    },
      title: 'title_filter_group'
  },
    filters: rangeFilters,
    onChange: () => undefined,
};

export const TermFilterStoryDictionary = RangeFilterStory.bind({});
TermFilterStoryDictionary.args = {
    title: 'RangeFilter French',
    filterGroup: {
      type: VisualType.Range,
      field: 'this.field',
      config: {
        rangeTypes: [{
            key: 'this.field',
            name: 'Years',
        }],
        min: 1,
        max: 2,
    },
      title: 'title_filter_group'
  },
    filters: rangeFilters,
    onChange: () => undefined,
    dictionary: dictionaryFrench,
};

export const TermFilterStoryCustomOperator = RangeFilterStory.bind({});
TermFilterStoryCustomOperator.args = {
    title: 'RangeFilter Custom Operators',
    filterGroup: {
      type: VisualType.Range,
      field: 'this.field',
      config: {
        rangeTypes: [{
            key: 'this.field',
            name: 'Years',
        }],
        operators: [
          {
            operator: "==",
            name: "Custom Operator 1",
            disableMax: true
          },
          {
            operator: "!=",
            name: "Custom Operator 2"
          }
        ],
        min: 1,
        max: 2,
    },
      title: 'title_filter_group'
  },
    filters: rangeFilters,
    onChange: () => undefined,
};

export const TermFilterStoryWithoutUnit = RangeFilterStory.bind({});
TermFilterStoryWithoutUnit.args = {
    title: 'RangeFilter No Units',
    filterGroup: {
      type: VisualType.Range,
      field: 'this.field',
      config: {
        min: 1,
        max: 2,
    },
      title: 'title_filter_group'
  },
    filters: rangeFilters,
    onChange: () => undefined,
};