import React, { FunctionComponent } from 'react';

type Props = {
    backgroundColor?: string,
    children: React.ReactNode;
    className: string
};

const Grid: FunctionComponent<Props> = ({ backgroundColor, children, className }) => {
    const styles: React.CSSProperties = {};
    if (backgroundColor) styles.backgroundColor = backgroundColor;
    return <div style={{...styles}} className={`core-layout-grid--content core-layout-grid--content-summary ${className}`}>
        {children}
    </div>
}

export default Grid;
