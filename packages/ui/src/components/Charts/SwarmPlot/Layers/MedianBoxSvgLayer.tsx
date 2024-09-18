import React from 'react';

import { ComputedDatum, SwarmRawDatum } from '../type';

type TTheme = {
    rect: string;
    line: string;
};

export type TSwarmPlotMedianSvgLayer = {
    nodes: ComputedDatum<SwarmRawDatum>[];
    active: boolean;
    groups: string[];
    theme: {
        [key: string]: TTheme;
    };
};

const sort = (a: ComputedDatum<SwarmRawDatum>, b: ComputedDatum<SwarmRawDatum>) => {
    if (a.data.y < b.data.y) {
        return -1;
    } else if (a.data.y > b.data.y) {
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
    height,
    median,
    theme,
    width,
    x,
    y,
}: {
    theme: TTheme;
    x: number;
    y: number;
    height: number;
    width: number;
    median: number;
}) => (
    <>
        <rect className={theme.rect} height={height} width={width} x={x} y={y} />
        <line className={theme.line} x1={x} x2={x + width} y1={median} y2={median} />
    </>
);

const SwarmPlotMedianBoxSvgLayer = ({ active, groups, nodes, theme }: TSwarmPlotMedianSvgLayer): React.ReactElement => {
    if (!active) return <></>;

    return (
        <>
            {groups.map((group) => {
                const groupedNodes = nodes.filter((node) => node.group === group).sort(sort);
                let minX = groupedNodes[0].x;
                let maxX = groupedNodes[0].x;
                groupedNodes.forEach((node) => {
                    if (minX > node.x) {
                        minX = node.x;
                    }
                    if (maxX < node.x) {
                        maxX = node.x;
                    }
                });

                const q1Index = groupedNodes.length * 0.25;
                const medianIndex = groupedNodes.length * 0.5;
                const q3Index = groupedNodes.length * 0.75;

                const quartile1 = groupedNodes[q1Index].y;
                const median = groupedNodes[medianIndex].y;
                const quartile3 = groupedNodes[q3Index].y;

                return (
                    <MedianBox
                        height={Math.abs(quartile3 - quartile1)}
                        median={median}
                        theme={theme[group]}
                        width={Math.abs(maxX - minX)}
                        x={minX}
                        y={quartile3}
                    />
                );
            })}
        </>
    );
};

export default SwarmPlotMedianBoxSvgLayer;
