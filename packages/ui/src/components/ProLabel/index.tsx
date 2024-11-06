import React, { ReactElement } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Popover, PopoverProps, Tooltip, TooltipProps, Typography } from 'antd';
import cx from 'classnames';

import styles from './index.module.css';

export type IProLabelProps = {
    title: string;
    className?: string;
    colon?: boolean;
    size?: 'small' | 'default';
    requiredMark?: boolean;
} & (
    | {
          popoverProps?: PopoverProps;
          tooltipProps?: never;
      }
    | {
          popoverProps?: never;
          tooltipProps?: TooltipProps;
      }
);

const { Text } = Typography;

const ProLabel = ({
    className = '',
    colon = false,
    popoverProps,
    tooltipProps,
    requiredMark = false,
    size = 'default',
    title,
}: IProLabelProps): ReactElement => (
    <Text className={cx(styles.fuiProLabel, requiredMark ? styles.requiredMark : '', className)}>
        <span>
            <span className={cx(styles.title, styles[size])}>{title}</span>
            {(popoverProps || tooltipProps) && (
                <Text className={styles.infoIconWrapper} type="secondary">
                    {tooltipProps ? (
                        <Tooltip {...tooltipProps}>
                            <InfoCircleOutlined />
                        </Tooltip>
                    ) : (
                        <Popover {...popoverProps}>
                            <InfoCircleOutlined />
                        </Popover>
                    )}
                </Text>
            )}
            {colon && <span className={styles.colon}>:</span>}
        </span>
    </Text>
);

export default ProLabel;
