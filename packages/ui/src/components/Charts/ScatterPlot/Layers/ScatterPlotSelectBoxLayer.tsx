import React, { memo, useEffect, useMemo, useState } from 'react';
import { TNodesList } from '@ferlab/ui/components/Charts/ScatterPlot';
import { ScatterPlotDatum, ScatterPlotLayerProps } from '@nivo/scatterplot';
import { animated, useSpring, useTransition } from '@react-spring/web';

import AnimatedCircle from '../../Core/AnimatedCircle';
import SelectBox from '../../Core/SelectBox';

type TVector2 = {
    x: number;
    y: number;
};

export type TSelectBox = {
    width: number;
    height: number;
    origin: TVector2;
    transform: TVector2;
};

export type TScatterPlotSelectBoxLayer = ScatterPlotLayerProps<ScatterPlotDatum> & {
    active?: boolean;
    handleOnSelect: (nodes: TNodesList) => void;
    selectedNodes: TNodesList;
    animate: boolean;
    setAnimate: (value: boolean) => void;
};

const getSVGRelativeMousePosition = (event: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    const rect = event.currentTarget;
    const clientRect = rect.getBoundingClientRect();

    return {
        x: event.clientX - clientRect.left,
        y: event.clientY - clientRect.top,
    };
};

/**
 * ScatterPlot layer
 * Since zooming/data change re-draw the layer, we must keep track of selected nodes in parent
 * @returns
 */
const ScatterPlotSelectBoxLayer = memo(
    ({
        active = false,
        animate,
        handleOnSelect,
        nodes,
        outerHeight,
        outerWidth,
        selectedNodes,
        setAnimate,
    }: TScatterPlotSelectBoxLayer): React.ReactElement => {
        const [activeMouseCapture, setActiveMouseCapture] = useState<boolean>(false);
        const [origin, setOrigin] = useState<TVector2>({ x: 0, y: 0 });
        const [transform, setTransform] = useState<TVector2>({ x: 0, y: 0 });
        const [selectBoxNodes, setSelectBoxNodes] = useState<TNodesList>(selectedNodes);
        const springConfig = useSpring({
            delay: 375,
            from: { opacity: 0 },
            to: { opacity: 1 },
        });

        if (!active) return <></>;

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

        return (
            <animated.g style={animate ? springConfig : {}} transform="translate(0,0)">
                <rect
                    fill="rgba(0, 0, 0, 0)"
                    height={outerHeight}
                    onMouseDown={(event) => {
                        setActiveMouseCapture(true);
                        const position = getSVGRelativeMousePosition(event);
                        setOrigin({ x: position.x, y: position.y });
                        setAnimate(false);
                    }}
                    onMouseMove={(event) => {
                        if (!activeMouseCapture) return;
                        const position = getSVGRelativeMousePosition(event);
                        setTransform({ x: position.x, y: position.y });
                        onSelect(origin, transform);
                    }}
                    onMouseUp={(_) => {
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
                    return <AnimatedCircle {...node} />;
                })}
            </animated.g>
        );
    },
);

export default ScatterPlotSelectBoxLayer;
