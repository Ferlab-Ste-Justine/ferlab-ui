/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import cx from 'classnames';

import '@ferlab/style/layout/StackLayout.scss';

export enum StackOrientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal',
}

type ExtraProps = {
    onClick?: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
};

export type StackLayoutOwnProps = {
    center?: boolean;
    className?: string;
    fitContent?: boolean;
    flexContent?: boolean;
    flexOwn?: boolean;
    orientation?: StackOrientation;
    vertical?: boolean;
    horizontal?: boolean;
    style?: React.CSSProperties;
};

export type StackLayoutProps = StackLayoutOwnProps & ExtraProps;

const StackLayout: React.FC<StackLayoutProps> = ({
    center,
    children,
    className,
    fitContent = false, // stretch layout to fit content
    flexContent = false,
    flexOwn = false,
    horizontal,
    onClick,
    orientation,
    style,
    vertical,
}) => {
    const definedOrientation = vertical
        ? StackOrientation.Vertical
        : horizontal
        ? StackOrientation.Horizontal
        : orientation || StackOrientation.Horizontal;

    const extraProps: ExtraProps = {};
    if (onClick) {
        extraProps.onClick = onClick;
        extraProps.onKeyDown = onClick;
    }

    const compoundCN = cx('ferlabui-stack-layout', definedOrientation, { center, fitContent, flexContent, flexOwn }, className);
    return (
        <div className={compoundCN} {...extraProps} style={style || {}}>
            {children}
        </div>
    );
};

export default StackLayout;
