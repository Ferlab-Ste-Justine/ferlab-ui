import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import cx from 'classnames';

import styles from './index.module.css';

export interface IPageHeader {
    icon?: React.ReactNode;
    iconClassname?: string;
    onBackButton?: () => void;
    title: React.ReactNode;
    titleClassname?: string;
    subtitle?: React.ReactNode;
    subtitleClassname?: string;
}

const PageHeader = ({
    icon,
    iconClassname = '',
    onBackButton,
    subtitle,
    subtitleClassname = '',
    title,
    titleClassname = '',
}: IPageHeader): React.ReactElement => (
    <div className={styles.pageHeaderWrapper}>
        <div className={styles.backTitleWrapper}>
            {onBackButton && <Button icon={<ArrowLeftOutlined />} onClick={onBackButton} size="small" type="text" />}
            <Space size={8}>
                {icon && <div className={cx(styles.iconWrapper, iconClassname && iconClassname)}>{icon}</div>}
                <Typography.Title className={cx(styles.title, titleClassname && titleClassname)} level={4}>
                    {title}
                </Typography.Title>
            </Space>
        </div>
        {subtitle && (
            <div
                className={cx(styles.subtitle, onBackButton && styles.withBack, subtitleClassname && subtitleClassname)}
            >
                {subtitle}
            </div>
        )}
    </div>
);

export default PageHeader;
