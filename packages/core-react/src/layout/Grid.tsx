import React, { FunctionComponent } from 'react';

type Props = {
    children: React.ReactNode;
};

const Grid: FunctionComponent<Props> = ({ children }) => (
    <div className="core-layout-grid--content core-layout-grid--content-summary">
        {children}
    </div>
)

export default Grid;
