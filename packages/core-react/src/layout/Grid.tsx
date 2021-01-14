import React, { FunctionComponent } from 'react';

export type GridProps = {
    backgroundColor?: string;
    children: React.ReactNode;
    className?: string;
};

const Grid: FunctionComponent<GridProps> = ({ backgroundColor, children, className = '' }) => {
    const styles: React.CSSProperties = backgroundColor ? { backgroundColor } : {};
    return (
        <div
            style={{ ...styles }}
            className={`core-layout-grid--content core-layout-grid--content-summary ${className}`}
        >
            {children}
        </div>
    );
};

export default Grid;
