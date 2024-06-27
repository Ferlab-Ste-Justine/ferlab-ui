import React, { ReactNode } from 'react';
import { Space } from 'antd';

import styles from './index.module.css';

type TEntityTableRedirectLink = {
    to: string;
    onClick?: () => void;
    children: ReactNode;
    icon?: ReactNode;
};

const EntityTableRedirectLink = (props: TEntityTableRedirectLink): JSX.Element => (
    <a className={styles.link} href={props.to} {...props}>
        <Space size={4}>
            <span className={styles.content}>{props.children}</span>
            <span className={styles.icon}>{props.icon}</span>
        </Space>
    </a>
);

export default EntityTableRedirectLink;
