import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { Button, ButtonProps } from 'antd';

import ExternalLink from '../ExternalLink';

import styles from './index.module.scss';

type TPopoverContentLink = Omit<LinkProps, 'to'> & {
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
        <Link to={to} {...linkProps}>
            <Button {...buttonProps}>{title}</Button>
        </Link>
    );
};

export default PopoverContentLink;
