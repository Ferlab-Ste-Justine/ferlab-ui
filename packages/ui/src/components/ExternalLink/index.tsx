import React from 'react';
import { Space } from 'antd';

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
    <a rel="noreferrer" target="_blank" {...props}>
        <Space size={5.75}>
            <div className={styles.fuiExternalLink}>{props.children}</div>
            {props.hasIcon && <ExternalLinkIcon height="14" width="14" />}
        </Space>
    </a>
);

export default ExternalLink;
