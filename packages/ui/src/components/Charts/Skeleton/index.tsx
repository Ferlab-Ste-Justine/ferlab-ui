import React from 'react';
import { Skeleton } from 'antd';

import styles from './index.module.css';

const ChartSkeleton = () => (
    <div className={styles.skeletonGraph}>
        <div className={styles.header}>
            <Skeleton.Input active style={{ width: '150px' }} />
            <div className={styles.controls}>
                <Skeleton.Input active style={{ width: '250px' }} />
            </div>
        </div>
        <div className={styles.skeletonChart}>
            <Skeleton.Input
                active
                style={{ bottom: '16px', display: 'block', height: '100%', position: 'absolute', width: '100%' }}
            />
        </div>
    </div>
);

export default ChartSkeleton;
