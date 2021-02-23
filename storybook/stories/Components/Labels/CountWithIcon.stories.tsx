import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import CountWithIcon, {CountWithIconTypeEnum, CountWithIconProps} from '@ferlab/ui/components/labels/CountWithIcon';
import {SmileOutlined,} from '@ant-design/icons';

export default {
  title: "@ferlab/Components/Labels/CountWithIcon",
  component: CountWithIcon,
  decorators: [(Story) => <><h2>{Story}</h2><Story/></>],
  argTypes: {
    className: {
      control: 'string',
    },
    type: {
      control: {
        type: 'select',
        options: Object.values(CountWithIconTypeEnum)
      },
    },
    label: {
      control: 'string',
    },
  },
} as Meta;

const CountWithIconStory = ({title, label, total, Icon, style, ...props} : {
  title: string,
  label: React.ReactNode,
  total: React.ReactNode,
  Icon: React.ReactNode,
  style: React.CSSProperties,
  props: Story<CountWithIconProps>
}) => (
  <>
    <h3>{title}</h3>
    <CountWithIcon
        style={{ ...style, border: 'thin dashed lightblue', padding: '10px'}}
        label={label}
        total={total}
        Icon={Icon}
        {...props}
    />
  </>
);

/* Inline */
export const CountWithIconInline = CountWithIconStory.bind({});
CountWithIconInline.args = {
  title: 'Inline',
  label: 'My Label',
  Icon:  <SmileOutlined/>,
  type: 'inline',
  total: 12,
};

/* Stack */
export const CountWithIconStack = CountWithIconStory.bind({});
CountWithIconStack.args = {
  title: 'Stack',
  label: <div>My Label</div>,
  Icon:  <SmileOutlined/>,
  type: 'stack',
  total: <div>total</div>,
};