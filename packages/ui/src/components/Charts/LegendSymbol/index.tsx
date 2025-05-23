import React from 'react';
import { type SymbolProps } from '@nivo/legends';

import { defs } from '../patterns';

interface ILegendSymbol extends SymbolProps {
    data: { id: string }[];
}

const LegendSymbol = ({
    borderColor,
    borderWidth,
    data,
    fill,
    id,
    opacity,
    size,
    x,
    y,
}: ILegendSymbol): React.ReactElement => {
    const index = data.findIndex((d) => d.id === id);
    const def = defs[index % defs.length];

    return (
        <>
            <rect fill={fill} height={size} stroke={borderColor} strokeWidth={borderWidth} width={size} x={x} y={y} />
            <rect
                fill={`url(#${def.id}.bg.${fill})`}
                height={size}
                stroke={borderColor}
                strokeWidth={borderWidth}
                style={{ pointerEvents: 'none' }}
                width={size}
                x={x}
                y={y}
            />
        </>
    );
};

export default LegendSymbol;
