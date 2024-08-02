import React, { useEffect, useState } from 'react';
import {
    ScatterPlot,
    ScatterPlotDatum,
    ScatterPlotNodeData,
    ScatterPlotRawSerie,
    ScatterPlotSvgProps,
} from '@nivo/scatterplot';
import { Button, Space } from 'antd';

import ScatterPlotSelectBoxLayer from './Layers/ScatterPlotSelectBoxLayer';

const ZOOM_STEP = 1.0;
const DEFAULT_ZOOM = 1.0;
const MAX_ZOOM = 4.0;
const MIN_ZOOM = DEFAULT_ZOOM;
const SCALE_MARGIN = 0.1;

/**
 * Region represent a rectangle where data can be drawed
 **/
type TRegion = {
    range: {
        x: number;
        y: number;
    };
    center: {
        x: number;
        y: number;
    };
};

export type TNodesList = ScatterPlotNodeData<ScatterPlotDatum>[];

export type TScatterPlotChart = ScatterPlotSvgProps<ScatterPlotDatum> & {
    margin?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    hasControls?: boolean;
    onBoxSelectNodes?: (nodes: ScatterPlotNodeData<ScatterPlotDatum>[]) => void;
};

/**
 * Compute the region range
 * @param region
 * @param x
 * @param y
 */
const computeDatum = (region: TRegion, x: number, y: number) => {
    const absX = Math.abs(x);
    const absY = Math.abs(y);
    if (absX > region.range.x) {
        region.range.x = absX;
    }
    if (absY > region.range.y) {
        region.range.y = absY;
    }
};

/**
 * Compute region boundaries based on the zoom and displayed data
 * @param data
 * @returns
 */
const getRegion = ({
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

/**
 * ScatterPlot with zoom feature
 * Multiples nodes can be selected through a custom layer ScatterPlotSelectBoxLayer.
 *
 * 1. TODO: FEAT: When zooming with multiples nodes selected, only allow a max zoom only when all nodes can still be visible
 * 2. TODO: FEAT: add translations
 * @returns
 */
const ScatterPlotChart = ({
    hasControls = true,
    margin = { bottom: 64, left: 48, right: 0, top: 0 },
    onBoxSelectNodes,
    ...props
}: TScatterPlotChart): JSX.Element => {
    const [region, setRegion] = useState<TRegion>(getRegion({ data: props.data, zoom: DEFAULT_ZOOM }));
    const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM);
    const [selectedNodes, setSelectedNodes] = useState<TNodesList>([]);
    const [activeSelectMode, setActiveSelectMode] = useState<boolean>(false);
    const scale = {
        x: {
            max: region.center.x + region.range.x + SCALE_MARGIN,
            min: region.center.x - region.range.x - SCALE_MARGIN,
        },
        y: {
            max: region.center.y + region.range.y + SCALE_MARGIN,
            min: region.center.y == 0 ? 0 : region.center.y - region.range.y - SCALE_MARGIN,
        },
    };

    const [animate, setAnimate] = useState<boolean>(false);

    useEffect(() => {
        if (onBoxSelectNodes) {
            onBoxSelectNodes(selectedNodes);
        }
    }, [selectedNodes]);

    return (
        <Space direction="vertical" size={48}>
            {hasControls && (
                <Space>
                    <Button
                        onClick={() => {
                            const newZoom = zoom + ZOOM_STEP;
                            if (newZoom > MAX_ZOOM) return;

                            const newRegion = getRegion({ data: props.data, nodes: selectedNodes, zoom: newZoom });
                            setZoom(newZoom);
                            setRegion(newRegion);
                            setAnimate(true);
                        }}
                    >
                        Zoom In
                    </Button>
                    <Button
                        onClick={() => {
                            const newZoom = zoom - ZOOM_STEP;
                            if (newZoom < MIN_ZOOM) return;

                            if (newZoom === DEFAULT_ZOOM) {
                                setZoom(DEFAULT_ZOOM);
                                setRegion(getRegion({ data: props.data, zoom: DEFAULT_ZOOM }));
                                return;
                            }

                            const newRegion = getRegion({ data: props.data, nodes: selectedNodes, zoom: newZoom });
                            setZoom(newZoom);
                            setRegion(newRegion);
                            setAnimate(true);
                        }}
                    >
                        Zoom Out
                    </Button>
                    <Button
                        onClick={() => {
                            setZoom(DEFAULT_ZOOM);
                            setRegion(getRegion({ data: props.data, zoom: DEFAULT_ZOOM }));
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        onClick={() => {
                            setSelectedNodes([]);
                            setActiveSelectMode(!activeSelectMode);
                        }}
                        type={activeSelectMode ? 'primary' : 'default'}
                    >
                        Select
                    </Button>
                    <span>Zoom level is {zoom * 100} %</span>
                </Space>
            )}

            <ScatterPlot
                {...props}
                annotations={
                    selectedNodes.length == 1
                        ? [
                              {
                                  match: { id: selectedNodes[0].id || '' },
                                  note: selectedNodes[0].id || '',
                                  noteWidth: 0,
                                  noteX: 0,
                                  noteY: 0,
                                  size: props.nodeSize as number,
                                  type: 'dot',
                              },
                          ]
                        : []
                }
                data={props.data}
                layers={[
                    'grid',
                    'axes',
                    'nodes',
                    'markers',
                    'mesh',
                    'legends',
                    'annotations',
                    (layerProps) => (
                        <ScatterPlotSelectBoxLayer
                            {...layerProps}
                            active={activeSelectMode}
                            animate={animate}
                            handleOnSelect={setSelectedNodes}
                            selectedNodes={selectedNodes}
                            setAnimate={setAnimate}
                        />
                    ),
                ]}
                margin={margin}
                markers={[
                    {
                        axis: 'x',
                        lineStyle: { stroke: '#b0b0b0', strokeWidth: 2 },
                        value: 0,
                    },
                ]}
                onClick={(node, event) => {
                    if (selectedNodes.find(({ id }) => id === node.id)) {
                        setSelectedNodes(selectedNodes.filter(({ id }) => id !== node.id));
                    } else {
                        setSelectedNodes([node]);
                    }

                    if (props.onClick) {
                        props.onClick(node, event);
                    }
                }}
                xScale={{ max: scale.x.max, min: scale.x.min, type: 'linear' }}
                yScale={{ max: scale.y.max, min: scale.y.min, type: 'linear' }}
            />
        </Space>
    );
};

export default ScatterPlotChart;
