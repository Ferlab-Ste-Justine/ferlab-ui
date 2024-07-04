import BarChart from '@ferlab/ui/core/components/Charts/Bar';
import { Meta } from "@storybook/react";
import React from "react";


const getData = (size: number) => {
    const data = [];
    for(var i = 0; i < size; i++){
        data.push({
            id: i,
            label: `Label ${i}`,
            value: Math.floor(Math.random() * 100) + 10
        })

    }

    return data;
}


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
    <>
        <h2>Bar chart</h2>
        <div style={{width: '600px', height: '600px' }}>
            <BarChart
                title="Bar Chart Example"
                data={getData(4)}
                margin={{
                    top: 12,
                    bottom: 45,
                    left: 60,
                    right: 24,
                }}
            />
        </div>
    </>
);

export const BarChartWithLegendStory = () => (
    <>
        <h2>Bar chart</h2>
        <div style={{marginLeft: '45px', width: '600px', height: '600px' }}>
            <BarChart
                title="Bar Chart Example"
                data={getData(4)}
                axisLeft={{
                    legend: 'Legend Left',
                    legendPosition: 'middle',
                    legendOffset: -45,
                }}
                axisBottom={{
                    legend: 'Legend Bottom',
                    legendPosition: 'middle',
                    legendOffset: 25,
                }}
                margin={{
                    top: 12,
                    bottom: 45,
                    left: 60,
                    right: 24,
                }}
            />
        </div>
    </>
);


const autoPaddingStyle = {
    marginLeft: '16px', marginBottom: '32px', width: '100%', height: '600px' 
}
export const BarChartAutoPaddingWithLegendStory = () => (
    <>
        <h2>Bar chart</h2>
        <div style={{display: 'flex'}}>
            {[1, 2, 3, 4, 5].map(size => (
                    <div style={autoPaddingStyle}>
                        <BarChart
                            title="Vertical Bar Chart Example"
                            data={getData(size)}
                            margin={{
                                top: 12,
                                bottom: 40,
                                left: 60,
                                right: 24,
                            }}
                        />
                    </div>
                )
            )}
        </div>
        <div style={{display: 'flex'}}>
            {[6, 7, 8, 9, 10].map(size => (
                    <div style={autoPaddingStyle}>
                        <BarChart
                            title="Vertical Bar Chart Example"
                            data={getData(size)}
                            margin={{
                                top: 12,
                                bottom: 40,
                                left: 60,
                                right: 24,
                            }}
                        />
                    </div>
                )
            )}
        </div>
        <div style={{display: 'flex', marginTop: '24px'}}>
            {[1, 2, 3, 4, 5].map(size =>  (
                    <div style={autoPaddingStyle}>
                        <BarChart
                            title="Horizontal Bar Chart Example"
                            data={getData(size)}
                            layout='horizontal'
                            margin={{
                                top: 12,
                                bottom: 40,
                                left: 60,
                                right: 24,
                            }}
                        />
                    </div>
                )
            )}
        </div>
        <div style={{display: 'flex', marginTop: '24px'}}>
            {[6, 7, 8, 9, 10].map(size =>  (
                    <div style={autoPaddingStyle}>
                        <BarChart
                            title="Horizontal Bar Chart Example"
                            data={getData(size)}
                            layout='horizontal'
                            margin={{
                                top: 12,
                                bottom: 40,
                                left: 60,
                                right: 24,
                            }}
                        />
                    </div>
                )
            )}
        </div>
    </>
);
