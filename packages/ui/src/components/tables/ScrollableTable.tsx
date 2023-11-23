import React, { ReactElement } from 'react';

import './index.module.scss';

export type ScrollableTableProps = {
    className?: string;
    children?: React.ReactNode;
};

const ScrollableTable = ({ children, className = '' }: ScrollableTableProps): ReactElement => (
    <div className="table-scrollable-container">
        <div
            className={`table-scrollable ${className}`}
            id="table-scroll"
            onScroll={(e) => {
                e.persist();
            }}
        >
            {children}
        </div>
    </div>
);

export default ScrollableTable;
