import React, { ReactElement } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Popover, PopoverProps, Typography } from 'antd';
import cx from 'classnames';

import styles from './index.module.scss';

export interface IProLabelProps {
    title: string;
    className?: string;
    popoverProps?: PopoverProps;
    colon?: boolean;
    size?: 'small' | 'default';
    requiredMark?: boolean;
}

const { Text } = Typography;

const ProLabel = ({
    className = '',
    colon = false,
    popoverProps,
    requiredMark = false,
    size = 'default',
    title,
}: IProLabelProps): ReactElement => (
    <Text className={cx(styles.fuiProLabel, requiredMark ? styles.requiredMark : '', className)}>
        <span>
            <span className={cx(styles.title, styles[size])}>{title}</span>
            {popoverProps && (
                <Text className={styles.infoIconWrapper} type="secondary">
                    <Popover {...popoverProps}>
                        <InfoCircleOutlined />
                    </Popover>
                </Text>
            )}
            {colon && <span className={styles.colon}>:</span>}
        </span>
    </Text>
);

export default ProLabel;
