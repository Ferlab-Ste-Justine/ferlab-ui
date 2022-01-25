import React from 'react';
import { ItemsCount } from './ItemsCount';
import { Space } from 'antd';

import styles from '@ferlab/style/components/protable/ProTableHeader.module.scss';

interface OwnProps {
    extra?: React.ReactNode[];
    pageIndex: number;
    pageSize: number;
    total: number;
}

const TableHeader = ({ extra = [], pageIndex, pageSize, total }: OwnProps) => (
    <div className={styles.ProTableHeader}>
        <ItemsCount page={pageIndex} size={pageSize} total={total} />
        <Space size={12}>
            {extra.map((element, index) => (
                <div key={index}>{element}</div>
            ))}
        </Space>
    </div>
);

export default TableHeader;
