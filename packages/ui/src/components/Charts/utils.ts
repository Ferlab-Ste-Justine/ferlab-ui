import { TRegion } from './type';

export { useTheme } from '@nivo/core';

/**
 * Compute the region range
 * @param region
 * @param x
 * @param y
 */
export const computeDatum = (region: TRegion, x: number, y: number): void => {
    const absX = Math.abs(x);
    const absY = Math.abs(y);
    if (absX > region.range.x) {
        region.range.x = absX;
    }
    if (absY > region.range.y) {
        region.range.y = absY;
    }
};

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
