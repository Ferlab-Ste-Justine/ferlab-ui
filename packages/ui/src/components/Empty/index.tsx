import React, { ReactElement, ReactNode } from 'react';
import { Space, Typography } from 'antd';
import cx from 'classnames';

import DefaultImageGrid from './icons/DefaultImageGrid';
import DefaultImageRow from './icons/DefaultImageRow';

import styles from './index.module.scss';

type SizeTypes = 'mini' | 'default' | 'large';
type IImageType = 'row' | 'grid';

export interface IEmptyProps {
    className?: string;
    image?: ReactNode;
    showImage?: boolean;
    size?: SizeTypes;
    title?: string;
    imageType?: IImageType;
    description?: ReactNode;
    action?: ReactNode;
    noPadding?: boolean;
    align?: 'left' | 'center';
}

const { Text, Title } = Typography;

const Empty = ({
    action,
    align = 'center',
    className = '',
    description = 'No data',
    image = undefined,
    imageType = 'row',
    noPadding = false,
    showImage = true,
    size = 'default',
    title = undefined,
}: IEmptyProps): ReactElement => (
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
