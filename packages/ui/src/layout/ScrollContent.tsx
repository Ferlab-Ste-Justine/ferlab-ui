import React from 'react';
import SimpleBar from 'simplebar-react';

import 'simplebar/dist/simplebar.min.css';
import './ScrollContent.css';

export enum StackOrientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal',
}

export type ScrollContentProps = {
    id?: string;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
};

const ScrollContent: React.FC<ScrollContentProps> = ({ children, className = '', id = '', style = {} }) => (
    <SimpleBar
        className={`ferlabui-scroll-content ${StackOrientation.Vertical} ${className || ''}`}
        id={id}
        style={style}
    >
        {children}
    </SimpleBar>
);

export default ScrollContent;
