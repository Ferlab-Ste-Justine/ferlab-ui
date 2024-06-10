import { MutableRefObject, ReactElement, ReactNode, useEffect, useRef, useState } from 'react';
import React from 'react';
import { HolderOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { Popover, PopoverProps, Space, Tooltip, Typography } from 'antd';
import classnames from 'classnames';
import cx from 'classnames';
import { throttle } from 'lodash';

import DragHandle from '../../../../layout/SortableGrid/DragHandle';

import styles from './GridCardHeader.module.css';

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
    withHandle?: boolean;
}

const { Text, Title } = Typography;

const GridCardHeader = ({
    className,
    extra = [],
    extraClassName = '',
    handleClassName,
    id,
    infoPopover,
    title,
    titleTruncateThresholdWidth,
    withHandle = false,
}: OwnProps): ReactElement => {
    const [truncated, setTruncated] = useState(false);
    const [titleWidth, setTitleWidth] = useState('100%');
    const headerContainerRef = useRef() as MutableRefObject<HTMLSpanElement>;
    const onCardResize = throttle(() => {
        if (!titleTruncateThresholdWidth) {
            return;
        }
        const headerWidth = headerContainerRef?.current?.clientWidth;
        if (!headerWidth) {
            return;
        }
        setTitleWidth(`${headerWidth - titleTruncateThresholdWidth}px`);
    }, 10);
    const resizeObserver = new ResizeObserver(onCardResize);

    useEffect(() => {
        if (!headerContainerRef.current || !titleTruncateThresholdWidth) {
            return;
        }

        resizeObserver.observe(headerContainerRef.current);
    }, [headerContainerRef, headerContainerRef.current]);

    return (
        <Title className={classnames(styles.cardHeader, className)} level={4} ref={headerContainerRef}>
            <div className={classnames({ 'rgl-drag-zone': withHandle })}>
                <Space align="center" className={styles.cardHeadererContent} direction="horizontal" size={5}>
                    {withHandle && (
                        <DragHandle className={classnames(styles.dragHandle, handleClassName)} id={id}>
                            <HolderOutlined />
                        </DragHandle>
                    )}
                    {
                        <div className={styles.titleContainer} style={{ width: titleWidth }}>
                            <Tooltip title={truncated ? title : undefined}>
                                <Text
                                    className={styles.title}
                                    ellipsis={titleTruncateThresholdWidth ? { onEllipsis: setTruncated } : {}}
                                    style={{ width: titleWidth }}
                                    tabIndex={0}
                                >
                                    {title}
                                </Text>
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
