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
];

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



export const PieChartBasic = () => (

    <>
        <h2>Pie Chart</h2>
        <div style={{width: '600px', height: '600px' }}>
            <PieChart 
            data={data} 
            width={400} 
            height={500} 
            />
        </div>
    </>
)
export const PieChartWithLegend = () => (

    <>
        <h2>Pie Chart with Legend</h2>
        <div style={{width: '600px', height: '600px' }}>
            <PieChart 
                data={data} 
                width={400} 
                height={500} 
                legends={[{
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemTextColor: '#000'
                            }
                        }
                    ]}]}
            />
        </div>
    </>
)
