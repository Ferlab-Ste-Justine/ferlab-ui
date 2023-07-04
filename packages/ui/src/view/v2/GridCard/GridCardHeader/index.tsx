import { ReactNode } from 'react';
import React from 'react';
import { HolderOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Popover, PopoverProps, Space, Typography } from 'antd';
import cx from 'classnames';

import DragHandle from '../../../../layout/SortableGrid/DragHandle';

import styles from './GridCardHeader.module.scss';

interface OwnProps {
    id: string;
    title: string;
    infoPopover?: PopoverProps;
    extraClassName?: string;
    extra?: ReactNode[];
    withHandle?: boolean;
}

const { Title } = Typography;

const GridCardHeader = ({ id, title, extraClassName = '', extra = [], withHandle = false, infoPopover }: OwnProps) => (
    <Title className={styles.cardHeader} level={4}>
        <Space align="center" className={styles.title} direction="horizontal" size={5}>
            {withHandle && (
                <DragHandle className={styles.dragHandle} id={id}>
                    <HolderOutlined />
                </DragHandle>
            )}
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
        <div className={extraClassName}>{extra}</div>
    </Title>
);

export default GridCardHeader;
