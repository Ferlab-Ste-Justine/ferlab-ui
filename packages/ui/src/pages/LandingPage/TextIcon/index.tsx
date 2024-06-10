import React, { ComponentType, ReactNode } from 'react';

import { IIconProps } from '../../../components/Icons/type';

import styles from './index.module.css';

export type TTextIconProps = {
    IconComponent: ComponentType<IIconProps>;
    title?: ReactNode;
    subtitle?: ReactNode;
    size?: 'small' | 'medium' | 'large';
    color?: 'light' | 'dark';
};

const TextIcon = ({ color = 'light', IconComponent, size = 'small', subtitle, title }: TTextIconProps) => (
    <div className={`${styles[size]} ${styles[color]}`}>
        <div className={styles.layout}>
            <IconComponent className={styles.icon} spotClassName={styles.iconSpot} />
            <div>
                <div className={styles.title}>{title}</div>
                <div className={styles.subtitle}>{subtitle}</div>
            </div>
        </div>
    </div>
);

export default TextIcon;
