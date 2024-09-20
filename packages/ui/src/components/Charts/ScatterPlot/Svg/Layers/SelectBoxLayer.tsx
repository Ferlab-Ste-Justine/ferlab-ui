import React, { useMemo, useState } from 'react';
import { useTheme } from '@nivo/core';

import SelectBox, { TVector2 } from '../../../Core/SelectBox';
import { IScatterPlotSelectBoxCanvasLayer } from '../../type';
import { TNodesList } from '../../type';
import { getSVGRelativeMousePosition } from '../../utils';

/**
 * ScatterPlot layer
 * Since zooming/data change re-draw the layer, we must keep track of selected nodes in parent
 */
const SelectBoxLayer = ({
    active = false,
    handleOnSelect,
    innerHeight,
    innerWidth,
    nodes,
    outerHeight,
    outerWidth,
    selectedNodes,
}: IScatterPlotSelectBoxCanvasLayer): React.ReactElement => {
    const [activeMouseCapture, setActiveMouseCapture] = useState<boolean>(false);
    const [origin, setOrigin] = useState<TVector2>({ x: 0, y: 0 });
    const [transform, setTransform] = useState<TVector2>({ x: 0, y: 0 });
    const [selectBoxNodes, setSelectBoxNodes] = useState<TNodesList>(selectedNodes);
    const theme = useTheme();
    const style = useMemo(
        () => ({
            ...theme.annotations.symbol,
        }),
        [theme.annotations.symbol],
    );

    /**
     * Top-left corner of the rect svg is Vector(0,0) while Bottom-Right is (width, height)
     * Only check selection from left to right or right to left
     */
    const onSelect = useMemo(
        () => (origin: TVector2, transform: TVector2) => {
            // select from left to right
            let isInsideSelectBox = (origin: TVector2, transform: TVector2, point: TVector2): boolean =>
                point.x > origin.x && point.x < transform.x && point.y > origin.y && point.y < transform.y;

            // select from right to left
            if (origin.x > transform.x) {
                isInsideSelectBox = (origin: TVector2, transform: TVector2, point: TVector2): boolean =>
                    point.x < origin.x && point.x > transform.x && point.y > origin.y && point.y < transform.y;
            }

            const newSelectedNodes = nodes.filter((node) =>
                isInsideSelectBox(origin, transform, { x: node.x, y: node.y }),
            );

            // highlight node
            setSelectBoxNodes(newSelectedNodes);
        },
        [origin, transform],
    );

    if (!active) return <></>;

    return (
        <g transform="translate(0,0)">
            <rect
                fill="rgba(0, 0, 0, 0)"
                height={outerHeight}
                onMouseDown={(event) => {
                    setActiveMouseCapture(true);
                    const position = getSVGRelativeMousePosition(event);
                    setOrigin({ x: position.x, y: position.y });
                }}
                onMouseMove={(event) => {
                    if (!activeMouseCapture) return;
                    const position = getSVGRelativeMousePosition(event);
                    setTransform({ x: position.x, y: position.y });
                    onSelect(origin, transform);
                }}
                onMouseUp={() => {
                    setActiveMouseCapture(false);
                    handleOnSelect(selectBoxNodes);
                }}
                width={outerWidth}
            />
            {activeMouseCapture && (
                <SelectBox height={innerHeight} origin={origin} transform={transform} width={innerWidth} />
            )}
            {nodes.map((node) => {
                if (!selectBoxNodes.map((n) => n.id).includes(node.id)) return;
                return <circle cx={node.x} cy={node.y} fill={style.fill} r={node.size / 2} style={style} />;
            })}
        </g>
    );
};

export default SelectBoxLayer;
