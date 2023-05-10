import React from 'react';
import { Space, Tag, Typography } from 'antd';

import Gravatar from '../../Gravatar';

import styles from './index.module.scss';

export type TAssignmentsTag = {
    email: string;
    name: string;
    organization: string;
    background?: boolean;
    disable?: boolean;
    closable?: boolean;
    handleClose?: () => void;
};

export const AssignmentsTag = ({
    background = true,
    closable = false,
    disable = false,
    email,
    handleClose,
    name,
    organization,
}: TAssignmentsTag) => {
    const { Text } = Typography;
    return (
        <Tag
            className={background ? `${styles.assignmentsTag}` : `${styles.assignmentsTag} ${styles.noBackground}`}
            closable={closable && true}
            onClose={handleClose}
        >
            <Space size={8}>
                <Gravatar circle email={email} size={24} />
                <Space size={4}>
                    <Text strong>{name}</Text>
                    <Text type="secondary">{organization}</Text>
                </Space>
            </Space>
        </Tag>
    );
};

export default AssignmentsTag;
