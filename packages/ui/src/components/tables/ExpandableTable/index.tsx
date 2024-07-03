import React, { ReactElement, useState } from 'react';
import { Table, Typography } from 'antd';
import { TableProps } from 'antd/lib/table';

import { getTitleByType } from '../../ProTable';
import { ProColumnType, ProColumnTypes } from '../../ProTable/types';

import styles from './index.module.css';

export type TExpandableTableProps = TableProps<any> & {
    nOfElementsWhenCollapsed?: number;
    buttonText: (showAll: boolean, hiddenNum: number) => ReactElement | string;
    columns?: ProColumnTypes[];
};

const DEFAULT_NUM_COLLAPSED = 5;

const ExpandableTable = ({
    buttonText,
    columns,
    dataSource,
    nOfElementsWhenCollapsed = DEFAULT_NUM_COLLAPSED,
    ...tableProps
}: TExpandableTableProps): ReactElement => {
    const [showAll, setShowAll] = useState(false);
    const dataTotalLength = dataSource?.length || 0;
    const sliceNum = showAll ? dataTotalLength : nOfElementsWhenCollapsed;
    const showButton = dataTotalLength > nOfElementsWhenCollapsed;
    const hiddenNum = dataTotalLength - sliceNum;
    const columnsWithTitles = columns?.map((column) => ({ ...column, title: getTitleByType(column as ProColumnType) }));

    return (
        <>
            <Table {...tableProps} columns={columnsWithTitles} dataSource={(dataSource || []).slice(0, sliceNum)} />
            {showButton && (
                <Typography.Link className={styles.fuiExpandableTableBtn} onClick={() => setShowAll(!showAll)}>
                    {buttonText(showAll, hiddenNum)} {showAll ? '-' : '+'}
                </Typography.Link>
            )}
        </>
    );
};

export default ExpandableTable;
