import React, { ReactElement, ReactNode } from 'react';
import { HolderOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Popover, PopoverProps, Space, Typography } from 'antd';
import cx from 'classnames';

import DragHandle from '../../layout/SortableGrid/DragHandle';

import styles from '@ferlab/style/components/CardHeader/CardHeader.module.scss';

// TODO: Move this comoponent in ferlab with GridCard V2

interface OwnProps {
    id: string;
    title: string;
    infoPopover?: PopoverProps;
    extra?: ReactNode[];
    withHandle?: boolean;
}

const { Title } = Typography;

const CardHeader = ({ id, title, extra = [], withHandle = false, infoPopover }: OwnProps): ReactElement => (
    <Title className={styles.cardHeader} level={4}>
        <Space className={styles.title} direction="horizontal" size={5}>
            {withHandle && (
                <DragHandle className={styles.dragHandle} id={id}>
                    <HolderOutlined />
                </DragHandle>
            )}{' '}
            {title}
            {infoPopover && (
                <Popover
                    {...infoPopover}
                    className={cx(styles.infoPopover, infoPopover.className)}
                    overlayClassName={cx(styles.infoPopoverOverlay, infoPopover.overlayClassName)}
                >
                    <InfoCircleOutlined className={styles.infoIcon} />
                </Popover>
            )}
        </Space>
        <div className={styles.extra}>{extra}</div>
    </Title>
);

export default CardHeader;
