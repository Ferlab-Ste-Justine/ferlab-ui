import React from 'react';
import { Space, Typography } from 'antd';

import MaintenanceIcon from './MaintenanceIcon';

import styles from './index.module.css';

export type TMaintenancePage = {
    title: string;
    subtitle: string;
};

const MaintenancePage = ({ subtitle, title }: TMaintenancePage): JSX.Element => (
    <div className={styles.wrapper}>
        <Space align="center" direction="vertical" size={24}>
            <MaintenanceIcon />
            <Space align="center" direction="vertical" size={8}>
                <Typography.Title className={styles.title}>{title}</Typography.Title>
                <Typography.Text className={styles.subtitle}>{subtitle}</Typography.Text>
            </Space>
        </Space>
    </div>
);

export default MaintenancePage;
