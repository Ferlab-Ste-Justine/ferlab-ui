import { ComputedDatum } from '@nivo/swarmplot/dist/types/types';

import { RawDatum, TRange } from '../type';

/**
 * Compute region boundaries based on the zoom and displayed data
 * @param data
 * @returns
 */
export const getRange = ({
    data = [],
    margin,
    selectedNode,
    zoom,
}: {
    data?: RawDatum[];
    selectedNode?: ComputedDatum<RawDatum>;
    zoom: number;
    margin: number;
}): TRange => {
    data.sort((a, b) => {
        if (a.y < b.y) {
            return -1;
        } else if (a.y > b.y) {
            return 1;
        }
        return 0;
    });
    const max = data[data.length - 1].y;
    const min = data[0].y;
    if (1 - zoom === 0) {
        return {
            max: max + margin,
            min: min - margin,
        };
    }

    const range = max - min;
    const midRange = range / 2;
    const midPoint = selectedNode ? selectedNode.data.y : min + midRange;
    const zoomFactor = midRange / zoom;
    const newMax = midPoint + zoomFactor;
    const newMin = midPoint - zoomFactor;
    return { max: newMax + margin, min: newMin - margin };
};
