import React, { useEffect, useState } from 'react';
import { DownloadOutlined } from '@ant-design/icons';
import { Button, Space, Table, Tooltip } from 'antd';
import cx from 'classnames';
import { isEmpty } from 'lodash';

import Empty from '../Empty';

import ColumnSelector from './ColumnSelector';
import TableHeader from './Header';
import Pagination from './Pagination';
import {
    IPaginationProps,
    ProColumnGroupType,
    ProColumnsType,
    ProColumnType,
    ProColumnTypes,
    TColumnStates,
    TPropsTablePropsExtra,
    TProTableProps,
} from './types';

import styles from '@ferlab/style/components/protable/ProTable.module.scss';

type staticTable = {
    left: TColumnStates;
    dynamic: TColumnStates;
    right: TColumnStates;
};

export const generateColumnState = <RecordType,>(
    initialState: TColumnStates,
    columns: ProColumnsType<RecordType>,
): staticTable => {
    const leftState: TColumnStates = [];
    let dynamicState: TColumnStates = initialState || [];
    const rightState: TColumnStates = [];
    let leftIndex = 0;
    let dynamicIndex = columns.length;
    let rightIndex = columns.length * 2;

    columns.forEach((column) => {
        if (column.fixed === 'left') {
            leftState.push({
                index: leftIndex++,
                key: column.key,
                visible: !column.defaultHidden,
            });
        } else if (column.fixed === 'right') {
            rightState.push({
                index: rightIndex++,
                key: column.key,
                visible: !column.defaultHidden,
            });
        } else if (!dynamicState.find(({ key }) => key === column.key)) {
            dynamicState = [
                ...dynamicState,
                {
                    index: dynamicIndex++,
                    key: column.key,
                    visible: !column.defaultHidden,
                },
            ];
        }
    });

    return {
        dynamic: dynamicState.filter(({ key }) => columns.find(({ key: colKey }) => colKey === key)),
        left: leftState,
        right: rightState,
    };
};

