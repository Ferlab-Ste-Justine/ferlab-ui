import React, { ComponentType } from 'react';
import { Button, ButtonProps } from 'antd';

import ExternalLinkIcon from '../../../components/ExternalLink/ExternalLinkIcon';
import { IIconProps } from '../../../components/Icons/type';
import TextIcon from '../TextIcon';

import styles from './index.module.scss';

type BannerItemDictionary = {
    description: string;
    button: string;
    title: string;
};

export type BannerItemProps = {
    IconComponent: ComponentType<IIconProps>;
    color?: 'light' | 'dark';
    dictionary: BannerItemDictionary;
    buttonProps?: ButtonProps;
};
const BannerItem = ({ buttonProps, color = 'light', dictionary, IconComponent }: BannerItemProps) => (
    <div className={styles.container}>
        <TextIcon IconComponent={IconComponent} color={color} size="medium" title={dictionary.title} />
        <div className={styles.text}>{dictionary.description}</div>
        <div>
            <Button size="large" {...buttonProps}>
                {dictionary.button}
                <ExternalLinkIcon height="14" width="14" />
            </Button>
        </div>
    </div>
);

export default BannerItem;
