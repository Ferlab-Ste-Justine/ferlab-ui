import { MutableRefObject, ReactNode, useLayoutEffect, useRef, useState } from 'react';
import React from 'react';
import { HolderOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Popover, PopoverProps, Space, Tooltip, Typography } from 'antd';
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
    titleTruncateThresholdWidth?: number;
}

const { Title } = Typography;

const GridCardHeader = ({
    id,
    title,
    extraClassName = '',
    extra = [],
    withHandle = false,
    infoPopover,
    titleTruncateThresholdWidth,
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
        <Title className={styles.cardHeader} level={4} ref={headerContainerRef}>
            <Space align="center" className={styles.cardHeadererContent} direction="horizontal" size={5}>
                {withHandle && (
                    <DragHandle className={styles.dragHandle} id={id}>
                        <HolderOutlined />
                    </DragHandle>
                )}
                {
                    <div className={styles.titleContainer} style={{ width: titleWidth }}>
                        <Tooltip title={truncated ? title : undefined}>
                            <Typography.Text ellipsis={{ onEllipsis: setTruncated }} style={{ width: titleWidth }}>
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
                        <InfoCircleOutlined className={styles.infoIcon} />
                    </Popover>
                )}
            </Space>
            <div className={extraClassName}>{extra}</div>
        </Title>
    );
};

export default GridCardHeader;
