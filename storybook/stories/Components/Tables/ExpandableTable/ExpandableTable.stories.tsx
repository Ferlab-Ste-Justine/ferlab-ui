import React from "react";
import { Meta } from "@storybook/react/types-6-0";
import ExpandableTable, {
    TExpandableTableProps,
} from "@ferlab/ui/components/tables/ExpandableTable";

export default {
    title: "@ferlab/Components/Tables/ExpandableTable",
    component: ExpandableTable,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const ExpandableTableStory = ({
    title,
    ...props
}: {
    title: string;
    props: TExpandableTableProps;
}) => (
    <>
        <h3>{title}</h3>
        <ExpandableTable {...props} />
    </>
);

export const Basic = ExpandableTableStory.bind({});
Basic.args = {
    title: "Basic",
    nOfElementsWhenCollapsed: 3,
    buttonText: (showAll: boolean, hiddenNum: number) =>
        showAll ? "Show less" : `${hiddenNum} other row`,
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
    pagination: false,
};
