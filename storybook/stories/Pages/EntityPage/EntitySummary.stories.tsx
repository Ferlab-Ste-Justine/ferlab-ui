import EntitySummary, {
    ISummaryProps,
} from "@ferlab/ui/pages/EntityPage/EntitySummary";
import { Meta } from "@storybook/react/types-6-0";
import React from "react";

export default {
    title: "@ferlab/Pages/EntityPage/EntitySummary",
    component: EntitySummary,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const EntitySummaryStory = ({
    storyTitle,
    ...props
}: {
    storyTitle: string;
    props: ISummaryProps;
}) => (
    <>
        <h3>{storyTitle}</h3>
        <EntitySummary {...props} />
    </>
);

export const BasicEntitySummary = EntitySummaryStory.bind({});
BasicEntitySummary.args = {
    id: "ID",
    title: "Title",
    header: <>Header</>,
    loading: false,
    data: [
        {
            column: {
                lg: 12,
                md: 24,
                xs: 24,
            },
            rows: [
                {
                    data: [
                        {
                            label: "Row 1 - Label 1",
                            value: "Row 1 - Value 1",
                        },
                        {
                            label: "Row 1 - Label 2",
                            value: "Row 1 - Value 2",
                        },
                    ],
                    title: "",
                },
            ],
        },
        {
            column: {
                lg: 12,
                md: 24,
                xs: 24,
            },
            rows: [
                {
                    data: [
                        {
                            label: "Row 2 - Label 1",
                            value: "Row 2 - Value 1",
                        },
                        {
                            label: "Row 2 - Label 2",
                            value: "Row 2 - Value 2",
                        },
                    ],
                    title: "Title Row 2",
                },
                {
                    data: [
                        {
                            label: "Row 3 - Label 1",
                            value: "Row 3 - Value 1",
                        },
                    ],
                    title: "Title Row 3",
                },
            ],
        },
    ],
};

export const ThreeColumnsEntitySummary = EntitySummaryStory.bind({});
ThreeColumnsEntitySummary.args = {
    id: "ID",
    title: "Title",
    header: <>Header</>,
    loading: false,
    data: [
        {
            column: {
                lg: 8,
                md: 24,
                xs: 24,
            },
            rows: [
                {
                    data: [
                        {
                            label: "Row 1 - Label 1",
                            value: "Row 1 - Value 1",
                        },
                        {
                            label: "Row 1 - Label 2",
                            value: "Row 1 - Value 2",
                        },
                    ],
                    title: "",
                },
            ],
        },
        {
            column: {
                lg: 8,
                md: 24,
                xs: 24,
            },
            rows: [
                {
                    data: [
                        {
                            label: "Row 2 - Label 1",
                            value: "Row 2 - Value 1",
                        },
                        {
                            label: "Row 2 - Label 2",
                            value: "Row 2 - Value 2",
                        },
                    ],
                    title: "Title Row 2",
                },
                {
                    data: [
                        {
                            label: "Row 3 - Label 1",
                            value: "Row 3 - Value 1",
                        },
                    ],
                    title: "Title Row 3",
                },
            ],
        },
        {
            column: {
                lg: 8,
                md: 24,
                xs: 24,
            },
            rows: [
                {
                    data: [
                        {
                            label: "Row 2 - Label 1",
                            value: "Row 2 - Value 1",
                        },
                        {
                            label: "Row 2 - Label 2",
                            value: "Row 2 - Value 2",
                        },
                        {
                            label: "Row 3 - Label 1",
                            value: "Row 3 - Value 1",
                        },
                    ],
                    title: "Title Row 3",
                },
            ],
        },
    ],
};
