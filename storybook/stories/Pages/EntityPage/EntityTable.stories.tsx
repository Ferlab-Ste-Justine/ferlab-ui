import EntityTable, {
    IEntityTable,
} from "@ferlab/ui/core/pages/EntityPage/EntityTable";
import { Meta } from "@storybook/react";
import React from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

export default {
    title: "@ferlab/Pages/EntityPage/EntityTable",
    component: EntityTable,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const EntityTableStory = ({
    storyTitle,
    ...props
}: {
    storyTitle: string;
    props: IEntityTable;
}) => (
    <>
        <h3>{storyTitle}</h3>
        <EntityTable {...props} />
    </>
);

export const BasicEntityTable = EntityTableStory.bind({});
BasicEntityTable.args = {
    bordered: true,
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
    data: [
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
    header: "Header",
    id: "Section",
    loading: false,
    size: "small",
    title: "Title",
    titleExtra: [
        <span>View in data exploration</span>,
    ],
    emptyMessage: "No data available",
};

export const SummaryEntityTable = EntityTableStory.bind({});
SummaryEntityTable.args = {
    bordered: true,
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
    data: [
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
    header: "Header",
    id: "Section",
    loading: false,
    size: "small",
    title: "Title",
    emptyMessage: "No data available",
    summaryColumns: [
        {
            index: 0,
            value: "Summary Columns 1",
        },
        {
            index: 1,
            value: "Summary Columns 2",
        },
        {
            index: 2,
            value: "Summary Columns 3",
        },
    ],
};
