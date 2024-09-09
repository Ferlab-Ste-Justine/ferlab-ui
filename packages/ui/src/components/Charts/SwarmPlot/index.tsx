import React, { useEffect, useMemo, useState } from 'react';
import { LineChartOutlined, ZoomInOutlined, ZoomOutOutlined } from '@ant-design/icons';
import { ComputedDatum, ResponsiveSwarmPlot, SwarmPlotSvgProps } from '@nivo/swarmplot';
import { BasicTooltip } from '@nivo/tooltip';
import { Button } from 'antd';

import Empty from '../../Empty';
import ChartSkeleton from '../Skeleton';

import { SwarmRawDatum } from './type';
import { getRange } from './utils';

import styles from './index.module.css';

/**
 * Compute zoom between 100% to 200%
 */
const ZOOM_STEP = 1.0;
const DEFAULT_ZOOM = 1.0;
const MAX_ZOOM = 2.0;
const MIN_ZOOM = DEFAULT_ZOOM;
const RANGE_MARGIN = 2;

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
    controls: {
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
    const range = useMemo(() => {
        if (loading || data.length === 0) {
            return {};
        }
        return getRange({ data: [...data], margin: RANGE_MARGIN, zoom });
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
                        icon={<ZoomInOutlined />}
                        onClick={() => {
                            const newZoom = zoom + controls.zoom.step;
                            if (newZoom > controls.zoom.max) return;
                            setZoom(newZoom);
                        }}
                        type="text"
                    />
                    <Button
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
                            data={data}
                            groups={groups}
                            margin={margin}
                            tooltip={(value) => (tooltip ? <BasicTooltip id={tooltip(value)} /> : <></>)}
                            valueScale={{ ...range, type: 'linear' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SwarmPlot;
