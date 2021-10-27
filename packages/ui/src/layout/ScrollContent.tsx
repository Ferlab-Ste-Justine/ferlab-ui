import React from 'react';
import SimpleBar from 'simplebar-react';

import 'simplebar/dist/simplebar.min.css';
import '@ferlab/style/layout/ScrollContent.scss';

export enum StackOrientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal',
}

export type ScrollContentProps = {
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    vertical?: boolean;
    horizontal?: boolean;
};

const ScrollContent: React.FC<ScrollContentProps> = ({
    children,
    className = '',
    style = {},
    horizontal,
    vertical,
}) => {
    const definedOrientation = vertical
        ? StackOrientation.Vertical
        : horizontal
        ? StackOrientation.Horizontal
        : StackOrientation.Vertical;

    return (
        <SimpleBar className={`ferlabui-scroll-content ${definedOrientation} ${className || ''}`} style={style}>
            {children}
        </SimpleBar>
    );
};

export default ScrollContent;
