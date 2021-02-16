/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import cx from 'classnames';
import '@ferlab/style/layout/StackLayout.scss'

export enum StackOrientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal',
}

interface IExtraProps {
    onClick?: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => null;
    onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => null;
}

export interface IStackLayoutProps extends IExtraProps {
    center?: boolean;
    className?: string;
    fitContent?: boolean;
    flexContent?: boolean;
    orientation?: StackOrientation;
    vertical?: boolean;
    horizontal?: boolean;
    style?: React.CSSProperties
}
const StackLayout: React.FC<IStackLayoutProps> = ({
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

    const extraProps: IExtraProps = {};
    if (onClick) {
        extraProps.onClick = onClick;
        extraProps.onKeyDown = onClick;
    }

    const compoundCN = cx(className, { center, flexContent, fitContent });
    return (
        <div className={`fui-stack-layout ${definedOrientation} ${compoundCN}`} {...extraProps} style={style || {}}>
            {children}
        </div>
    );
};

export default StackLayout;
