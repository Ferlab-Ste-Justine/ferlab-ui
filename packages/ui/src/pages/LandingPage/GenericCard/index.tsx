import React, { ReactNode } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, ButtonProps } from 'antd';
import cx from 'classnames';

import styles from './index.module.css';

export type TGenericDictionary = {
    button: string;
    description: string;
};

export type TGenericCardProps = {
    buttonProps?: ButtonProps;
    containerClassName?: string;
    dictionary: TGenericDictionary;
    iconButton?: ReactNode;
    logo: ReactNode;
};

const GenericCard = ({
    buttonProps,
    containerClassName,
    dictionary,
    iconButton,
    logo,
}: TGenericCardProps): React.ReactElement => (
    <div className={cx(styles.container, containerClassName)}>
        {logo}
        <div className={styles.description}>{dictionary.description}</div>
        <div className={styles.buttonContainer}>
            <Button size="large" {...buttonProps}>
                {dictionary.button}
                {iconButton || <ArrowRightOutlined />}
            </Button>
        </div>
    </div>
);

export default GenericCard;
