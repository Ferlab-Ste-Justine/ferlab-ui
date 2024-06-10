import React from 'react';
import { DefaultRawDatum, PieSvgProps, ResponsivePie } from '@nivo/pie';
import { BasicTooltip } from '@nivo/tooltip';
import { Typography } from 'antd';

import { numberFormat } from '../../../utils/numberUtils';
import { defs } from '../patterns';

import styles from './index.module.css';

export type TPieChart = Omit<PieSvgProps<DefaultRawDatum>, 'width' | 'height'> & {
    title?: string;
    height?: number;
    width?: number;
    margin?: {
        top: number;
        bottom: number;
        left: number;
        right: number;
    };
    wrapperClassname?: string;
};

const { Title } = Typography;

const PieChart = ({
    margin = { bottom: 16, left: 24, right: 24, top: 16 },
    onMouseEnter,
    title,
    valueFormat = (value) => `${numberFormat(value ?? 0)}`,
    wrapperClassname = '',
    ...rest
}: TPieChart): JSX.Element => {
    const fill = rest.data?.map((d, index) => ({
        id: defs[index % defs.length].id,
        match: {
            id: d.id,
        },
    }));
    return (
        <div className={`${styles.pieChartWrapper} ${wrapperClassname}`}>
            <div className={styles.pieChartContent}>
                <ResponsivePie
                    aria-label={title}
                    defs={defs}
                    enableArcLabels={false}
                    enableArcLinkLabels={false}
                    fill={fill}
                    margin={margin}
                    onMouseEnter={(_: any, e: any) => {
                        if (onMouseEnter) {
                            onMouseEnter(_, e);
                        }
                        e.target.style.cursor = 'pointer';
                    }}
                    tooltip={(value) => (
                        <BasicTooltip
                            color={value.datum.color}
                            id={value.datum.id.toString()}
                            value={numberFormat(value.datum.value)}
                        />
                    )}
                    valueFormat={valueFormat}
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
};

export default PieChart;
