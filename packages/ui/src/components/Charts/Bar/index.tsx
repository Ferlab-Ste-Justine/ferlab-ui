import React from 'react';
import { BarDatum, BarSvgProps, ResponsiveBar } from '@nivo/bar';
import { Typography } from 'antd';

import { numberFormat } from '../../../utils/numberUtils';
import { defs } from '../patterns';

import styles from './index.module.scss';

type TBarChart = Omit<BarSvgProps<BarDatum>, 'width' | 'height'> & {
    title?: string;
};

const { Title } = Typography;

const BarChart = ({
    colorBy = 'indexValue',
    enableLabel = true,
    margin = { bottom: 12, left: 24, right: 24, top: 12 },
    onMouseEnter,
    title,
    ariaLabel = title,
    barAriaLabel = (e) => `${e.indexValue}, ${e.formattedValue}`,
    valueFormat = (value) => `${numberFormat(value ?? 0)}`,
    ...rest
}: TBarChart): JSX.Element => {
    const fill = rest.data?.map((d, index) => ({
        id: defs[index % defs.length].id,
        match: {
            indexValue: d.id,
        },
    }));

    return (
        <div className={styles.barChartWrapper}>
            <div className={styles.barChartContent}>
                {title && (
                    <Title className={styles.title} level={5}>
                        {title}
                    </Title>
                )}
                <ResponsiveBar
                    ariaLabel={ariaLabel}
                    barAriaLabel={barAriaLabel}
                    colorBy={colorBy}
                    defs={defs}
                    enableLabel={enableLabel}
                    fill={fill}
                    isFocusable
                    margin={margin}
                    onMouseEnter={(_: any, e: any) => {
                        if (onMouseEnter) {
                            onMouseEnter(_, e);
                        }
                        e.target.style.cursor = 'pointer';
                    }}
                    role="application"
                    valueFormat={valueFormat}
                    {...rest}
                />
            </div>
        </div>
    );
};

export default BarChart;
