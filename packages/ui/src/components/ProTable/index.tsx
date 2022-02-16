import React from 'react';
import { Button, Space, Table, Tooltip } from 'antd';
import ColumnSelector from './ColumnSelector';
import TableHeader from './Header';
import { useState } from 'react';
import { ProColumnType, TColumnStates, TProTableProps } from './types';
import { DownloadOutlined } from '@ant-design/icons';
import cx from 'classnames';

import styles from '@ferlab/style/components/protable/ProTable.module.scss';

export const generateColumnState = <RecordType,>(initialState: TColumnStates, columns: ProColumnType<RecordType>[]) => {
    let state: TColumnStates = initialState || [];
    columns.forEach((column, index) => {
        if (!state.find(({ key }) => key === column.key)) {
            state = [
                ...state,
                {
                    index,
                    key: column.key,
                    visible: !column.defaultHidden,
                },
            ];
        }
    });

    return state.filter(({ key }) => columns.find(({ key: colKey }) => colKey === key));
};

const ProTable = <RecordType extends object & { key: string } = any>({
    tableId,
    columns,
    wrapperClassName = '',
    headerConfig = {
        marginBtm: 12,
        extraSpacing: 12,
        extra: [],
        enableColumnSort: false,
        onColumnSortChange: () => {},
        enableTableExport: false,
        onTableExportClick: () => {},
        itemCount: {
            pageIndex: 1,
            pageSize: 15,
            total: 0,
        },
        onSelectedRowsChange: () => {},
        onSelectAllResultsChange: () => {},
        onClearSelection: () => {},
    },
    enableRowSelection = false,
    initialColumnState,
    dictionary = {},
    onSelectionChange,
    ...tableProps
}: TProTableProps<RecordType>) => {
    const [columnsState, setColumnsState] = useState<TColumnStates>(generateColumnState(initialColumnState!, columns));
    const [selectedAllResults, setSelectedAllResults] = useState(false);
    const [selectedAllPage, setSelectedAllPage] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const getTotalResults = () =>
        tableProps.pagination
            ? tableProps.pagination.total || tableProps.dataSource?.length
            : tableProps.dataSource?.length;

    const handleOnSelectAllResultsChange = (selected: boolean) => {
        if (headerConfig.onSelectAllResultsChange) {
            headerConfig.onSelectAllResultsChange(selected);
        }
        setSelectedAllResults(selected);
    };

    const handleOnSelectRowsChange = (selectedKeys: any[], selectedRows: RecordType[]) => {
        if (headerConfig.onSelectedRowsChange) {
            headerConfig.onSelectedRowsChange(selectedKeys, selectedRows);
        }
        setSelectedRowKeys(selectedKeys);
    };

    const getExtraConfig = () => {
        let customExtra = headerConfig.extra || [];

        if (headerConfig.enableTableExport) {
            customExtra = customExtra.concat(
                <Tooltip title={dictionary.tooltips?.tableExport || 'Export as TSV'}>
                    <Button
                        key="table-export"
                        size="small"
                        type="text"
                        icon={<DownloadOutlined />}
                        onClick={() => {
                            if (headerConfig.onTableExportClick) {
                                headerConfig.onTableExportClick();
                            }
                        }}
                    />
                </Tooltip>,
            );
        }

        if (headerConfig.enableColumnSort) {
            customExtra = customExtra.concat(
                <ColumnSelector
                    key="column-selector"
                    columns={columns}
                    columnStates={columnsState}
                    onChange={(newColumnState) => {
                        setColumnsState(newColumnState);
                        if (headerConfig.onColumnSortChange) {
                            headerConfig.onColumnSortChange(newColumnState);
                        }
                    }}
                    dictionary={dictionary}
                />,
            );
        }

        return customExtra;
    };

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
                selectedAllResults={selectedAllResults}
                selectedAllPage={selectedAllPage}
                selectedRowCount={selectedAllResults ? getTotalResults() : selectedRowKeys.length}
                onSelectAllResults={() => {
                    handleOnSelectAllResultsChange(true);
                    setSelectedAllPage(false);
                }}
                onClearSelection={() => {
                    if (headerConfig.onClearSelection) {
                        headerConfig.onClearSelection();
                    }
                    handleOnSelectRowsChange([], []);
                    handleOnSelectAllResultsChange(false);
                }}
                extraSpacing={headerConfig.extraSpacing!}
                extra={getExtraConfig()}
                dictionary={dictionary}
            />
            <Table
                {...tableProps}
                rowSelection={
                    tableProps.rowSelection || enableRowSelection
                        ? {
                              ...tableProps.rowSelection,
                              preserveSelectedRowKeys: true,
                              selectedRowKeys: selectedRowKeys,
                              onChange: (selectedRowKeys, selectedRows) => {
                                  if (!selectedRowKeys.length) {
                                      handleOnSelectAllResultsChange(false);
                                  }

                                  handleOnSelectRowsChange(selectedRowKeys, selectedRows);

                                  if (tableProps.rowSelection?.onChange) {
                                      tableProps.rowSelection.onChange(selectedRowKeys, selectedRows);
                                  }
                              },
                              onSelectAll: setSelectedAllPage, // Deprecated will need to change eventually
                              onSelect: (_, selected, selectedRows, event) => {
                                  setSelectedAllPage(false);

                                  if (tableProps.rowSelection?.onSelect) {
                                      tableProps.rowSelection.onSelect(_, selected, selectedRows, event);
                                  }
                              },
                          }
                        : undefined
                }
                pagination={
                    tableProps.pagination
                        ? {
                              ...tableProps.pagination,
                              onChange: (page, size) => {
                                  if (selectedAllResults) {
                                      handleOnSelectRowsChange([], []);
                                      handleOnSelectAllResultsChange(false);
                                  }

                                  setCurrentPage(page);

                                  if (tableProps.pagination && tableProps.pagination.onChange) {
                                      tableProps.pagination.onChange(page, size);
                                  }
                              },
                              onShowSizeChange: (current, size) => {
                                  handleOnSelectRowsChange([], []);

                                  if (tableProps.pagination && tableProps.pagination.onShowSizeChange) {
                                      tableProps.pagination.onShowSizeChange(current, size);
                                  }
                              },
                          }
                        : false
                }
                columns={columnsState
                    .filter(({ visible }) => visible)
                    .sort((a, b) => a.index - b.index)
                    .map(({ key }) => columns.find((column) => column.key === key)!)}
            ></Table>
        </Space>
    );
};

export default ProTable;
