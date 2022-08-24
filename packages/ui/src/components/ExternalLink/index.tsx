import React from 'react';
import { Space } from 'antd';
import cx from 'classnames';

import ExternalLinkIcon from './ExternalLinkIcon';

import styles from '@ferlab/style/components/prolabel/ProLabel.module.scss';

export type IExternalLinkProps = Omit<
    React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> & {
        children: React.ReactNode;
        hasIcon?: boolean;
    },
    'rel' | 'target'
>;

const ExternalLink = (props: IExternalLinkProps) => (
    <a {...props} className={cx(styles.fuiExternalLink, props.className)} rel="noreferrer" target="_blank">
        <Space size={5.75}>
            {props.children}

            {props.hasIcon === true ? <ExternalLinkIcon height="14" width="14" /> : null}
        </Space>
    </a>
);

export default ExternalLink;
