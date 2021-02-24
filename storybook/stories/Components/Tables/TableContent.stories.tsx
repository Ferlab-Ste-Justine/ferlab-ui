import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import TableContent, {TableContentProps} from "@ferlab/ui/components/tables/TableContent";
import {Button, Table} from "antd";


export default {
  title: "@ferlab/Components/Tables/TableContent",
  component: TableContent,
  decorators: [(Story) => <><h2>{Story}</h2><Story/></>],
  argTypes: {
    className: {
      control: 'string',
    },
    children: {
      control: 'object',
    },
  },
} as Meta;

const TableContentStory = ({title, style, ...props} : {title: string, style: React.CSSProperties, props: Story<TableContentProps>}) => (
  <>
    <h3>{title}</h3>
    <TableContent {...props}>{props.children}</TableContent>
  </>
);

export const StackLayoutHorizontal = TableContentStory.bind({});
const arrayLength = Array.from(Array(20).keys())
StackLayoutHorizontal.args = {
  title: 'TableContent',
  children: (
      <table>
        <tr>
          <th>Company</th>
          <th>Contact</th>
          <th>Country</th>
        </tr>
          {
              arrayLength.map(x =>
                  <tr>
                      <td>{`Alfreds Futterkiste ${x}`}</td>
                      <td>{`Maria Anders ${x}`}</td>
                      <td>{`Germany ${x}`}</td>
                  </tr>)
          }
      </table>
  ),
};



