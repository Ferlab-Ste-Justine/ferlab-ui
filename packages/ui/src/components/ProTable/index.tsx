import React from 'react';
import { Space, Table } from 'antd';
import ColumnSelector from './ColumnSelector';
import TableHeader from './Header';
import { useState } from 'react';
import { ColumnSelectorType, TColumnStateMap, TProTableProps } from './types';
import cx from 'classnames';

import styles from '@ferlab/style/components/protable/ProTable.module.scss';

const generateColumnStateMap = <RecordType,>(columns: ColumnSelectorType<RecordType>[]) => {
    let map: TColumnStateMap = {};
    columns.forEach((column, index) => {
        map[column.key] = {
            index,
            key: column.key,
            visible: !column.defaultHidden,
        };
    });
    return map;
};

const ProTable = <RecordType extends object = any>({
    tableId,
    columns,
    wrapperClassName = '',
    headerConfig = {
        marginBtm: 12,
        extra: [],
        columnSetting: false,
        itemCount: {
            pageIndex: 1,
            pageSize: 15,
        },
        onColumnStateChange: () => {},
    },
    initialColumnState,
    ...tableProps
}: TProTableProps<RecordType>) => {
    const [columnsState, setColumnsState] = useState<TColumnStateMap>(
        initialColumnState || generateColumnStateMap(columns),
    );

    return (
        <Space
            size={headerConfig.marginBtm}
            direction="vertical"
            className={cx(styles.ProTableWrapper, wrapperClassName)}
        >
            <TableHeader
                pageIndex={headerConfig.itemCount?.pageIndex}
                pageSize={headerConfig.itemCount?.pageSize}
                total={tableProps.pagination ? tableProps.pagination.total! : tableProps.dataSource?.length!}
                extra={[
                    ...(headerConfig.extra || []),
                    <ColumnSelector
                        columns={columns}
                        columnsState={columnsState}
                        onChange={(newColumnState) => {
                            setColumnsState(newColumnState);
                            headerConfig.onColumnStateChange(newColumnState);
                        }}
                    />,
                ]}
            />
            <Table
                {...tableProps}
                columns={Object.values(columnsState)
                    .filter(({ visible }) => visible)
                    .sort((a, b) => a.index - b.index)
                    .map(({ key }) => columns.find((column) => column.key === key)!)}
            ></Table>
        </Space>
    );
};

export default ProTable;
