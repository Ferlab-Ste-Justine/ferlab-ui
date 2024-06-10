import React, { ReactNode } from 'react';
import { DeleteOutlined, EditOutlined, ShareAltOutlined } from '@ant-design/icons';
import { Button, List, Typography } from 'antd';
import cx from 'classnames';

import ConditionalWrapper from '../utils/ConditionalWrapper';

import styles from './ListItemWithActions.module.css';

export type TListItemWithActionsProps = {
    onEdit: () => void;
    onDelete: () => void;
    onClick?: (e: any) => void;
    onShare?: () => void;
    extra?: ReactNode;
    className?: string;
    title: ReactNode;
    titleClassName?: string;
    description?: ReactNode;
};

const { Text } = Typography;

const ListItemWithActions = ({
    className = '',
    description,
    extra,
    onClick,
    onDelete,
    onEdit,
    onShare,
    title,
    titleClassName,
}: TListItemWithActionsProps): JSX.Element => (
    <List.Item
        actions={[
            onShare && (
                <Button
                    className={styles.actionBtn}
                    icon={<ShareAltOutlined />}
                    key="share"
                    onClick={onShare}
                    size="small"
                    type="text"
                />
            ),
            <Button
                className={styles.actionBtn}
                icon={<EditOutlined />}
                key="edit"
                onClick={onEdit}
                size="small"
                type="text"
            />,
            <Button
                className={styles.actionBtn}
                icon={<DeleteOutlined />}
                key="delete"
                onClick={onDelete}
                size="small"
                type="text"
            />,
        ]}
        className={cx(styles.fuiListItemWithActions, className)}
        extra={extra && <div className={styles.extra}>{extra}</div>}
    >
        <List.Item.Meta
            className={styles.itemMeta}
            description={description && <Text type="secondary">{description}</Text>}
            title={
                <ConditionalWrapper
                    condition={!!onClick}
                    wrapper={(children) => (
                        <div className={cx(styles.setLink, titleClassName)} onClick={onClick}>
                            {children}
                        </div>
                    )}
                >
                    <Text ellipsis={{ tooltip: title }}>{title}</Text>
                </ConditionalWrapper>
            }
        />
    </List.Item>
);

export default ListItemWithActions;
