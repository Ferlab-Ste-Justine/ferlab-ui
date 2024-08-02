import React, { useState } from 'react';
import { ScatterPlotDatum, ScatterPlotNodeData } from '@nivo/scatterplot';
import { Space } from 'antd';

import BarChart from '../Bar';

import ScatterPlotChart from './index';
import sample_plot from './sample_plot';
import volcano from './volcano_plot';

const WIDTH = 960;
const HEIGHT = 540;

type TProteomeDatum = ScatterPlotDatum & {
    id: string;
};

const DICTIONARY = {
    down_regulated: 'down (q < 0.1)',
    not_significant: 'not significant',
    up_regulated: 'up (q < 0.1)',
};

const volcano_data = volcano.map((datum) => ({
    data: datum.data,
    id: (DICTIONARY as any)[datum.id],
}));

const getBarCharProps = (nodes: ScatterPlotNodeData<ScatterPlotDatum>[]) => {
    const keys = nodes.map((node) => node.id);
    return nodes.map((node) => ({
        id: node.id,
        value: keys.length / nodes.length,
    }));
};

/**
 * This is a mock component for the task https://d3b.atlassian.net/browse/SJIP-924
 * It will be moved as his own component later
 * @returns
 */
export const Proteome = (): JSX.Element => {
    const [selectedNodes, setSelectedNodes] = useState<ScatterPlotNodeData<ScatterPlotDatum>[]>([]);
    return (
        <Space>
            <ScatterPlotChart
                data={volcano_data}
                height={HEIGHT}
                layers={['grid', 'axes', 'nodes', 'markers', 'mesh', 'legends', 'annotations']}
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
                nodeId={(d) => `${(d.data as TProteomeDatum).id}`}
                onBoxSelectNodes={(nodes) => {
                    setSelectedNodes(nodes);
                }}
                onClick={(node) => {
                    setSelectedNodes([node]);
                }}
                theme={{
                    annotations: {
                        symbol: {
                            color: '#d63031',
                            fill: '#d63031',
                        },
                    },
                }}
                tooltip={({ node: { id, xValue, yValue } }) => (
                    <div style={{ backgroundColor: '#ddd', padding: '8px' }}>
                        <div>Analyte: {id}</div>
                        <div>Fold Change {xValue as number}</div>
                        <div>q-value {yValue as number}</div>
                        <div>
                            {xValue as number} {yValue as number}
                        </div>
                    </div>
                )}
                width={WIDTH}
                xFormat=">.2f"
                yFormat=">.2f"
            />
            {selectedNodes.length == 1 && (
                <Space direction="vertical">
                    <div style={{ textAlign: 'center' }}>{selectedNodes[0].id}</div>
                    <ScatterPlotChart
                        axisRight={null}
                        axisTop={null}
                        data={(sample_plot as any)[selectedNodes[0].id]}
                        hasControls={false}
                        height={HEIGHT}
                        legends={[
                            {
                                anchor: 'top',
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
                                symbolSize: 12,
                                translateX: 0,
                                translateY: -32,
                            },
                        ]}
                        width={WIDTH}
                        xFormat=">.2f"
                        yFormat=">.2f"
                    />
                </Space>
            )}

            {selectedNodes.length > 1 && (
                <div style={{ height: `${HEIGHT}px`, width: `${WIDTH}px` }}>
                    <BarChart
                        data={getBarCharProps(selectedNodes)}
                        enableLabel={false}
                        layout="horizontal"
                        margin={{
                            bottom: 0,
                            left: 96,
                            right: 0,
                            top: 0,
                        }}
                        padding={0}
                    />
                </div>
            )}
        </Space>
    );
};

export default Proteome;
