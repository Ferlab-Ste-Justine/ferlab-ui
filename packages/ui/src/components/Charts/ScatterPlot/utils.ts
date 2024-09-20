import { ScatterPlotDatum, ScatterPlotNodeData, ScatterPlotRawSerie } from '@nivo/scatterplot';

import { TRegion } from '../type';
import { computeDatum } from '../utils';

export const getSVGRelativeMousePosition = (
    event: React.MouseEvent<SVGRectElement, MouseEvent>,
): { x: number; y: number } => {
    const rect = event.currentTarget;
    const clientRect = rect.getBoundingClientRect();

    return {
        x: event.clientX - clientRect.left,
        y: event.clientY - clientRect.top,
    };
};

/**
 * Compute region boundaries based on the zoom and displayed data
 * @param data
 * @returns
 */
export const getRegion = ({
    data = [],
    nodes = [],
    zoom,
}: {
    data?: ScatterPlotRawSerie<ScatterPlotDatum>[];
    nodes?: ScatterPlotNodeData<ScatterPlotDatum>[];
    zoom: number;
}): TRegion => {
    const region: TRegion = {
        center: {
            x: 0,
            y: 0,
        },
        range: {
            x: 0,
            y: 0,
        },
    };

    if ((nodes ?? []).length > 0) {
        let averageX = 0;
        let averageY = 0;

        // find center
        // draw region
        nodes.forEach((node) => {
            const x = node.xValue as number;
            const y = node.yValue as number;
            averageX += x;
            averageY += y;
            computeDatum(region, x, y);
        });

        region.center = {
            x: averageX / nodes.length,
            y: averageY / nodes.length,
        };
    } else if (data.length > 0) {
        // Region is based on center point(0, 0)
        data.forEach((datum) => {
            datum.data.forEach((d) => {
                computeDatum(region, d.x as number, d.y as number);
            });
        });
    }

    return {
        ...region,
        range: {
            x: region.range.x / zoom,
            y: region.range.y / zoom,
        },
    };
};
