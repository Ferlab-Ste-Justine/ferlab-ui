import React from 'react';
import { Space } from 'antd';
import cx from 'classnames';

import ExternalLinkIcon from './ExternalLinkIcon';

import styles from './index.module.scss';

export type IExternalLinkProps = Omit<
    React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
        children: React.ReactNode;
        hasIcon?: boolean;
    },
    'rel' | 'target'
>;

const ExternalLink = (props: IExternalLinkProps) => (
    <a {...props} className={props.className} rel="noreferrer" target="_blank">
        <Space size={5.75}>
            <span className={styles.fuiExternalLink}>{props.children}</span>
            {props.hasIcon && <ExternalLinkIcon height="14" width="14" />}
        </Space>
    </a>
);

export default ExternalLink;