const ProTable = <RecordType extends object & { key: string } = any>({
    tableId,
    columns,
    pagination,
    wrapperClassName = '',
    tableHeaderClassName,
    headerConfig = {
        enableColumnSort: false,
        enableTableExport: false,
        extra: [],
        extraSpacing: 12,
        itemCount: {
            pageIndex: 1,
            pageSize: 15,
            total: 0,
        },
        marginBtm: 12,
        onClearSelection: () => {},
        onColumnSortChange: () => {},
        onSelectAllResultsChange: () => {},
        onSelectedRowsChange: () => {},
        onTableExportClick: () => {},
    },
    initialSelectedKey = [],
    enableRowSelection = false,
    initialColumnState,
    dictionary = {},
    summaryColumns,
    onSelectionChange,
    ...tableProps
}: TProTableProps<RecordType>) : React.ReactElement => {
    const [leftColumnsState, setLeftColumnsState] = useState<TColumnStates>(
        generateColumnState(initialColumnState!, columns).left,
    );
    const [columnsState, setColumnsState] = useState<TColumnStates>(
        generateColumnState(initialColumnState!, columns).dynamic,
    );
    const [rightColumnsState, setRightColumnsState] = useState<TColumnStates>(
        generateColumnState(initialColumnState!, columns).right,
    );
    const [selectedAllResults, setSelectedAllResults] = useState(false);
    const [selectedAllPage, setSelectedAllPage] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>(initialSelectedKey);

    useEffect(() => {
        setColumnsState(generateColumnState(initialColumnState!, columns).dynamic);
    }, [columns]);

    useEffect(() => {
        setSelectedRowKeys(initialSelectedKey);
    }, [JSON.stringify(initialSelectedKey)]);

    const getTotalResults = () =>
        pagination ? headerConfig.itemCount?.total || tableProps.dataSource?.length : tableProps.dataSource?.length;

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
                        icon={<DownloadOutlined />}
                        key="table-export"
                        onClick={() => {
                            if (headerConfig.onTableExportClick) {
                                headerConfig.onTableExportClick();
                            }
                        }}
                        size="small"
                        type="text"
                    />
                </Tooltip>,
            );
        }

        if (headerConfig.enableColumnSort) {
            customExtra = customExtra.concat(
                <ColumnSelector
                    columnStates={columnsState}
                    columns={columns}
                    dictionary={dictionary}
                    key="column-selector"
                    onChange={(newColumnState) => {
                        setColumnsState(newColumnState);
                        if (headerConfig.onColumnSortChange) {
                            headerConfig.onColumnSortChange(newColumnState);
                        }
                    }}
                />,
            );
        }

        return customExtra;
    };

    const getTitleByType = (column: ProColumnType) => {
        const titleToUse = column.iconTitle ? column.iconTitle : column.title;
        let title = column.tooltip ? (
            <span
                style={{
                    borderBottom: '1px dotted',
                }}
            >
                {titleToUse}
            </span>
        ) : (
            titleToUse
        );

        title =
            column.icon && !column.iconTitle ? (
                <Space size={3}>
                    {column.icon} {title}
                </Space>
            ) : (
                title
            );

        title = column.tooltip ? <Tooltip title={column.tooltip}>{title}</Tooltip> : title;
        return title;
    };

    const generateColumnTitle = (column: ProColumnTypes<RecordType>) => {
        const title = getTitleByType(column);
        const asColumnGroup = column as ProColumnGroupType<RecordType>;

        if (asColumnGroup.children) {
            const children = asColumnGroup.children.map((subColumn: ProColumnType) => {
                const subTitle = getTitleByType(subColumn);
                return { ...subColumn, title: subTitle };
            });

            return { ...column, children, title };
        }
        return { ...column, title };
    };

    const tablePropsExtra: TPropsTablePropsExtra = {};
    if (summaryColumns) {
        tablePropsExtra.summary = () => (
            <Table.Summary>
                <Table.Summary.Row className={styles.row}>
                    {summaryColumns.map((e) => (
                        <Table.Summary.Cell className={styles.cell} index={e.index} key={e.index}>
                            {e.value}
                        </Table.Summary.Cell>
                    ))}
                </Table.Summary.Row>
            </Table.Summary>
        );
    }

    return (
        <Space
            className={cx(styles.ProTableWrapper, wrapperClassName)}
            direction="vertical"
            size={headerConfig.marginBtm}
        >
            <TableHeader
                className={tableHeaderClassName}
                dictionary={dictionary}
                extra={getExtraConfig()}
                extraSpacing={headerConfig.extraSpacing!}
                hideItemsCount={headerConfig.hideItemsCount}
                onClearSelection={() => {
                    if (headerConfig.onClearSelection) {
                        headerConfig.onClearSelection();
                    }
                    handleOnSelectRowsChange([], []);
                    handleOnSelectAllResultsChange(false);
                }}
                onSelectAllResults={() => {
                    handleOnSelectAllResultsChange(true);
                    setSelectedAllPage(false);
                }}
                pageIndex={headerConfig.itemCount?.pageIndex || 0}
                pageSize={headerConfig.itemCount?.pageSize || 0}
                selectedAllPage={selectedAllPage && selectedRowKeys.length < (headerConfig.itemCount?.total || 0)}
                selectedAllResults={selectedAllResults}
                selectedRowCount={selectedAllResults ? getTotalResults() : selectedRowKeys.length}
                total={headerConfig.itemCount?.total || 0}
            />
            <Table
                {...tableProps}
                {...tablePropsExtra}
                columns={leftColumnsState
                    .concat(columnsState, rightColumnsState)
                    .filter(({ visible }) => visible)
                    .sort((a, b) => a.index - b.index)
                    .map(({ key }) => columns.find((column) => column.key === key)!)
                    .filter((column) => !isEmpty(column))
                    .map(generateColumnTitle)}
                locale={{
                    emptyText: <Empty description={dictionary.table?.emptyText || 'No available data'} size="mini" />,
                }}
                pagination={
                    pagination && (pagination as IPaginationProps)?.searchAfter === undefined
                        ? {
                              ...pagination,
                              onChange: (page, size) => {
                                  if (selectedAllResults) {
                                      handleOnSelectRowsChange([], []);
                                      handleOnSelectAllResultsChange(false);
                                  }

                                  if (pagination.onChange) {
                                      pagination?.onChange(page, size);
                                  }
                              },
                              onShowSizeChange: (current, size) => {
                                  handleOnSelectRowsChange([], []);

                                  if (pagination.onShowSizeChange) {
                                      pagination.onShowSizeChange(current, size);
                                  }
                              },
                          }
                        : false
                }
                rowSelection={
                    tableProps.rowSelection || enableRowSelection
                        ? {
                              ...tableProps.rowSelection,
                              onChange: (selectedRowKeys, selectedRows) => {
                                  if (!selectedRowKeys.length) {
                                      handleOnSelectAllResultsChange(false);
                                  }

                                  handleOnSelectRowsChange(selectedRowKeys, selectedRows);

                                  if (tableProps.rowSelection?.onChange) {
                                      // @ts-ignore
                                      tableProps.rowSelection.onChange(selectedRowKeys, selectedRows);
                                  }
                              },
                              // Deprecated will need to change eventually
                              onSelect: (_, selected, selectedRows, event) => {
                                  setSelectedAllPage(false);

                                  if (tableProps.rowSelection?.onSelect) {
                                      tableProps.rowSelection.onSelect(_, selected, selectedRows, event);
                                  }
                              },

                              onSelectAll: setSelectedAllPage,

                              preserveSelectedRowKeys: true,
                              selectedRowKeys: selectedRowKeys,
                          }
                        : undefined
                }
            ></Table>
            {(pagination as IPaginationProps)?.searchAfter && (
                <Pagination
                    {...(pagination as IPaginationProps)}
                    dictionary={dictionary}
                    onPageChange={() => {
                        if (selectedAllResults) {
                            handleOnSelectRowsChange([], []);
                            handleOnSelectAllResultsChange(false);
                        }
                    }}
                    onShowSizeChange={() => {
                        handleOnSelectRowsChange([], []);
                    }}
                    total={tableProps.dataSource?.length || headerConfig.itemCount?.total || 0}
                />
            )}
        </Space>
    );
};

export default ProTable;
