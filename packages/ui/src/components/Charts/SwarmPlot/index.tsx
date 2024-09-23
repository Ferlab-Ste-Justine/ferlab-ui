import React, { useEffect, useMemo, useState } from 'react';
import { LineChartOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { TRange } from '@ferlab/ui/components/Charts/type';
import { ComputedDatum, ResponsiveSwarmPlot, SwarmPlotSvgProps } from '@nivo/swarmplot';
import { BasicTooltip } from '@nivo/tooltip';
import { Button } from 'antd';

import Empty from '../../Empty';
import ChartSkeleton from '../Skeleton';

import { SwarmRawDatum } from './type';
import { getRange, getZoomInEnabled } from './utils';

import styles from './index.module.css';

/**
 * Compute zoom between 100% to 200%
 */
const ZOOM_STEP = 0.1;
const DEFAULT_ZOOM = 1;
const MAX_ZOOM = 2;
const MIN_ZOOM = DEFAULT_ZOOM;

export type TSwarmPlotExtraProps = {
    data?: SwarmRawDatum[];
    groups?: string[];
    width?: number;
    height?: number;
    margin?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    loading?: boolean;
    controls?: {
        zoom: {
            step: number;
            max: number;
        };
    };
    title?: React.ReactElement;
    extraControls?: JSX.Element[];
};

export type TSwarmPlotChart = Partial<
    Omit<SwarmPlotSvgProps<SwarmRawDatum>, 'data' | 'groups' | 'width' | 'height' | 'tooltip'>
> &
    TSwarmPlotExtraProps & {
        tooltip?: (value: ComputedDatum<SwarmRawDatum>) => JSX.Element;
    };

/**
 * @link https://nivo.rocks/swarmplot/
 */
const SwarmPlot = ({
    controls = {
        zoom: {
            max: MAX_ZOOM,
            step: ZOOM_STEP,
        },
    },
    data = [],
    extraControls = [],
    groups = [],
    loading,
    margin = { bottom: 64, left: 48, right: 0, top: 24 },
    title,
    tooltip,
    ...props
}: TSwarmPlotChart): JSX.Element => {
    const [zoom, setZoom] = useState<number>(DEFAULT_ZOOM);
    const range: TRange = useMemo(() => {
        if (loading || data.length === 0) {
            return {
                max: 1,
                min: 0,
            };
        }
        return getRange({ data: [...data], step: controls.zoom.step, zoom });
    }, [loading, data, zoom]);
    const zoomInEnabled: boolean = useMemo(() => {
        if (loading || data.length === 0) {
            return false;
        }

        return getZoomInEnabled({ data: [...data], step: controls.zoom.step, zoom: zoom + controls.zoom.step });
    }, [loading, data, zoom]);

    useEffect(() => {
        if (loading) {
            setZoom(DEFAULT_ZOOM);
        }
    }, [loading]);

    if (loading) return <ChartSkeleton />;
    if (data.length === 0) return <Empty />;

    return (
        <div className={styles.swarmPlot}>
            <div className={styles.header}>
                {title}
                <div className={styles.controls}>
                    <Button
                        disabled={!zoomInEnabled}
                        icon={<ZoomInOutlined />}
                        onClick={() => {
                            const newZoom = zoom + controls.zoom.step;
                            if (newZoom > controls.zoom.max) return;
                            setZoom(newZoom);
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
                                return;
                            }
                            setZoom(newZoom);
                        }}
                        type="text"
                    />
                    <Button
                        icon={<LineChartOutlined />}
                        onClick={() => {
                            setZoom(DEFAULT_ZOOM);
                        }}
                        type="text"
                    />
                    {extraControls.map((element) => element)}
                </div>
            </div>
            <div className={styles.chartContainer}>
                <div className={styles.chartWrapper}>
                    <div className={styles.chart}>
                        <ResponsiveSwarmPlot
                            {...props}
                            // data={data}
                            data={data.filter((node) => node.y >= range.min && node.y <= range.max)}
                            groups={groups}
                            margin={margin}
                            tooltip={(value) => (tooltip ? <BasicTooltip id={tooltip(value)} /> : <></>)}
                            valueScale={{
                                clamp: true,
                                max: range.valueScale?.max ? range.valueScale.max : 'auto',
                                min: range.valueScale?.min ? range.valueScale.min : 'auto',
                                type: 'linear',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwarmPlot;
