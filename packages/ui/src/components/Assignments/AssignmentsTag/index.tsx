import React from 'react';
import { Space, Tag, Typography } from 'antd';

import UserAvatar from '../../UserAvatar';
import { IAssignmentsDictionary } from '../types';

import { UnAssignAvatar } from './UnsassignAvatar';

import styles from './index.module.scss';

export type TAssignmentsTag = {
    email?: string;
    name?: string;
    organization?: string;
    background?: boolean;
    closable?: boolean;
    handleClose?: () => void;
    unAssign?: boolean;
    dictionary?: IAssignmentsDictionary | Record<string, never>;
};

export const AssignmentsTag = ({
    background = true,
    closable = false,
    dictionary,
    email,
    handleClose,
    name,
    organization,
    unAssign = false,
}: TAssignmentsTag) => {
    const { Text } = Typography;
    return (
        <Tag
            className={background ? `${styles.assignmentsTag}` : `${styles.assignmentsTag} ${styles.noBackground}`}
            closable={closable && true}
            onClose={handleClose}
        >
            <Space size={8}>
                {unAssign ? (
                    <>
                        <UnAssignAvatar />
                        <Space size={4}>
                            <Text strong>{dictionary?.select?.textInfo?.notAssigned || 'Not assigned'}</Text>
                        </Space>
                    </>
                ) : (
                    <>
                        <UserAvatar size={24} userName={name} />
                        <Space size={4}>
                            <Text strong>{name}</Text>
                            <Text type="secondary">{organization}</Text>
                        </Space>
                    </>
                )}
            </Space>
        </Tag>
    );
};

export default AssignmentsTag;
