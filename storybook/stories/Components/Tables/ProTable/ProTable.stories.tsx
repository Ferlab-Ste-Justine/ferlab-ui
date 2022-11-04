import ProTable from "@ferlab/ui/components/ProTable";
import { PaginationViewPerQuery } from "@ferlab/ui/components/ProTable/Pagination/constants";
import { TProTableProps } from "@ferlab/ui/components/ProTable/types";
import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export default {
    title: "@ferlab/Components/Tables/ProTable",
    component: ProTable,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const ProTableStory = ({
    title,
    ...props
}: {
    title: string;
    props: TProTableProps<any>;
}) => (
    <>
        <h3>{title}</h3>
        <ProTable {...props} />
    </>
);

/* BasicTable */
export const BasicTable = ProTableStory.bind({});
BasicTable.args = {
    columns: [
        {
            key: "column_one",
            title: "Column 1",
            dataIndex: "column_one",
        },
        {
            key: "column_two",
            title: "Column 2",
            dataIndex: "column_two",
        },
        {
            key: "column_three",
            title: "Column 3",
            dataIndex: "column_three",
            tooltip: "This is Column 3",
            iconTitle: <AiOutlineUsergroupAdd />,
        },
        {
            key: "column_four",
            title: "Column 4",
            dataIndex: "column_four",
            defaultHidden: true,
        },
    ],
    dataSource: [
        {
            key: "1",
            column_one: "test",
            column_two: "test",
            column_three: "test",
            column_four: "test",
        },
        {
            key: "2",
            column_one: "test",
            column_two: "test",
            column_three: "test",
            column_four: "test",
        },
        {
            key: "3",
            column_one: "test",
            column_two: "test",
            column_three: "test",
            column_four: "test",
        },
        {
            key: "4",
            column_one: "test",
            column_two: "test",
            column_three: "test",
            column_four: "test",
        },
    ],
    tableId: "test-table",
    pagination: {
        pageSize: 2,
        defaultPageSize: 2,
        total: 4,
    },
    headerConfig: {
        marginBtm: 12,
        extra: [<a>Extra Actions</a>],
        enableColumnSort: true,
        itemCount: {
            pageIndex: 1,
            pageSize: 2,
            total: 4,
        },
        onClearSelection: () => {
            console.log("Clicked on clear selection");
        },
        onColumnStateChange: (state: any) => {
            console.log(state);
        },
    },
};

export const AfterSearchTable = ProTableStory.bind({});
AfterSearchTable.args = {
    columns: [
        {
            key: "column_one",
            title: "Column 1",
            dataIndex: "column_one",
        },
        {
            key: "column_two",
            title: "Column 2",
            dataIndex: "column_two",
        },
        {
            key: "column_three",
            title: "Column 3",
            dataIndex: "column_three",
            tooltip: "This is Column 3",
            iconTitle: <AiOutlineUsergroupAdd />,
        },
        {
            key: "column_four",
            title: "Column 4",
            dataIndex: "column_four",
            defaultHidden: true,
        },
    ],
    dataSource: [
        {
            key: "1",
            column_one: "test",
            column_two: "test",
            column_three: "test",
            column_four: "test",
        },
        {
            key: "2",
            column_one: "test",
            column_two: "test",
            column_three: "test",
            column_four: "test",
        },
        {
            key: "3",
            column_one: "test",
            column_two: "test",
            column_three: "test",
            column_four: "test",
        },
        {
            key: "4",
            column_one: "test",
            column_two: "test",
            column_three: "test",
            column_four: "test",
        },
    ],
    tableId: "test-table",
    pagination: {
        current: 1,
        queryConfig: {
            firstPageFlag: undefined,
            operations: undefined,
            pageIndex: 0,
            searchAfter: undefined,
            size: 10,
            sort: [{ field: "column_one", order: "desc" }],
        },
        onChange: (page: number, _) => {},
        searchAfter: {
            head: [],
            tail: [],
        },
        defaultViewPerQuery: PaginationViewPerQuery.Ten,
        total: 4,
    },
    headerConfig: {
        marginBtm: 12,
        extra: [<a>Extra Actions</a>],
        enableColumnSort: true,
        itemCount: {
            pageIndex: 1,
            pageSize: 2,
            total: 4,
        },
        onClearSelection: () => {
            console.log("Clicked on clear selection");
        },
        onColumnStateChange: (state: any) => {
            console.log(state);
        },
    },
};
