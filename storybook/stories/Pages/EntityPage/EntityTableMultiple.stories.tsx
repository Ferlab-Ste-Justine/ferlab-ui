import EntityTableMultiple, {
    IEntityTableMultiple,
} from "@ferlab/ui/pages/EntityPage/EntityTableMultiple";
import { Meta } from "@storybook/react/types-6-0";
import React from "react";

export default {
    title: "@ferlab/Pages/EntityPage/EntityTableMultiple",
    component: EntityTableMultiple,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const EntityTableMultipleStory = ({
    storyTitle,
    ...props
}: {
    storyTitle: string;
    props: IEntityTableMultiple;
}) => (
    <>
        <h3>{storyTitle}</h3>
        <EntityTableMultiple {...props} />
    </>
);

/* BasicTable */
export const BasicTableMultiple = EntityTableMultipleStory.bind({});
BasicTableMultiple.args = {
    id: "ID",
    title: "Title",
    titleExtra: [
        <span>View in data exploration</span>,
    ],
    header: <>Header</>,
    loading: false,
    tables: [
        {
            columns: [
                {
                    dataIndex: "columns1",
                    key: "columns1",
                    title: "table 1 columns one",
                },
                {
                    dataIndex: "columns2",
                    key: "columns2",
                    title: "table 1 columns two",
                },
                {
                    dataIndex: "columns3",
                    key: "columns3",
                    title: "table 1columns three",
                },
            ],
            data: [
                {
                    columns1: "Table 1 Columns 1, Row 1",
                    columns2: "Table 1 Columns 2, Row 1",
                    columns3: "Table 1 Columns 3, Row 1",
                },
                {
                    columns1: "Table 1 Columns 1, Row 2",
                    columns2: "Table 1 Columns 2, Row 2",
                    columns3: "Table 1 Columns 3, Row 2",
                },
                {
                    columns1: "Table 1 Columns 1, Row 3",
                    columns2: "Table 1 Columns 2, Row 3",
                    columns3: "Table 1 Columns 3, Row 3",
                },
            ],
            subtitle: <span>Subtitle for Table 1</span>,
        },

        {
            bordered: false,
            columns: [
                {
                    dataIndex: "columns1",
                    key: "columns1",
                    title: "columns one",
                },
                {
                    dataIndex: "columns2",
                    key: "columns2",
                    title: "columns two",
                },
                {
                    dataIndex: "columns3",
                    key: "columns3",
                    title: "columns three",
                },
            ],
            data: [
                {
                    columns1: "Table 2 Columns 1, Row 1",
                    columns2: "Table 2 Columns 2, Row 1",
                    columns3: "Table 2 Columns 3, Row 1",
                },
                {
                    columns1: "Table 2 Columns 1, Row 2",
                    columns2: "Table 2 Columns 2, Row 2",
                    columns3: "Table 2 Columns 3, Row 2",
                },
                {
                    columns1: "Table 2 Columns 1, Row 3",
                    columns2: "Table 2 Columns 2, Row 3",
                    columns3: "Table 2 Columns 3, Row 3",
                },
            ],
        },
    ],
};
