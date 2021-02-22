import React, { useRef, RefObject } from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';
import {StackLayoutProps} from "../layout/StackLayout";

import '@ferlab/style/layout/TableContent.scss'

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
