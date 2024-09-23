import React, { useEffect, useState } from 'react';
import { LineChartOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons/lib/icons';
import {
    ResponsiveScatterPlotCanvas,
    ScatterPlotCanvasProps,
    ScatterPlotDatum,
    ScatterPlotTooltipProps,
} from '@nivo/scatterplot';
import { Button } from 'antd';

export { useTheme } from '@nivo/core';

import { BasicTooltip } from '@nivo/tooltip';

import Empty from '../../../Empty';
import ChartSkeleton from '../../Skeleton';
import { TRegion } from '../../type';
import { TScatterPlotExtraProps } from '../Svg';
import { TNodesList } from '../type';
import { getRegion } from '../utils';

import styles from '../index.module.css';

const ZOOM_STEP = 1.0;
const DEFAULT_ZOOM = 1;
const MAX_ZOOM = 4.0;
const MIN_ZOOM = DEFAULT_ZOOM;
const SCALE_MARGIN = 0.1;

export type TScatterPlotCanvasExtraProps = Omit<TScatterPlotExtraProps, 'markers'>;

export type TScatterPlotCanvasChart = Omit<ScatterPlotCanvasProps<ScatterPlotDatum>, 'width' | 'height' | 'tooltip'> &
    Omit<TScatterPlotCanvasExtraProps, 'onAnimationStarted' | 'onAnimationFinished'> & {
        tooltip?: (value: ScatterPlotTooltipProps<ScatterPlotDatum>) => React.ReactNode;
    };

/**
 * ScatterCanvasPlot with zoom feature
 * No interactive, can be used when you need to display more that 2000 data
 *
 * @link https://nivo.rocks/scatterplot/
 */
const ScatterPlotCanvasChart = ({
    activeLayer = '',
    controls = {
        zoom: {
            max: MAX_ZOOM,
            step: ZOOM_STEP,
        },
    },
    data,
    extraControls = [],
    loading = false,
    margin = { bottom: 64, left: 64, right: 64, top: 64 },
    onBoxSelectNodes,
    title,
    tooltip,
    ...props
}: TScatterPlotCanvasChart): JSX.Element => {
    const [region, setRegion] = useState<TRegion>(getRegion({ data: data, zoom: DEFAULT_ZOOM }));
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

    const reset = () => {
        setZoom(DEFAULT_ZOOM);
        setRegion(getRegion({ data: data, zoom: DEFAULT_ZOOM }));
    };

    // Canvas Layer need to be reset after the first render
    useEffect(() => {
        if (loading) return;
        reset();
    }, [loading]);

    useEffect(() => {
        if (onBoxSelectNodes) {
            onBoxSelectNodes(selectedNodes);
        }
    }, [selectedNodes]);

    useEffect(() => {
        setSelectedNodes([]);
    }, [activeLayer]);

    if (loading) {
        return <ChartSkeleton />;
    }

    if (data.length === 0) {
        return <Empty />;
    }

    return (
        <div className={styles.scatterPlot}>
            <div className={styles.header}>
                {title}
                <div className={styles.controls}>
                    <Button
                        disabled={zoom == controls.zoom.max + DEFAULT_ZOOM}
                        icon={<ZoomInOutlined />}
                        onClick={() => {
                            const newZoom = zoom + controls.zoom.step;
                            if (newZoom > controls.zoom.max + controls.zoom.step) return;

                            const newRegion = getRegion({ data: data, nodes: selectedNodes, zoom: newZoom });
                            setZoom(newZoom);
                            setRegion(newRegion);
                        }}
                        type="text"
                    />
                    <Button
                        disabled={zoom == DEFAULT_ZOOM}
                        icon={<ZoomOutOutlined />}
                        onClick={() => {
                            const newZoom = zoom - controls.zoom.step;
                            if (newZoom < MIN_ZOOM) return;

                            if (newZoom === DEFAULT_ZOOM) {
                                setZoom(DEFAULT_ZOOM);
                                setRegion(getRegion({ data: data, zoom: DEFAULT_ZOOM }));
                                return;
                            }

                            const newRegion = getRegion({ data: data, nodes: selectedNodes, zoom: newZoom });
                            setZoom(newZoom);
                            setRegion(newRegion);
                        }}
                        type="text"
                    />
                    <Button icon={<LineChartOutlined />} onClick={reset} type="text" />
                    {extraControls.map((element) => element)}
                </div>
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.chartWrapper}>
                    <div className={styles.chart}>
                        <ResponsiveScatterPlotCanvas
                            margin={margin}
                            {...props}
                            data={data.map((group) => ({
                                data: group.data.filter(
                                    (node) =>
                                        (node.x as number) > scale.x.min &&
                                        (node.x as number) < scale.x.max &&
                                        (node.y as number) > scale.y.min &&
                                        (node.y as number) < scale.y.max,
                                ),

                                id: group.id,
                            }))}
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
                            tooltip={(value) => (tooltip ? <BasicTooltip id={tooltip(value)} /> : <></>)}
                            xScale={{ max: scale.x.max, min: scale.x.min, type: 'linear' }}
                            yScale={{ max: scale.y.max, min: scale.y.min, type: 'linear' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScatterPlotCanvasChart;
