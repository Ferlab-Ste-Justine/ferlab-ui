import React from 'react';
import { Space, Typography } from 'antd';

import { numberWithCommas } from '../../../utils/numberUtils';

import styles from './index.module.css';

type TSummaryTotalCell = {
    title: string;
    sum: number;
};

const SummarySumCell = ({ sum, title }: TSummaryTotalCell): JSX.Element => (
    <Space direction="vertical" size={0}>
        <Typography.Text className={styles.summaryTitle} type="secondary">
            {title}:
        </Typography.Text>
        <Typography.Text className={styles.summarySum}>{numberWithCommas(sum)}</Typography.Text>
    </Space>
);

export default SummarySumCell;
