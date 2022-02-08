import React, { ReactNode } from 'react';
import { Space } from 'antd';
import Title from 'antd/lib/typography/Title';
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
    title?: string | undefined;
    imageType?: IImageType;
    description?: ReactNode;
    action?: ReactNode;
}

const Empty = ({
    className = '',
    title = undefined,
    description = 'No data',
    size = 'default',
    image = undefined,
    showImage = true,
    imageType = 'row',
    action,
}: IEmptyProps) => (
    <div className={cx(styles.fuiEmpty, className, styles[size])}>
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
                {description}
                {action && <div className={styles.actions}>{action}</div>}
            </Space>
        </div>
    </div>
);

export default Empty;
