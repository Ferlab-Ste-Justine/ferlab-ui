import React from 'react';
import { Button, ButtonProps } from 'antd';

import ExternalLink from '../ExternalLink';

import styles from './index.module.css';

type TPopoverContentLink = {
    className?: string;
    title: string;
    externalHref?: string;
    to?: any;
};

const buttonProps: ButtonProps = {
    className: styles.popoverContentLink,
    size: 'small',
    type: 'link',
};

const PopoverContentLink = ({ externalHref, title, to, ...linkProps }: TPopoverContentLink): JSX.Element => {
    if (externalHref) {
        return (
            <ExternalLink href={externalHref} {...linkProps}>
                <Button {...buttonProps}>{title}</Button>
            </ExternalLink>
        );
    }

    return (
        <a href={to} {...linkProps}>
            <Button {...buttonProps}>{title}</Button>
        </a>
    );
};

export default PopoverContentLink;
