import React from 'react';
import { Space, Table } from 'antd';
import ColumnSelector from './ColumnSelector';
import TableHeader from './Header';
import { useState } from 'react';
import { ProColumnType, TColumnStates, TProTableProps } from './types';
import cx from 'classnames';

import styles from '@ferlab/style/components/protable/ProTable.module.scss';

export const generateColumnState = <RecordType,>(initialState: TColumnStates, columns: ProColumnType<RecordType>[]) => {
    let state: TColumnStates = initialState || [];
    columns.forEach((column, index) => {
        if (!state.find(({ key }) => key === column.key)) {
            state.push({
                index,
                key: column.key,
                visible: !column.defaultHidden,
            });
        }
    });
    return state;
};

const ProTable = <RecordType extends object = any>({
    tableId,
    columns,
    wrapperClassName = '',
    headerConfig = {
        marginBtm: 12,
        extraSpacing: 8,
        extra: [],
        columnSetting: false,
        itemCount: {
            pageIndex: 1,
            pageSize: 15,
            total: 0,
            selectedRowCount: 0,
        },
        onClearSelection: () => {},
        onColumnStateChange: () => {},
    },
    initialColumnState,
    dictionary = {},
    ...tableProps
}: TProTableProps<RecordType>) => {
    const [columnsState, setColumnsState] = useState<TColumnStates>(generateColumnState(initialColumnState!, columns));

    return (
        <Space
            size={headerConfig.marginBtm}
            direction="vertical"
            className={cx(styles.ProTableWrapper, wrapperClassName)}
        >
            <TableHeader
                pageIndex={headerConfig.itemCount?.pageIndex}
                pageSize={headerConfig.itemCount?.pageSize}
                total={headerConfig.itemCount?.total}
                selectedRowCount={headerConfig.itemCount?.selectedRowCount}
                onClearSelection={headerConfig.onClearSelection}
                extraSpacing={headerConfig.extraSpacing}
                extra={(headerConfig.extra || []).concat(
                    headerConfig.columnSetting ? (
                        <ColumnSelector
                            key="column-selector"
                            columns={columns}
                            columnStates={columnsState}
                            onChange={(newColumnState) => {
                                setColumnsState(newColumnState);
                                if (headerConfig.onColumnStateChange) {
                                    headerConfig.onColumnStateChange(newColumnState);
                                }
                            }}
                            dictionary={dictionary}
                        />
                    ) : (
                        []
                    ),
                )}
                dictionary={dictionary}
            />
            <Table
                {...tableProps}
                columns={columnsState
                    .filter(({ visible }) => visible)
                    .sort((a, b) => a.index - b.index)
                    .map(({ key }) => columns.find((column) => column.key === key)!)}
            ></Table>
        </Space>
    );
};

export default ProTable;
