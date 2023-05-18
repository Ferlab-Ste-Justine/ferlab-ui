import BarChart from '@ferlab/ui/components/Charts/Bar';
import { Meta } from "@storybook/react/types-6-0";
import React from "react";

const data = [
    {
        "id": "1",
        "label": "label 1",
        "value": 6560
    },
    {
        "id": "2",
        "label": "label 2",
        "value": 2966
    },
    {
        "id": "3",
        "label": "label 3",
        "value": 2096
    },
    {
        "id": "4",
        "label": "label 4",
        "value": 1681
    }
]

export default {
    title: "@ferlab/Components/Charts/Bar",
    component: BarChart,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;


export const BarChartStory = () => (
    <BarChart title="Bar Chart Example" data={data}  />
);