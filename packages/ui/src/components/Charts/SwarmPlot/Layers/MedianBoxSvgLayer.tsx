import React from 'react';

import { ComputedDatum, SwarmRawDatum } from '../type';

type TTheme = {
    rect: string;
    median: string;
    limit: string;
};

export type TSwarmPlotMedianSvgLayer = {
    nodes: ComputedDatum<SwarmRawDatum>[];
    active: boolean;
    groups: string[];
    theme: {
        [key: string]: TTheme;
    };
};

const OUTER_LINE_SIZE = 20;

const sortY = (a: ComputedDatum<SwarmRawDatum>, b: ComputedDatum<SwarmRawDatum>) => {
    if (a.y < b.y) {
        return -1;
    } else if (a.y > b.y) {
        return 1;
    }
    return 0;
};

const sortX = (a: ComputedDatum<SwarmRawDatum>, b: ComputedDatum<SwarmRawDatum>) => {
    if (a.x < b.x) {
        return -1;
    } else if (a.x > b.x) {
        return 1;
    }
    return 0;
};

/**
 * Median box
 * Display a box plot of the FPKM depending on the samples for the selected gene the
 * - median,
 * - quartiles (lower Q1 and upper Q3)
 */
const MedianBox = ({
    limit,
    median,
    rect,
    theme,
}: {
    theme: TTheme;
    rect: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    median: {
        x1: number;
        x2: number;
        y1: number;
        y2: number;
    };
    limit: {
        x: number;
        y1: number;
        y2: number;
    };
}) => (
    <>
        {/* Box */}
        <rect className={theme.rect} height={rect.height} opacity={0.7} width={rect.width} x={rect.x} y={rect.y} />

        {/* Median */}
        <line className={theme.median} opacity={0.7} x1={median.x1} x2={median.x2} y1={median.y1} y2={median.y2} />

        {/* Limit */}
        <line className={theme.limit} opacity={0.7} x1={limit.x} x2={limit.x} y1={limit.y1} y2={limit.y2} />
        <line
            className={theme.limit}
            x1={limit.x - OUTER_LINE_SIZE}
            x2={limit.x + OUTER_LINE_SIZE}
            y1={limit.y2}
            y2={limit.y2}
        />
        <line
            className={theme.limit}
            x1={limit.x - OUTER_LINE_SIZE}
            x2={limit.x + OUTER_LINE_SIZE}
            y1={limit.y1}
            y2={limit.y1}
        />
    </>
);

const SwarmPlotBoxPlotSvgLayer = ({ active, groups, nodes, theme }: TSwarmPlotMedianSvgLayer): React.ReactElement => {
    if (!active || nodes.length === 0) return <></>;

    return (
        <>
            {groups.map((group) => {
                const groupedNodes = nodes.filter((node) => node.group === group);
                const groupedNodesY = [...groupedNodes].sort(sortY);
                const groupedNodesX = [...groupedNodes].sort(sortX);
                if (groupedNodes.length === 0) {
                    return;
                }

                const minYNode = groupedNodesY[groupedNodesY.length - 1];
                const maxYNode = groupedNodesY[0];
                const minXNode = groupedNodesX[0];
                const maxXNode = groupedNodesX[groupedNodesX.length - 1];

                const q1Index = Math.floor(groupedNodesY.length * 0.25);
                const medianIndex = Math.ceil(groupedNodesY.length * 0.5);
                const q3Index = Math.ceil(groupedNodesY.length * 0.75);
                if (q3Index >= groupedNodesY.length) {
                    return <></>;
                }
                const quartile3 = groupedNodesY[q1Index];
                const median = groupedNodesY[medianIndex];
                const quartile1 = groupedNodesY[q3Index];
                const radius = minYNode.size / 2;
                const diameter = minYNode.size;

                return (
                    <MedianBox
                        limit={{
                            x: minXNode.x + (maxXNode.x - minXNode.x) / 2,
                            y1: minYNode.y + radius,
                            y2: maxYNode.y - radius,
                        }}
                        median={{
                            x1: minXNode.x - radius,
                            x2: maxXNode.x + radius,
                            y1: median.y,
                            y2: median.y,
                        }}
                        rect={{
                            height: Math.abs(quartile3.y - quartile1.y) + diameter,
                            width: Math.abs(maxXNode.x - minXNode.x) + diameter,
                            x: minXNode.x - radius,
                            y: quartile3.y - radius,
                        }}
                        theme={theme[group]}
                    />
                );
            })}
        </>
    );
};

export default SwarmPlotBoxPlotSvgLayer;
