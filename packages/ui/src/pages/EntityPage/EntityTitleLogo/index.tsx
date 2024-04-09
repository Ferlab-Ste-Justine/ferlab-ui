import React from 'react';
import { Skeleton } from 'antd';
import Title from 'antd/lib/typography/Title';

import styles from './index.module.scss';

export interface IEntityTitleLogo {
    title?: string;
    logo: React.ReactNode;
    extra?: React.ReactNode;
    loading?: boolean;
}

const EntityTitleLogo: React.FC<IEntityTitleLogo> = ({ extra, loading, logo, title }) =>
    loading ? (
        <Skeleton loading={loading} paragraph={{ rows: 0 }} />
    ) : (
        <div className={styles.titleHeader}>
            {
                <div className={styles.titleLogoWrapper}>
                    {logo && (
                        <div className={styles.logoContainer}>
                            <span className={styles.logo}>{logo}</span>
                        </div>
                    )}
                    {title && (
                        <div className={styles.titleWrapper}>
                            <Title className={styles.title} level={5}>
                                {title}
                            </Title>
                        </div>
                    )}
                </div>
            }
            {extra && <div className={styles.extra}>{extra}</div>}
        </div>
    );

export default EntityTitleLogo;