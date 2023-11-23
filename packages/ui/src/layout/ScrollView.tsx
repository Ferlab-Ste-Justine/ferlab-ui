import React from 'react';

import './ScrollView.scss';

export enum StackOrientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal',
}

export type ScrollViewProps = {
    orientation?: StackOrientation;
    vertical?: boolean;
    horizontal?: boolean;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

const ScrollView: React.FC<ScrollViewProps> = ({
    children,
    className,
    horizontal,
    orientation,
    style = {},
    vertical,
}) => {
    const definedOrientation = vertical
        ? StackOrientation.Vertical
        : horizontal
        ? StackOrientation.Horizontal
        : orientation || StackOrientation.Vertical;
    return (
        <div className={`ferlabui-scroll-view ${definedOrientation} ${className || ''}`} style={style}>
            {children}
        </div>
    );
};

export default ScrollView;
