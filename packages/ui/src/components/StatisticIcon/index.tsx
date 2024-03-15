import React, { ReactElement } from 'react';

import { TABLE_EMPTY_PLACE_HOLDER } from '../../common/constants';
import { numberFormat } from '../../utils/numberUtils';

import styles from './index.module.scss';

export type TStatisticIcon = {
    count?: number;
    icon: React.ReactNode;
    label: string;
};

export const StatisticIcon = ({ count, icon, label }: TStatisticIcon): ReactElement => (
    <div className={styles.statisticWrapper}>
        {icon}
        <div>
            <div className={styles.count}>{count ? numberFormat(count) : TABLE_EMPTY_PLACE_HOLDER}</div>
            <span className={styles.label}>{label}</span>
        </div>
    </div>
);

export default StatisticIcon;
