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
    selectedRowCount?: number;
    total: number;
    dictionary?: IProTableDictionary;
    onClearSelection?: () => void;
}

const TableHeader = ({
    extra = [],
    extraSpacing = 8,
    pageIndex,
    pageSize,
    selectedRowCount = 0,
    total,
    dictionary = {},
    onClearSelection,
}: OwnProps) => (
    <div className={styles.ProTableHeader}>
        {selectedRowCount > 0 ? (
            <SelectedCount dictionnary={dictionary} selectedRowCount={selectedRowCount} onClear={onClearSelection} />
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
