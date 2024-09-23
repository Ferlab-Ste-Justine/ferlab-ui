import React from 'react';

import { ComputedDatum, SwarmRawDatum } from '../type';

type TTheme = {
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

const Limit = ({ theme, x, y1, y2 }: { theme: TTheme; x: number; y1: number; y2: number }) => (
    <>
        <line className={theme.line} x1={x} x2={x} y1={y1} y2={y2} />
        <line className={theme.line} x1={x - OUTER_LINE_SIZE} x2={x + OUTER_LINE_SIZE} y1={y2} y2={y2} />
        <line className={theme.line} x1={x - OUTER_LINE_SIZE} x2={x + OUTER_LINE_SIZE} y1={y1} y2={y1} />
    </>
);

/**
 * LimitLine
 * Display a box plot of the FPKM depending on the samples for the selected gene the
 * - upper and lower limits,
 */
const SwarmPlotLimitLineSvgLayer = ({ active, groups, nodes, theme }: TSwarmPlotMedianSvgLayer): React.ReactElement => {
    if (!active || nodes.length === 0) return <></>;

    return (
        <>
            {groups.map((group) => {
                const groupedNodesY = nodes.filter((node) => node.group === group).sort(sortY);
                const groupedNodesX = nodes.filter((node) => node.group === group).sort(sortX);

                if (groupedNodesY.length === 0) {
                    return <></>;
                }

                // SVG are computed from top to bottom
                const minYNode = groupedNodesY[groupedNodesY.length - 1];
                const maxYNode = groupedNodesY[0];
                const minXNode = groupedNodesX[0];
                const maxXNode = groupedNodesX[groupedNodesX.length - 1];

                const marginY = minYNode.size / 2;

                const minY = minYNode.y + marginY;
                const maxY = maxYNode.y - marginY;
                const minX = minXNode.x;
                const maxX = maxXNode.x;
                const medianX = minX + (maxX - minX) / 2;

                return <Limit theme={theme[group]} x={medianX} y1={minY} y2={maxY} />;
            })}
        </>
    );
};

export default SwarmPlotLimitLineSvgLayer;
