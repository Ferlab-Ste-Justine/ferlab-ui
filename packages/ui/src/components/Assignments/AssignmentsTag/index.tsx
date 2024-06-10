import React, { ReactElement } from 'react';
import { Space, Tag, Typography } from 'antd';

import UserAvatar from '../../UserAvatar';
import { IAssignmentsDictionary } from '../types';

import { UnAssignAvatar } from './UnsassignAvatar';

import styles from './index.module.css';

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

const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
};

export const AssignmentsTag = ({
    background = true,
    closable = false,
    dictionary,
    handleClose,
    name,
    organization,
    unAssign = false,
}: TAssignmentsTag): ReactElement => {
    const { Text } = Typography;
    return (
        <Tag
            className={background ? `${styles.assignmentsTag}` : `${styles.assignmentsTag} ${styles.noBackground}`}
            closable={closable && true}
            onClose={handleClose}
            onMouseDown={onPreventMouseDown}
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
                        <UserAvatar className={styles.userAvatar} size={24} userName={name} />
                        <Space className={styles.userInfo} size={4}>
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
