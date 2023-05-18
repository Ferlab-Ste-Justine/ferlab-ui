import React from 'react';
import { DefaultRawDatum, PieSvgProps, ResponsivePie } from '@nivo/pie';
import { BasicTooltip } from '@nivo/tooltip';
import { Typography } from 'antd';

import styles from './index.module.scss';

export type TPieChart = Omit<PieSvgProps<DefaultRawDatum>, 'width' | 'height'> & {
    title?: string;
    margin?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
};

const { Title } = Typography;

const PieChart = ({
    margin = { bottom: 16, left: 24, right: 24, top: 16 },
    onMouseEnter,
    title,
    ...rest
}: TPieChart): JSX.Element => (
    <div className={styles.pieChartWrapper}>
        <div className={styles.pieChartContent}>
            <ResponsivePie
                enableArcLabels={false}
                enableArcLinkLabels={false}
                margin={margin}
                onMouseEnter={(_: any, e: any) => {
                    if (onMouseEnter) {
                        onMouseEnter(_, e);
                    }
                    e.target.style.cursor = 'pointer';
                }}
                tooltip={(value) => (
                    <BasicTooltip color={value.datum.color} id={value.datum.id.toString()} value={value.datum.value} />
                )}
                {...rest}
            />
            {title && (
                <Title className={styles.title} level={5}>
                    {title}
                </Title>
            )}
        </div>
    </div>
);

export default PieChart;
