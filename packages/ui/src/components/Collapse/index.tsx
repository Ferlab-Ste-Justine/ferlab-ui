import { Collapse as AntCollapse, CollapseProps, CollapsePanelProps } from 'antd';
import cx from 'classnames';
import React from 'react';
import {
    CaretDownOutlined,
    CaretRightOutlined,
    DownOutlined,
    RightOutlined,
} from '@ant-design/icons';
import { isUndefined } from 'lodash';

import styles from '@ferlab/style/components/collapse/Collapse.module.scss';

export type TCollapseProps = CollapseProps & {
    children?: React.ReactNode;
    size?: 'large' | 'default' | 'small';
    theme?: 'shade' | 'light';
    arrowIcon?: 'caretOutlined' | 'caretFilled';
    headerBorderOnly?: boolean;
};

export type TCollapsePanelProps = CollapsePanelProps & {
    children?: React.ReactNode;
};

const Collapse = ({
    size = 'default',
    theme = 'light',
    arrowIcon = 'caretOutlined',
    headerBorderOnly = false,
    ...rest
}: TCollapseProps) => (
    <AntCollapse
        {...rest}
        expandIcon={
            rest.expandIcon ??
            (({ isActive }) =>
                isActive ? (
                    arrowIcon === 'caretOutlined' ? (
                        <DownOutlined />
                    ) : (
                        <CaretDownOutlined />
                    )
                ) : arrowIcon === 'caretOutlined' ? (
                    <RightOutlined />
                ) : (
                    <CaretRightOutlined />
                ))
        }
        bordered={isUndefined(rest.bordered) ? !headerBorderOnly : rest.bordered && !headerBorderOnly}
        className={cx(
            styles.fuiCollapse,
            styles[size],
            styles[theme],
            headerBorderOnly ? styles.headerBorderOnly : '',
            rest.className,
        )}
    />
);

export const CollapsePanel = (props: TCollapsePanelProps) => (
    <AntCollapse.Panel {...props} className={cx(styles.fuiCollapsePanel, props.className)}>
        {props.children}
    </AntCollapse.Panel>
);

export default Collapse;
