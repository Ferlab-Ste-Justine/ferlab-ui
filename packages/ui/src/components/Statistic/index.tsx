import React, { ReactElement } from 'react';

import { TABLE_EMPTY_PLACE_HOLDER } from '../../common/constants';
import { numberFormat } from '../../utils/numberUtils';

import styles from './index.module.scss';

export type TStatistic = {
    count?: number;
    icon: React.ReactNode;
    label: string;
};

export const Statistic = ({ count, icon, label }: TStatistic): ReactElement => (
    <div className={styles.statisticWrapper}>
        {icon}
        <div>
            <div className={styles.count}>{count ? numberFormat(count) : TABLE_EMPTY_PLACE_HOLDER}</div>
            <span className={styles.label}>{label}</span>
        </div>
    </div>
);

export default Statistic;
