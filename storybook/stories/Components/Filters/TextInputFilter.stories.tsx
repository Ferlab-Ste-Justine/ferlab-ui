import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import {
    IFilter,
    IFilterGroup,
    IFilterText,
    IFilterTextInputConfig,
    onChangeType,
    VisualType
} from "@ferlab/ui/components/filters/types";
import TextInputFilter, {TextInputFilterProps} from "@ferlab/ui/components/filters/TextInputFilter";

export default {
  title: "@ferlab/Components/Filters/TextInputFilter",
  component: TextInputFilter,
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

const TextInputFilterStory = ({title, filterGroup, onChange, ...props} : {
    title: string,
    filterGroup: IFilterGroup<IFilterTextInputConfig>,
    onChange: onChangeType,
    filters: IFilter<IFilterText>[];
    props: Story<TextInputFilterProps>}) => (
  <>
    <h3>{title}</h3>
    <TextInputFilter
        filterGroup={filterGroup}
        onChange={onChange}
        {...props} />
  </>
);

export const TextInputFilterStoryBasic = TextInputFilterStory.bind({});
TextInputFilterStoryBasic.args = {
    title: 'Text Input Filter',
    filterGroup: {
      type: VisualType.Text,
      field: 'this.field',
      config: {
        label: "Test Filter",
        placeholder: "My placeholder test"
      },
    },
    filters: [],
    onChange: () => null,
};

export const TextInputFilterStoryNoLabel = TextInputFilterStory.bind({});
TextInputFilterStoryNoLabel.args = {
    title: 'Text Input Filter No Label',
    filterGroup: {
      type: VisualType.Text,
      field: 'this.field',
      config: {
        placeholder: "My placeholder test"
      },
    },
    filters: [],
    onChange: () => null,
};