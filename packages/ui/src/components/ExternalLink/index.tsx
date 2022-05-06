import React from 'react';
import cx from 'classnames';

import styles from '@ferlab/style/components/prolabel/ProLabel.module.scss';

export interface IExternalLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

const ExternalLink = ({ href, children, className }: IExternalLinkProps) => (
    <a className={cx(styles.fuiExternalLink, className)} href={href} rel="noreferrer" target="_blank">
        {children}
    </a>
);

export default ExternalLink;