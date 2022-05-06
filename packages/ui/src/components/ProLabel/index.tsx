import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Popover, PopoverProps, Typography } from 'antd';
import cx from 'classnames';

import styles from '@ferlab/style/components/prolabel/ProLabel.module.scss';

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
    title,
    popoverProps,
    colon = false,
    size = 'default',
    className = '',
    requiredMark = false,
}: IProLabelProps) => (
    <Text className={cx(styles.fuiProLabel, requiredMark ? styles.requiredMark : '', className)}>
        <span>
            <span className={cx(styles.title, styles[size])}>{title}</span>
            {popoverProps && (
                <Text type="secondary" className={styles.infoIconWrapper}>
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
