import { SwarmRawDatum } from '@ferlab/ui/components/Charts/SwarmPlot/type';

import { TRange } from '../type';

export const getZoomInEnabled = ({
    data = [],
    step,
    zoom,
}: {
    data?: SwarmRawDatum[];
    zoom: number;
    step: number;
}): boolean => {
    const range = getRange({ data, step, zoom });
    const predicate = data.filter((node) => node.y >= range.min && node.y <= range.max);
    return predicate.length > 3;
};

/**
 * Range should remove a % of data to allow a zoom
 * @param data
 * @returns
 */
export const getRange = ({ data = [], step, zoom }: { data?: SwarmRawDatum[]; zoom: number; step: number }): TRange => {
    data.sort((a, b) => a.y - b.y);
    let max = data[data.length - 1].y;
    let min = data[0].y;
    let margin = max - min;

    if (zoom === 1) {
        return {
            max,
            min,
            valueScale: {
                max: max + margin / 4,
                min: min - margin / 4,
            },
        };
    }

    const zoomFactor = Math.floor(Math.abs(1 - zoom) * 100) / 100;
    const range = data.length * zoomFactor;

    const minIndex = Math.floor(range);
    const maxIndex = Math.floor(data.length - range);

    max = data[maxIndex].y;
    min = data[minIndex].y;

    margin = (max - min) * step;

    return {
        max,
        min,
        valueScale: {
            max: max + margin,
            min: min - margin,
        },
    };
};
