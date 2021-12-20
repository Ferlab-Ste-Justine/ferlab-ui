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
};

const ScrollContent: React.FC<ScrollContentProps> = ({ children, className = '', style = {} }) => {
    return (
        <SimpleBar className={`ferlabui-scroll-content ${StackOrientation.Vertical} ${className || ''}`} style={style}>
            {children}
        </SimpleBar>
    );
};

export default ScrollContent;
