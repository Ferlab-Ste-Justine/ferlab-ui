import React, { ComponentType } from 'react';
import { Button, ButtonProps } from 'antd';

import ExternalLinkIcon from '../../../components/ExternalLink/ExternalLinkIcon';
import { IIconProps } from '../../../components/Icons/type';
import TextIcon from '../TextIcon';

import styles from './index.module.css';

type TBannerItemDictionary = {
    description: string;
    button: string;
    title: string;
};

export type TBannerItemProps = {
    IconComponent: ComponentType<IIconProps>;
    color?: 'light' | 'dark';
    dictionary: TBannerItemDictionary;
    buttonProps?: ButtonProps;
    additionalButtons?: React.ReactNode[];
};
const BannerItem = ({
    additionalButtons,
    buttonProps,
    color = 'light',
    dictionary,
    IconComponent,
}: TBannerItemProps): JSX.Element => (
    <div className={styles.container}>
        <TextIcon IconComponent={IconComponent} color={color} size="medium" title={dictionary.title} />
        <div className={styles.text}>{dictionary.description}</div>
        <div className={styles.buttonContainer}>
            <Button size="large" {...buttonProps}>
                {dictionary.button}
                <ExternalLinkIcon height="14" width="14" />
            </Button>
            {additionalButtons?.map((button, index) => (
                <React.Fragment key={index}>{button}</React.Fragment>
            ))}
        </div>
    </div>
);

export default BannerItem;
