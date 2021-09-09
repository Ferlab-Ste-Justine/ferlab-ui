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

export const Basic = TextInputFilterStory.bind({});
Basic.args = {
    title: 'Text Input Filter',
    filterGroup: {
      type: VisualType.Text,
      field: 'this.field',
      config: {
        label: "Test Filter",
        placeholder: "My placeholder test",
        tooltip: {
          text: "Hello from tooltip"
        }
      },
    },
    filters: [],
};

export const NoTooltip = TextInputFilterStory.bind({});
NoTooltip.args = {
    title: 'Text Input Filter no ToolTip',
    filterGroup: {
      type: VisualType.Text,
      field: 'this.field',
      config: {
        label: "Test Filter",
        placeholder: "My placeholder test"
      }
    },
    filters: [],
};

export const NoLabel = TextInputFilterStory.bind({});
NoLabel.args = {
    title: 'Text Input Filter No Label',
    filterGroup: {
      type: VisualType.Text,
      field: 'this.field'
    },
    filters: [],
};

export const WithInputValidation = TextInputFilterStory.bind({});
WithInputValidation.args = {
    title: 'Text Input Filter With Validation',
    filterGroup: {
      type: VisualType.Text,
      field: 'this.field',
      config: {
        label: "Test Filter No Digits",
        placeholder: "Input doesn't accept digits",
        tooltip: {
          text: "Hello from tooltip"
        },
        validateInput: (text: string) => {
          return !/\d/.test(text);
        },
      },
    },
    filters: [],
};