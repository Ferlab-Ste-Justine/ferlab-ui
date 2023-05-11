import PieChart from '@ferlab/ui/components/Charts/Pie';
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
    title: "@ferlab/Components/Charts/Pie",
    component: PieChart,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;


export const PieChartBaseStory = () => (
    <PieChart title="Pie Chart Example" data={data} />
);