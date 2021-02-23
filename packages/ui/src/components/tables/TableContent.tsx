import React from 'react';

import '@ferlab/style/components/tables/TableContent.scss'

export type TableContentProps = {
    className?: string;
    children?: React.ReactNode;
};

const TableContent: React.FC<TableContentProps> = ({
    children,
    className = '',
}: TableContentProps) => {
    return (
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
            <div className="scroll-overlay" />
        </div>
    );
};

export default TableContent;
