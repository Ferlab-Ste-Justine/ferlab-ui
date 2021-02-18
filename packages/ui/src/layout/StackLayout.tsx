/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import cx from 'classnames';
import '@ferlab/style/layout/StackLayout.scss'

export enum StackOrientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal',
}

type ExtraProps = {
    onClick?: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => null;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => null;
}

export type StackLayoutOwnProps = {
    center?: boolean;
    className?: string;
    fitContent?: boolean;
    flexContent?: boolean;
    orientation?: StackOrientation;
    vertical?: boolean;
    horizontal?: boolean;
    style?: React.CSSProperties
}

export type StackLayoutProps = StackLayoutOwnProps & ExtraProps;

const StackLayout: React.FC<StackLayoutProps> = ({
    center,
    children,
    className,
    fitContent = false, // stretch layout to fit content
    flexContent = false,
    horizontal,
    onClick,
    orientation,
    vertical,
    style
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

    const compoundCN = cx(className, { center, flexContent, fitContent });
    return (
        <div className={`ferlabui-stack-layout ${definedOrientation} ${compoundCN}`} {...extraProps} style={style || {}}>
            {children}
        </div>
    );
};

export default StackLayout;
