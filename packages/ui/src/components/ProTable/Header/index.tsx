import React from 'react';
import { ItemsCount } from './ItemsCount';
import { Space } from 'antd';
import { IProTableDictionary } from '../types';
import { SelectedCount } from './SelectedCount';

import styles from '@ferlab/style/components/protable/ProTableHeader.module.scss';

interface OwnProps {
    extra?: React.ReactNode[];
    extraSpacing?: number;
    pageIndex: number;
    pageSize: number;
    selectedAllResults?: boolean;
    selectedAllPage?: boolean;
    selectedRowCount?: number;
    total: number;
    dictionary?: IProTableDictionary;
    onSelectAllResults?: () => void;
    onClearSelection?: () => void;
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
}: OwnProps) => (
    <div className={styles.ProTableHeader}>
        {selectedRowCount > 0 ? (
            <SelectedCount
                dictionnary={dictionary}
                selectedRowCount={selectedRowCount}
                selectedAllResults={selectedAllResults}
                selectedAllPage={selectedAllPage}
                onClear={onClearSelection}
                onSelectAll={onSelectAllResults}
            />
        ) : (
            <ItemsCount dictionnary={dictionary} page={pageIndex} size={pageSize} total={total} />
        )}
        <Space size={extraSpacing}>
            {extra.map((element, index) => (
                <div key={index}>{element}</div>
            ))}
        </Space>
    </div>
);

export default TableHeader;
