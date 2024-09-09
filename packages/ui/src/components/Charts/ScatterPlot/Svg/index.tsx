import React, { useEffect, useState } from 'react';
import { LineChartOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons/lib/icons';
import { ResponsiveScatterPlot, ScatterPlotDatum, ScatterPlotNodeData, ScatterPlotSvgProps } from '@nivo/scatterplot';
import { Button } from 'antd';

export { useTheme } from '@nivo/core';

import Empty from '../../../Empty';
import ScatterPlotSkeleton from '../Skeleton';
import { TNodesList, TRegion } from '../type';
import { getRegion } from '../utils';

import styles from '../index.module.css';

const ZOOM_STEP = 1.0;
const DEFAULT_ZOOM = 1.0;
const MAX_ZOOM = 4.0;
const MIN_ZOOM = DEFAULT_ZOOM;
const SCALE_MARGIN = 0.1;

export type TScatterPlotExtraProps = {
    width?: number;
    height?: number;
    margin?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    loading?: boolean;
    onBoxSelectNodes?: (nodes: ScatterPlotNodeData<ScatterPlotDatum>[]) => void;
    onAnimationStarted?: () => void;
    onAnimationFinished?: () => void;
    controls: {
        zoom: {
            step: number;
            max: number;
        };
    };
    title?: React.ReactElement;
    extraControls?: JSX.Element[];
    activeLayer?: string;
};

export type TScatterPlotChart = Omit<ScatterPlotSvgProps<ScatterPlotDatum>, 'width' | 'height'> &
    TScatterPlotExtraProps;

/**
 * ScatterPlot with zoom feature
 * Multiples nodes can be selected through a custom layer ScatterPlotSelectBoxLayer.
 * Performance threshold is 2000 items
 *
 * 1. TODO: FEAT: When zooming with multiples nodes selected, only allow a max zoom only when all nodes can still be visible
 * 2. TODO: FEAT: add translations
 * @returns
 */
const ScatterPlotChart = ({
    activeLayer = '',
    controls = {
        zoom: {
            max: MAX_ZOOM,
            step: ZOOM_STEP,
        },
    },
    extraControls = [],
    loading = false,
    margin = { bottom: 64, left: 48, right: 0, top: 0 },
    onAnimationStarted,
    onBoxSelectNodes,
    title,
    ...props
}: TScatterPlotChart): JSX.Element => {
    const [region, setRegion] = useState<TRegion>(getRegion({ data: props.data, zoom: DEFAULT_ZOOM }));
    const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM);
    const [selectedNodes, setSelectedNodes] = useState<TNodesList>([]);
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

    useEffect(() => {
        if (onBoxSelectNodes) {
            onBoxSelectNodes(selectedNodes);
        }
    }, [selectedNodes]);

    useEffect(() => {
        setSelectedNodes([]);
    }, [activeLayer]);

    if (loading) {
        return <ScatterPlotSkeleton />;
    }

    if (props.data.length === 0) {
        return <Empty />;
    }

    return (
        <div className={styles.scatterPlot}>
            <div className={styles.header}>
                {title}
                <div className={styles.controls}>
                    <Button
                        icon={<ZoomInOutlined />}
                        onClick={() => {
                            const newZoom = zoom + controls.zoom.step;
                            if (newZoom > controls.zoom.max) return;

                            const newRegion = getRegion({ data: props.data, nodes: selectedNodes, zoom: newZoom });
                            setZoom(newZoom);
                            setRegion(newRegion);

                            if (onAnimationStarted) {
                                onAnimationStarted();
                            }
                        }}
                    />
                    <Button
                        icon={<ZoomOutOutlined />}
                        onClick={() => {
                            const newZoom = zoom - controls.zoom.step;
                            if (newZoom < MIN_ZOOM) return;

                            if (newZoom === DEFAULT_ZOOM) {
                                setZoom(DEFAULT_ZOOM);
                                setRegion(getRegion({ data: props.data, zoom: DEFAULT_ZOOM }));
                                return;
                            }

                            const newRegion = getRegion({ data: props.data, nodes: selectedNodes, zoom: newZoom });
                            setZoom(newZoom);
                            setRegion(newRegion);

                            if (onAnimationStarted) {
                                onAnimationStarted();
                            }
                        }}
                    />
                    <Button
                        icon={<LineChartOutlined />}
                        onClick={() => {
                            setZoom(DEFAULT_ZOOM);
                            setRegion(getRegion({ data: props.data, zoom: DEFAULT_ZOOM }));
                        }}
                    />
                    {extraControls.map((element) => element)}
                </div>
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.chartWrapper}>
                    <div className={styles.chart}>
                        <ResponsiveScatterPlot
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScatterPlotChart;
