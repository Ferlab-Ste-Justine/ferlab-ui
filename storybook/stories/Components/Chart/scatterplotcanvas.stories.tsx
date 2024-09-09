import ScatterPlotChartCanvas from '@ferlab/ui/core/components/Charts/ScatterPlot/Canvas';
import volcano from './mocks/volcano_plot_large';
import { Meta } from "@storybook/react";
import React from "react";
import { Typography } from 'antd';


export default {
    title: "@ferlab/Components/Charts/ScatterPlotCanvas",
    component: ScatterPlotChartCanvas,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;


export const ScatterPlotCanvasChartBasic = () => (
    <>
        <h2>Scatter Plot Chart</h2>
        <div style={{
            display: 'flex', 
            width: '1200px', 
            margin: '0 auto',
            maxWidth: '1200px',
            minHeight: '1000px',
            height: '1200px'
        }}>
            <ScatterPlotChartCanvas
                title={<Typography.Title level={4}>Scatter Plot Chart Title</Typography.Title>}
                data={volcano}
                xScale={{ type: 'linear', min: -4, max: 4 }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                xFormat=">.2f"
                yFormat=">.2f"
                axisTop={null}
                axisRight={null}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemOpacity: 1,
                                },
                            },
                        ],
                        itemDirection: 'left-to-right',
                        itemHeight: 12,
                        itemsSpacing: 8,
                        itemWidth: 100,
                        justify: false,
                        symbolShape: 'circle',
                        symbolSize: 12,
                        translateX: 0,
                        translateY: 64,
                    },
                ]} 
                controls={{
                    zoom: {
                        step: 1,
                        max: 4
                    }
                }}
            />
        </div>

    </>
)

