import React from "react";
import {Meta} from '@storybook/react/types-6-0';
import MultiLabel, {MultiLabelTypeEnum, MultiLabelProps, MultiLabelIconPositionEnum} from '@ferlab/ui/core/components/labels/MultiLabel';
import {AiOutlineSmile} from 'react-icons/ai';

export default {
  title: "@ferlab/Components/Labels/MultiLabel",
  component: MultiLabel,
  decorators: [(Story) => <><h2>{Story}</h2><Story/></>],
  argTypes: {
    className: {
      control: 'string',
    },
    type: {
      control: {
        type: 'select',
        options: Object.values(MultiLabelTypeEnum)
      },
    },
    iconPosition: {
      control: {
        type: 'select',
        options: Object.values(MultiLabelIconPositionEnum)
      },
    },
    label: {
      control: 'string',
    },
  },
} as Meta;

const MultiLabelPropsStory = ({title, style, ...props} : {
  title: string,
  style: React.CSSProperties,
  props: MultiLabelProps
}) => (
  <>
    <h3>{title}</h3>
    <MultiLabel
        style={{ ...style, border: 'thin dashed lightblue', padding: '10px'}}
        {...props}
    />
  </>
);

/* Inline */
export const MultiLabelPropsInline = MultiLabelPropsStory.bind({});
MultiLabelPropsInline.args = {
  title: 'Inline',
  subLabel: 'My Label',
  Icon:  <AiOutlineSmile/>,
  type: MultiLabelTypeEnum.Inline,
  iconPosition: MultiLabelIconPositionEnum.Middle,
  label: 12,
};

/* Stack */
export const MultiLabelPropsStack = MultiLabelPropsStory.bind({});
MultiLabelPropsStack.args = {
  title: 'Stack',
  subLabel: <div>My Label</div>,
  Icon:  <AiOutlineSmile/>,
  type: MultiLabelTypeEnum.Stack,
  iconPosition: MultiLabelIconPositionEnum.Middle,
  label: <div>total</div>,
};

/* Stack with top Icon */
export const MultiLabelPropsStackTopIcon = MultiLabelPropsStory.bind({});
MultiLabelPropsStackTopIcon.args = {
  title: 'Stack With Top Icon',
  subLabel: <div>My Label</div>,
  Icon:  <AiOutlineSmile/>,
  type: MultiLabelTypeEnum.Stack,
  iconPosition: MultiLabelIconPositionEnum.Top,
  label: <div>total</div>,
};