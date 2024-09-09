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

const sort = (a: ComputedDatum<SwarmRawDatum>, b: ComputedDatum<SwarmRawDatum>) => {
    if (a.data.y < b.data.y) {
        return -1;
    } else if (a.data.y > b.data.y) {
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
    if (!active) return <></>;

    return (
        <>
            {groups.map((group) => {
                const groupedNodes = nodes.filter((node) => node.group === group).sort(sort);
                const min = groupedNodes[0];
                const max = groupedNodes[groupedNodes.length - 1];
                return <Limit theme={theme[group]} x={max.x} y1={min.y} y2={max.y} />;
            })}
        </>
    );
};

export default SwarmPlotLimitLineSvgLayer;
