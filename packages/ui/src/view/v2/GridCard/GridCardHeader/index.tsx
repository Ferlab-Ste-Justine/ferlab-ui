import { MutableRefObject, ReactNode, useLayoutEffect, useRef, useState } from 'react';
import React from 'react';
import { HolderOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Popover, PopoverProps, Space, Tooltip, Typography } from 'antd';
import classnames from 'classnames';
import cx from 'classnames';

import DragHandle from '../../../../layout/SortableGrid/DragHandle';

import styles from './GridCardHeader.module.scss';

interface IInfoPopover extends PopoverProps {
    iconClassName?: string;
}

interface OwnProps {
    id: string;
    title: string;
    infoPopover?: IInfoPopover;
    className?: string;
    handleClassName?: string;
    extraClassName?: string;
    extra?: ReactNode[];
    titleTruncateThresholdWidth?: number;
    isDraggable?: boolean;
}

const { Title } = Typography;

const GridCardHeader = ({
    className,
    extra = [],
    extraClassName = '',
    handleClassName,
    id,
    infoPopover,
    title,
    titleTruncateThresholdWidth,
    isDraggable = false,
}: OwnProps): JSX.Element => {
    const [truncated, setTruncated] = useState(false);
    const [titleWidth, setTitleWidth] = useState('100%');
    const headerContainerRef = useRef() as MutableRefObject<HTMLSpanElement>;

    // titleTruncateThresholdWidth allow text to be truncate. antd absolutly needs a
    // a width to be able to works. Only active it when needed since useLayoutEffect
    // can be a performance pitfall. A value needs to be passed since our div can
    // be bigger than our header width.
    if (titleTruncateThresholdWidth) {
        useLayoutEffect(() => {
            if (!headerContainerRef?.current) {
                return;
            }

            const headerWidth = headerContainerRef.current.clientWidth;
            setTitleWidth(`${headerWidth - titleTruncateThresholdWidth}px`);
        });
    }

    return (
        <Title className={classnames(styles.cardHeader, className)} level={4} ref={headerContainerRef}>
            <div className={classnames({ 'rgl-drag-zone': isDraggable })}>
                <Space align="center" className={styles.cardHeadererContent} direction="horizontal" size={5}>
                    {isDraggable && (
                        <DragHandle className={classnames(styles.dragHandle, handleClassName)} id={id}>
                            <HolderOutlined />
                        </DragHandle>
                    )}
                    {
                        <div className={styles.titleContainer} style={{ width: titleWidth }}>
                            <Tooltip title={truncated ? title : undefined}>
                                <Typography.Text
                                    ellipsis={titleTruncateThresholdWidth ? { onEllipsis: setTruncated } : {}}
                                    style={{ width: titleWidth }}
                                    tabIndex={0}
                                >
                                    {title}
                                </Typography.Text>
                            </Tooltip>
                        </div>
                    }
                    {infoPopover && (
                        <Popover
                            {...infoPopover}
                            className={cx(styles.infoPopover, infoPopover.className)}
                            overlayClassName={cx(styles.infoPopoverOverlay, infoPopover.overlayClassName)}
                        >
                            <InfoCircleOutlined className={classnames(styles.infoIcon, infoPopover.iconClassName)} />
                        </Popover>
                    )}
                </Space>
            </div>
            <div className={extraClassName}>{extra}</div>
        </Title>
    );
};

export default GridCardHeader;
