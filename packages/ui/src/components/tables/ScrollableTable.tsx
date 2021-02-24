import React from 'react';

import '@ferlab/style/components/tables/ScrollableTable.scss'

export type ScrollableTableProps = {
    className?: string;
    children?: React.ReactNode;
};

const ScrollableTable: React.FC<ScrollableTableProps> = ({
    children,
    className = '',
}) => {
    return (
        <div className="table-scrollable-container" >
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
    )
}


export default ScrollableTable;
