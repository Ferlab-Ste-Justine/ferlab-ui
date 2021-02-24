import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import ScrollableTable, {ScrollableTableProps} from "@ferlab/ui/components/tables/ScrollableTable";

export default {
  title: "@ferlab/Components/Tables/TableContent",
  component: ScrollableTable,
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

const ScrollableTableStory = ({title, style, ...props} : {title: string, style: React.CSSProperties, props: Story<ScrollableTableProps>}) => (
  <>
    <h3>{title}</h3>
    <ScrollableTable {...props}>{props.children}</ScrollableTable>
  </>
);

const arrayLarge = Array.from(Array(20).keys())

export const ScrollableTableLarge = ScrollableTableStory.bind({});
ScrollableTableLarge.args = {
  title: 'TableContent',
  children: (
      <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Contact</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
          {
              arrayLarge.map(x =>
                  <tr>
                      <td>{`Alfreds Futterkiste ${x}`}</td>
                      <td>{`Maria Anders ${x}`}</td>
                      <td>{`Germany ${x}`}</td>
                  </tr>)
          }
          </tbody>
      </table>
  ),
};

const arraySmall = Array.from(Array(10).keys())
export const ScrollableTableSmall = ScrollableTableStory.bind({});
ScrollableTableSmall.args = {
    title: 'TableContent',
    children: (
        <table>
            <thead>
            <tr>
                <th>Company</th>
                <th>Contact</th>
                <th>Country</th>
            </tr>
            </thead>
            <tbody>
            {
                arraySmall.map(x =>
                    <tr>
                        <td>{`Alfreds Futterkiste ${x}`}</td>
                        <td>{`Maria Anders ${x}`}</td>
                        <td>{`Germany ${x}`}</td>
                    </tr>)
            }
            </tbody>
        </table>
    ),
};



