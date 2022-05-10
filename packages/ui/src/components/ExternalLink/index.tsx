import React from 'react';
import cx from 'classnames';

import styles from '@ferlab/style/components/prolabel/ProLabel.module.scss';

export type IExternalLinkProps = Omit<
    React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
        children: React.ReactNode;
    },
    'rel' | 'target'
>;

const ExternalLink = (props: IExternalLinkProps) => (
    <a {...props} className={cx(styles.fuiExternalLink, props.className)} rel="noreferrer" target="_blank">
        {props.children}
    </a>
);

export default ExternalLink;
