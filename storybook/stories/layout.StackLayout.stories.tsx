import React from "react";
import StackLayout, 
  { IStackLayoutProps, StackOrientation } 
from '@ferlab/ui/layout/StackLayout';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: "@ferlab/ui/layout/StackLayout",
  component: StackLayout,
  decorators: [(Story) => <><h2>{Story}</h2><Story/></>],
  argTypes: {
    className: {
      control: 'string',
    },
    fitContent: {
      control: 'boolean',
    },
    flexContent: {
      control: 'boolean',
    },
    orientation: {
      control: {
        type: 'select',
        options: Object.values(StackOrientation)
      },
    },
    children: {
      control: 'object',
    },
    style: {
      control: 'object',
    },
    onClick: {
      action: 'click'
    }
  },
} as Meta;

const StackLayoutStory = ({title, style, ...props} : {title: string, style: React.CSSProperties, props: Story<IStackLayoutProps>}) => (
  <>
    <h3>{title}</h3>
    <StackLayout style={{ ...style, border: 'thin dashed lightblue', padding: '10px'}} {...props}>{props.children}</StackLayout>
  </>
);

const blockStyle = {
  background: 'lightblue', 
  height: '100px', 
  margin: '8px',
  width: '100px'
}

/* HORIZONTAL */
export const StackLayoutHorizontal = StackLayoutStory.bind({});
StackLayoutHorizontal.args = {
  title: 'Horizontal',
  children: (
    <>
      {
        [...Array(30).fill('')].map(_ => <div style={blockStyle} />)
      }
    </>
  ),
};

/* VERTICAL */
export const StackLayoutVertical = StackLayoutStory.bind({});
StackLayoutVertical.args = {
  title: 'Vertical',
  orientation: StackOrientation.Vertical,
  style: { height: '400px'},
  children: (
    <>
      {
        [...Array(10).fill('')].map(_ => <div style={blockStyle} />)
      }
    </>
  ),
};

/* VERTICAL */
export const StackLayoutCombined = StackLayoutStory.bind({});
StackLayoutCombined.args = {
  title: 'Vertical',
  orientation: StackOrientation.Vertical,
  style: { height: '400px'},
  children: (
    <>
    {[...Array(3).fill(Math.random())].map(x =>
      <StackLayout key={x} style={{ border: 'thin dashed lightgray', margin: '0px', padding: '0px'}} >
        {
          [...Array(10).fill(Math.random())].map(y => <div style={blockStyle} key={y} />)
        }
      </StackLayout>
    )}
    </>
  ),
};

