import React, { ReactNode } from 'react';
import { Space, Typography } from 'antd';
import cx from 'classnames';

import DefaultImageGrid from './icons/DefaultImageGrid';
import DefaultImageRow from './icons/DefaultImageRow';

import styles from '@ferlab/style/components/empty/Empty.module.scss';

type SizeTypes = 'mini' | 'default' | 'large';
type IImageType = 'row' | 'grid';

export interface IEmptyProps {
    className?: string;
    image?: ReactNode;
    showImage?: boolean;
    size?: SizeTypes;
    title?: string;
    imageType?: IImageType;
    description?: string;
    action?: ReactNode;
    noPadding?: boolean;
    align?: 'left' | 'center';
}

const { Text, Title } = Typography;

const Empty = ({
    className = '',
    title = undefined,
    description = 'No data',
    size = 'default',
    image = undefined,
    showImage = true,
    imageType = 'row',
    action,
    noPadding = false,
    align = 'center',
}: IEmptyProps) => (
    <div className={cx(styles.fuiEmpty, className, styles[size], noPadding ? styles.noPadding : '', styles[align])}>
        <div className={styles.content}>
            {showImage ? (
                image ? (
                    image
                ) : imageType === 'grid' ? (
                    <DefaultImageGrid className={cx(styles.image, styles.imageGrid)} />
                ) : (
                    <DefaultImageRow className={cx(styles.image, styles.imageRow)} />
                )
            ) : undefined}
            <Space className={styles.contentWrapper} direction="vertical" size={0}>
                {title && <Title className={styles.title}>{title}</Title>}
                {description && <Text className={styles.description}>{description}</Text>}
                {action && <div className={styles.action}>{action}</div>}
            </Space>
        </div>
    </div>
);

export default Empty;
