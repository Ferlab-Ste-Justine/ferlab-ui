import React from 'react';
import { CaretDownOutlined, CaretRightOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';
import { Collapse as AntCollapse, CollapsePanelProps, CollapseProps } from 'antd';
import cx from 'classnames';
import { isUndefined } from 'lodash';

import styles from '@ferlab/style/components/collapse/Collapse.module.scss';

export type TCollapseProps = CollapseProps & {
    children?: React.ReactNode;
    size?: 'large' | 'default' | 'small';
    theme?: 'shade' | 'light';
    arrowIcon?: 'caretOutlined' | 'caretFilled';
    headerBorderOnly?: boolean;
};

export type TCollapsePanelProps = CollapsePanelProps & {
    children?: React.ReactNode;
};

const Collapse = ({
    arrowIcon = 'caretOutlined',
    headerBorderOnly = false,
    size = 'default',
    theme = 'light',
    ...rest
}: TCollapseProps) => (
    <AntCollapse
        {...rest}
        bordered={isUndefined(rest.bordered) ? !headerBorderOnly : rest.bordered && !headerBorderOnly}
        className={cx(
            styles.fuiCollapse,
            styles[size],
            styles[theme],
            headerBorderOnly ? styles.headerBorderOnly : '',
            rest.className,
        )}
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
    />
);

export const CollapsePanel = (props: TCollapsePanelProps) => (
    <AntCollapse.Panel {...props} className={cx(styles.fuiCollapsePanel, props.className)}>
        {props.children}
    </AntCollapse.Panel>
);

export default Collapse;
