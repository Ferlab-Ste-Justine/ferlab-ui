import React from 'react';
import { ItemsCount } from './ItemsCount';
import { Space } from 'antd';
import { IProTableDictionary } from '../types';

import styles from '@ferlab/style/components/protable/ProTableHeader.module.scss';

interface OwnProps {
    extra?: React.ReactNode[];
    extraSpacing?: number;
    pageIndex: number;
    pageSize: number;
    total: number;
    dictionary?: IProTableDictionary;
}

const TableHeader = ({ extra = [], extraSpacing = 8, pageIndex, pageSize, total, dictionary = {} }: OwnProps) => (
    <div className={styles.ProTableHeader}>
        <ItemsCount dictionnary={dictionary} page={pageIndex} size={pageSize} total={total} />
        <Space size={extraSpacing}>
            {extra.map((element, index) => (
                <div key={index}>{element}</div>
            ))}
        </Space>
    </div>
);

export default TableHeader;
