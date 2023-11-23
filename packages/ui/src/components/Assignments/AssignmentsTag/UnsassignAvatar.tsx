import React, { ReactElement } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';

import styles from './index.module.scss';

export type TUnAssignAvatar = {
    canAssign?: boolean;
};

export const UnAssignAvatar = ({ canAssign }: TUnAssignAvatar): ReactElement => (
    <Avatar
        className={canAssign ? styles.unAssignAvatar : `${styles.unAssignAvatar} ${styles.disabledAssignmentsPopOver}`}
        icon={<UserOutlined />}
        size={24}
    />
);
