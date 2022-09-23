import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, List, Typography } from 'antd';
import cx from 'classnames';
import React, { ReactNode } from 'react';

import styles from '@ferlab/style/components/list/ListItemWithActions.module.scss';
import ConditionalWrapper from '../utils/ConditionalWrapper';

export type TListItemWithActionsProps = {
    onEdit: () => void;
    onDelete: () => void;
    onClick?: (e: any) => void;
    extra?: ReactNode;
    className?: string;
    title: ReactNode;
    titleClassName?: string;
    description?: ReactNode;
};

const { Text } = Typography;

const ListItemWithActions = ({
    onEdit,
    onDelete,
    onClick,
    className = '',
    titleClassName,
    extra,
    title,
    description,
}: TListItemWithActionsProps) => (
    <List.Item
        className={cx(styles.fuiListItemWithActions, className)}
        actions={[
            <Button
                key="edit"
                type="text"
                size="small"
                icon={<EditFilled />}
                onClick={onEdit}
                className={styles.actionBtn}
            />,
            <Button
                key="delete"
                className={styles.actionBtn}
                type="text"
                size="small"
                icon={<DeleteFilled />}
                onClick={onDelete}
            />,
        ]}
        extra={extra && <div className={styles.extra}>{extra}</div>}
    >
        <List.Item.Meta
            title={
                <ConditionalWrapper
                    condition={!!onClick}
                    wrapper={(children) => (
                        <div onClick={onClick} className={cx(styles.setLink, titleClassName)}>
                            {children}
                        </div>
                    )}
                >
                    <>{title}</>
                </ConditionalWrapper>
            }
            description={description && <Text type="secondary">{description}</Text>}
            className={styles.itemMeta}
        />
    </List.Item>
);

export default ListItemWithActions;
