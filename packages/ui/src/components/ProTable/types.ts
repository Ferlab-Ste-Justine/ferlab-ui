import { ReactElement, ReactNode } from 'react';
import { TableProps } from 'antd';
import { PopoverProps } from 'antd';
import { ColumnType, TablePaginationConfig } from 'antd/lib/table';

import { IQueryConfig, ISearchAfter, TQueryConfigCb } from '../../graphql/types';

import { PaginationViewPerQuery } from './Pagination/constants';

export enum PaginationDirection {
    Previous = 'previous',
    Next = 'next',
}

export interface IPaginationProps {
    loading: boolean;
    current: number;
    setQueryConfig: TQueryConfigCb;
    queryConfig: IQueryConfig;
    defaultViewPerQuery?: PaginationViewPerQuery;
    onViewQueryChange?: (viewPerQuery: PaginationViewPerQuery) => void;
    searchAfter?: ISearchAfter;
    onPageChange: () => void;
    onShowSizeChange: () => void;
    onChange: (page: number, pageSize: number) => void;
    total: number;
    dictionary?: IProTableDictionary;
    customPagination?: number[];
}

export interface IProTableDictionary {
    itemCount?: {
        noResults: ReactNode;
        results: ReactNode;
        of: ReactNode;
        selected: ReactNode;
        selectedPlural: ReactNode;
        selectAllResults: ReactNode;
        clear: ReactNode;
    };
    tooltips?: {
        tableExport: ReactNode;
    };
    columnSelector?: {
        reset: ReactNode;
        tooltips?: {
            columns: ReactNode;
        };
    };
    pagination?: {
        first: string;
        previous: string;
        next: string;
        view: string;
    };
    numberFormat?: (value: number) => ReactNode;
    table?: {
        emptyText: string;
    };
}

export interface ProColumnType<T = any> extends ColumnType<T> {
    key: string;
    title: string;
    icon?: ReactElement;
    iconTitle?: ReactNode;
    tooltip?: ReactNode;
    popoverProps?: PopoverProps;
    defaultHidden?: boolean;
}

export type ProColumnTypes<RecordType = unknown> = ProColumnGroupType<RecordType> | ProColumnType<RecordType>;

export type ProColumnsType<RecordType = unknown> = ProColumnTypes<RecordType>[];

export interface ProColumnGroupType<RecordType> extends Omit<ProColumnType<RecordType>, 'dataIndex'> {
    children: ProColumnsType<RecordType>;
}

export type TPropsTablePropsExtra = {
    summary?: () => JSX.Element;
};

export type TProTableSummary = {
    index: number;
    value: any;
};

export type TProTableProps<RecordType> = Omit<TableProps<RecordType>, 'columns' | 'pagination' | 'summary'> & {
    tableId: string;
    headerConfig: THeaderConfig<RecordType>;
    wrapperClassName?: string;
    tableHeaderClassName?: string;
    columns: ProColumnsType<RecordType>;
    pagination?: IPaginationProps | TablePaginationConfig;
    initialColumnState?: TColumnStates;
    initialSelectedKey?: any[];
    dictionary?: IProTableDictionary;
    enableRowSelection?: boolean;
    onSelectionChange?: (selectedRows: RecordType[], selectedKeys: any[]) => void;
    summaryColumns?: TProTableSummary[];
    tableRef?: React.Ref<HTMLDivElement>;
};

export type THeaderConfig<RecordType> = {
    marginBtm?: number;
    extraSpacing?: number;
    extra?: ReactNode[];
    extraCountInfo?: ReactNode[];
    enableTableExport?: boolean;
    tableExportDisabled?: boolean;
    enableColumnSort?: boolean;
    onSelectedRowsChange?: (selectedKeys: any[], selectedRows: RecordType[]) => void;
    onSelectAllResultsChange?: (selected: boolean) => void;
    onClearSelection?: () => void;
    onColumnSortChange?: (columns: TColumnStates) => void;
    onTableExportClick?: () => void;
    itemCount?: {
        pageIndex: number;
        pageSize: number;
        total: number;
    };
    hideItemsCount?: boolean;
};

export type TColumnStates = Array<{
    index: number;
    key: string;
    visible: boolean;
}>;

export type TColumnSettingChangeCb = <RecordType>(columns: ProColumnsType<RecordType>) => void;
