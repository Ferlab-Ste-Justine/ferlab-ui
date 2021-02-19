import React from "react";
import ScrollView, 
  { ScrollViewProps, StackOrientation } 
from '@ferlab/ui/layout/ScrollView';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: "@ferlab/ui/layout/ScrollView",
  component: ScrollView,
  decorators: [(Story) => <><h2>{Story}</h2><Story/></>],
  argTypes: {
    className: {
      control: 'string',
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

const ScrollViewStory = ({title, style, ...props} : {title: string, style: React.CSSProperties, props: Story<ScrollViewProps>}) => (
  <>
    <h3>{title}</h3>
    <ScrollView style={{ ...style, border: 'thin dashed lightblue', padding: '10px'}} {...props}>{props.children}</ScrollView>
  </>
);

const blockStyle = {
  background: 'lightblue', 
  height: '100px', 
  margin: '8px',
  width: '100px'
}

/* HORIZONTAL */
export const ScrollViewHorizontal = ScrollViewStory.bind({});
ScrollViewHorizontal.args = {
  title: 'Horizontal',
  orientation: StackOrientation.Horizontal,
  style: { height: '120px'},
  children: (
    <>
      {
        [...Array(30).fill('')].map(_ => <div style={blockStyle} />)
      }
    </>
  ),
};

/* VERTICAL */
export const ScrollViewVertical = ScrollViewStory.bind({});
ScrollViewVertical.args = {
  title: 'Vertical',
  orientation: StackOrientation.Vertical,
  style: { height: '200px'},
  children: (
    <>
      {
        [...Array(10).fill('')].map(_ => <div style={blockStyle} />)
      }
    </>
  ),
};

/* VERTICAL */
export const ScrollViewCombined = ScrollViewStory.bind({});
ScrollViewCombined.args = {
  title: 'Vertical',
  orientation: StackOrientation.Horizontal,
  style: { height: '200px'},
  children: (
    <>
    {[...Array(13).fill(Math.random())].map(x =>
      <ScrollView key={x} style={{ border: 'thin dashed lightgray', margin: '0px', padding: '0px'}} >
        {
          [...Array(10).fill(Math.random())].map(y => <div style={blockStyle} key={y} />)
        }
      </ScrollView>
    )}
    </>
  ),
};

