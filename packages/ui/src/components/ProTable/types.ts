import React, { ReactNode } from 'react';
import { TableProps } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';

import { IQueryConfig, ISearchAfter, TQueryConfigCb } from '../../graphql/types';

import { PaginationViewPerQuery } from './Pagination/constants';

export enum PaginationDirection {
    Previous = 'previous',
    Next = 'next',
}

export interface IPaginationProps {
    current: number;
    setQueryConfig: TQueryConfigCb;
    queryConfig: IQueryConfig;
    defaultViewPerQuery?: PaginationViewPerQuery;
    searchAfter?: ISearchAfter;
    onPageChange: () => void;
    onShowSizeChange: () => void;
    onChange: (page: number, pageSize: number) => void;
    total: number;
    dictionary?: IProTableDictionary;
}

export interface IProTableDictionary {
    itemCount?: {
        noResults: React.ReactNode;
        results: React.ReactNode;
        of: React.ReactNode;
        selected: React.ReactNode;
        selectedPlural: React.ReactNode;
        selectAllResults: React.ReactNode;
        clear: React.ReactNode;
    };
    tooltips?: {
        tableExport: React.ReactNode;
    };
    columnSelector?: {
        reset: React.ReactNode;
        tooltips?: {
            columns: React.ReactNode;
        };
    };
    pagination?: {
        first: string;
        previous: string;
        next: string;
        view: string;
    };
    numberFormat?: (value: number) => React.ReactNode;
    table?: {
        emptyText: string;
    };
}

export interface ProColumnType<T = any> extends ColumnType<T> {
    key: string;
    title: string;
    icon?: React.ReactElement;
    iconTitle?: ReactNode;
    tooltip?: string;
    defaultHidden?: boolean;
}

export type ProColumnTypes<RecordType = unknown> = ProColumnGroupType<RecordType> | ProColumnType<RecordType>;

export type ProColumnsType<RecordType = unknown> = ProColumnTypes<RecordType>[];

export interface ProColumnGroupType<RecordType> extends Omit<ProColumnType<RecordType>, 'dataIndex'> {
    children: ProColumnsType<RecordType>;
}

export type TProTableProps<RecordType> = Omit<TableProps<RecordType>, 'columns' | 'pagination'> & {
    tableId: string;
    headerConfig: THeaderConfig<RecordType>;
    wrapperClassName?: string;
    columns: ProColumnsType<RecordType>;
    pagination?: IPaginationProps | TablePaginationConfig;
    initialColumnState?: TColumnStates;
    initialSelectedKey?: any[];
    dictionary?: IProTableDictionary;
    enableRowSelection?: boolean;
    onSelectionChange?: (selectedRows: RecordType[], selectedKeys: any[]) => void;
};

export type THeaderConfig<RecordType> = {
    marginBtm?: number;
    extraSpacing?: number;
    extra?: React.ReactNode[];
    enableTableExport?: boolean;
    enableColumnSort?: boolean;
    onSelectedRowsChange?: (selectedKeys: any[], selectedRows: RecordType[]) => void;
    onSelectAllResultsChange?: (selected: boolean) => void;
    onClearSelection?: () => void;
    onColumnSortChange?: (columns: TColumnStates) => void;
    onTableExportClick?: () => void;
    itemCount: {
        pageIndex: number;
        pageSize: number;
        total: number;
    };
};

export type TColumnStates = Array<{
    index: number;
    key: string;
    visible: boolean;
}>;

export type TColumnSettingChangeCb = <RecordType>(columns: ProColumnsType<RecordType>) => void;
