import React, { CSSProperties, useMemo } from 'react';
import { useTheme } from '@nivo/core';

export type TVector2 = {
    x: number;
    y: number;
};

export type TSelectBox = {
    width: number;
    height: number;
    origin: TVector2;
    transform: TVector2;
};

/**
 * We use our own line since Nivo crosshair are animated
 * @returns
 */
const SelectBox = ({ height, origin, transform, width }: TSelectBox): React.ReactElement => {
    const theme = useTheme();
    const style = useMemo(
        () => ({
            ...theme.crosshair.line,
            pointerEvents: 'none' as CSSProperties['pointerEvents'],
        }),
        [theme.crosshair.line],
    );

    return (
        <>
            {/* origin Vertical */}
            <line fill="none" style={style} x1={0} x2={width} y1={origin.y} y2={origin.y} />
            {/* origin Horizontal */}
            <line fill="none" style={style} x1={origin.x} x2={origin.x} y1={0} y2={height} />
            {/* transform Vertical */}
            <line fill="none" style={style} x1={0} x2={width} y1={transform.y} y2={transform.y} />
            {/* transform Horizontal */}
            <line fill="none" style={style} x1={transform.x} x2={transform.x} y1={0} y2={height} />
        </>
    );
};

export default SelectBox;
