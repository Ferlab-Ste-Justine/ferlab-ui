import ScatterPlotChart from '@ferlab/ui/core/components/Charts/ScatterPlot';
import volcano from '@ferlab/ui/core/components/Charts/ScatterPlot/volcano_plot';
import { Meta } from "@storybook/react";
import React from "react";


export default {
    title: "@ferlab/Components/Charts/ScatterPlot",
    component: ScatterPlotChart,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;


export const ScatterPlotChartBasic = () => (
    <>
        <h2>Scatter Plot Chart</h2>
        <div>
            <ScatterPlotChart
                data={volcano}
                height={800} 
                width={1200}
                xScale={{ type: 'linear', min: -4, max: 4 }}
                yScale={{ type: 'linear', min: 'auto', max: 'auto' }}
                xFormat=">.2f"
                yFormat=">.2f"
                pixelRatio={2}
                axisTop={null}
                axisRight={null}
                legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 130,
                            translateY: 0,
                            itemWidth: 100,
                            itemHeight: 12,
                            itemsSpacing: 5,
                            itemDirection: 'left-to-right',
                            symbolSize: 12,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        },
                        {
                            anchor: 'top-left',
                            direction: 'column',
                            justify: false,
                            translateX: 0,
                            translateY: 0,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemsSpacing: 0,
                            symbolSize: 20,
                            itemDirection: 'left-to-right'
                        }
                    ]}
            />
        </div>

    </>
)

