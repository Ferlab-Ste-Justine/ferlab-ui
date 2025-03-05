import React from 'react';
import { Skeleton, Tooltip } from 'antd';
import Title from 'antd/lib/typography/Title';
import cx from 'classnames';

import styles from './index.module.css';

export interface IEntityTitle {
    text?: string;
    textWithTooltip?: boolean;
    icon: React.ReactNode;
    tag?: React.ReactNode;
    extra?: React.ReactNode;
    loading?: boolean;
}

const EntityTitle: React.FC<IEntityTitle> = ({ extra, icon, loading, tag, text, textWithTooltip }) =>
    loading ? (
        <Skeleton loading={loading} paragraph={{ rows: 0 }} />
    ) : (
        <div className={styles.titleHeader}>
            {icon && <span className={styles.icon}>{icon}</span>}
            {text && text.length > 40 && textWithTooltip ? (
                <Tooltip title={text}>
                    <Title className={cx(styles.title, styles.titleTooltip)} level={4}>
                        {text}
                    </Title>
                </Tooltip>
            ) : (
                <Title className={styles.title} level={4}>
                    {text}
                </Title>
            )}
            {tag && <div className={styles.tag}>{tag}</div>}
            {extra && <div className={styles.extra}>{extra}</div>}
        </div>
    );

export default EntityTitle;
