import React from 'react';
import { Space } from 'antd';

import { IProTableDictionary } from '../types';

import { ItemsCount } from './ItemsCount';
import { SelectedCount } from './SelectedCount';

import styles from './index.module.scss';

interface OwnProps {
    extra?: React.ReactNode[];
    extraSpacing?: number;
    pageIndex: number;
    pageSize: number;
    selectedAllResults?: boolean;
    selectedAllPage?: boolean;
    selectedRowCount?: number;
    total: number;
    hideItemsCount?: boolean;
    dictionary?: IProTableDictionary;
    onSelectAllResults?: () => void;
    onClearSelection?: () => void;
    className?: string;
}

const TableHeader = ({
    extra = [],
    extraSpacing = 12,
    pageIndex,
    pageSize,
    selectedAllResults = false,
    selectedAllPage = false,
    selectedRowCount = 0,
    total,
    dictionary = {},
    onSelectAllResults,
    onClearSelection,
    hideItemsCount = false,
    className,
}: OwnProps) => (
    <div className={className || styles.ProTableHeader}>
        {selectedRowCount > 0 ? (
            <SelectedCount
                dictionnary={dictionary}
                onClear={onClearSelection}
                onSelectAll={onSelectAllResults}
                selectedAllPage={selectedAllPage}
                selectedAllResults={selectedAllResults}
                selectedRowCount={selectedRowCount}
            />
        ) : (
            <ItemsCount
                dictionnary={dictionary}
                hidden={hideItemsCount}
                page={pageIndex}
                size={pageSize}
                total={total}
            />
        )}
        <Space size={extraSpacing}>
            {extra.map((element, index) => (
                <div key={index}>{element}</div>
            ))}
        </Space>
    </div>
);

export default TableHeader;
