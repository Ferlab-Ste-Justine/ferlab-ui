import React, { ComponentType } from 'react';
import { Button } from 'antd';

import ExternalLinkIcon from '../../../components/ExternalLink/ExternalLinkIcon';
import { IIconProps } from '../../../components/Icons/type';
import TextIcon from '../TextIcon';

import styles from './index.module.scss';

type TBannerItemProps = {
    IconComponent: ComponentType<IIconProps>;
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
};
const BannerItem = ({ buttonText, buttonUrl, description, IconComponent, title }: TBannerItemProps) => (
    <div className={styles.container}>
        <TextIcon IconComponent={IconComponent} color="dark" size="medium" title={title} />
        <div className={styles.text}>{description}</div>
        <div>
            <Button href={buttonUrl} size="large" target="_blank" type="primary">
                {buttonText}
                <ExternalLinkIcon height="14" width="14" />
            </Button>
        </div>
    </div>
);

export default BannerItem;
