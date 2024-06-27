import React, { ReactElement } from 'react';
import cx from 'classnames';

import { TABLE_EMPTY_PLACE_HOLDER } from '../../common/constants';
import { numberFormat } from '../../utils/numberUtils';

import styles from './index.module.css';

export type TStatisticIcon = {
    count?: number;
    icon: React.ReactNode;
    label: string;
    disabled?: boolean;
};

export const StatisticIcon = ({ count, disabled, icon, label }: TStatisticIcon): ReactElement => (
    <div className={cx(styles.statisticWrapper, { [styles.disabled]: disabled })}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.stats}>
            <div className={styles.count}>{count ? numberFormat(count) : TABLE_EMPTY_PLACE_HOLDER}</div>
            <span className={styles.label}>{label}</span>
        </div>
    </div>
);

export default StatisticIcon;
