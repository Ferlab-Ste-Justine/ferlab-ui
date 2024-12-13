import React from 'react';
import { Skeleton } from 'antd';

import styles from './VennSkeleton.module.css';

type TVennSkeleton = {
    height: number;
    width: number;
};

const VennSekeleton = ({ height, width }: TVennSkeleton): JSX.Element => (
    <div>
        <div className={styles.skeleton}>
            <div style={{ height, position: 'relative', width }}>
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
            <div className={styles.tables}>
                <div style={{ height: height / 2 - 8, position: 'relative', width }}>
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
                <div style={{ height: height / 2 - 8, position: 'relative', width }}>
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
            </div>
        </div>
        <div className={styles.footer}>
            <Skeleton.Input active />
        </div>
    </div>
);

export default VennSekeleton;
