import React from 'react';
import { Skeleton } from 'antd';
import Title from 'antd/lib/typography/Title';

import styles from '@ferlab/style/pages/EntityPage/EntityTitle.module.scss';

export interface IEntityTitle {
    text?: string;
    icon: React.ReactNode;
    tag?: React.ReactNode;
    extra?: React.ReactNode;
    loading?: boolean;
}

const EntityTitle: React.FC<IEntityTitle> = ({ extra, icon, loading, tag, text }) =>
    loading ? (
        <Skeleton loading={loading} paragraph={{ rows: 0 }} />
    ) : (
        <div className={styles.titleHeader}>
            {icon && <span className={styles.icon}>{icon}</span>}
            {text && (
                <Title className={styles.title} level={4}>
                    {text}
                </Title>
            )}
            {tag && <div className={styles.tag}>{tag}</div>}
            {extra && <div className={styles.extra}>{extra}</div>}
        </div>
    );

export default EntityTitle;
