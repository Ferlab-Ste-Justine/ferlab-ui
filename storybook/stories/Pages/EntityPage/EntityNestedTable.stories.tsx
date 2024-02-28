import EntityNestedTable, { IEntityNestedTableProps } from '@ferlab/ui/core/pages/EntityPage/EntityNestedTable';
import { Meta } from '@storybook/react';
import { Table, Typography } from 'antd';
import React from 'react';

export default {
    title: '@ferlab/Pages/EntityPage/EntityNestedTable',
    component: EntityNestedTable,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const EntityNestedTableStory = ({ storyTitle, ...props }: { storyTitle: string; props: IEntityNestedTableProps }) => (
    <>
        <h3>{storyTitle}</h3>
        <EntityNestedTable {...props} />
    </>
);

const expandedRowRender = () => {
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Upgrade Status',
            dataIndex: 'upgradeNum',
            key: 'upgradeNum',
        },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
        data.push({
            key: i.toString(),
            date: '2014-12-24 23:12:00',
            name: 'This is production name',
            upgradeNum: 'Upgraded: 56',
        });
    }
    return <Table columns={columns} dataSource={data} pagination={false} bordered />;
};
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Platform',
        dataIndex: 'platform',
        key: 'platform',
    },
    {
        title: 'Version',
        dataIndex: 'version',
        key: 'version',
    },
    {
        title: 'Upgraded',
        dataIndex: 'upgradeNum',
        key: 'upgradeNum',
    },
    {
        title: 'Creator',
        dataIndex: 'creator',
        key: 'creator',
    },
    {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
    },
];
const data = [];
for (let i = 0; i < 3; ++i) {
    data.push({
        key: i.toString(),
        name: 'Screem',
        platform: 'iOS',
        version: '10.3.4.5654',
        upgradeNum: 500,
        creator: 'Jack',
        createdAt: '2014-12-24 23:12:00',
    });
}

export const BasicEntityNestedTable = EntityNestedTableStory.bind({});
BasicEntityNestedTable.args = {
    columns: columns,
    data: data,
    expandedRowRender: expandedRowRender,
    header: <Typography.Text>Entity Nested Table</Typography.Text>,
    id: '1',
    loading: false,
    noDataLabel: 'No data available',
    title: 'Title',
};
