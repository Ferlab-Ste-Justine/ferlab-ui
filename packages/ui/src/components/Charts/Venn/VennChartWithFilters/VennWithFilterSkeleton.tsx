import React from 'react';
import { Skeleton } from 'antd';

import styles from './VennWithFilterSkeleton.module.css';

const VennWithFilterSkeleton = (): JSX.Element => (
    <div>
        <div className={styles.skeleton}>
            <div style={{ height: '75px', marginTop: '24px', position: 'relative', width: '100%' }}>
                <Skeleton.Input
                    active
                    style={{
                        bottom: '16px',
                        display: 'block',
                        height: '100%',
                        position: 'absolute',
                        width: '100%',
                    }}
                />
            </div>
            {/* <div className={styles.chart}> */}
            <div style={{ height: '550px', position: 'relative', width: '100%' }}>
                <Skeleton.Input
                    active
                    style={{
                        bottom: '16px',
                        display: 'block',
                        height: '100%',
                        position: 'absolute',
                        width: '100%',
                    }}
                />
            </div>
            {/* </div> */}
        </div>
    </div>
);

export default VennWithFilterSkeleton;
