import React from "react";
import {Meta, Story} from '@storybook/react/types-6-0';
import TableContent, {TableContentProps} from "@ferlab/ui/TableContent/TableContent";
import {Table} from "antd";


export default {
  title: "@ferlab/Components/TableContent",
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

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

/* HORIZONTAL */
export const StackLayoutHorizontal = TableContentStory.bind({});
StackLayoutHorizontal.args = {
  title: 'Horizontal',
  children: (
      <Table columns={columns} dataSource={data} />
      // <div>totototo</div>
  ),
};



