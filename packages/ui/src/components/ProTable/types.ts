import { TableProps } from 'antd';
import { ColumnType } from 'antd/lib/table';
import React, { ReactNode } from 'react';

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
    numberFormat?: (value: number) => React.ReactNode;
}

export interface ProColumnType<T = any> extends ColumnType<T> {
    key: string;
    title: ReactNode;
    icon?: React.ReactElement;
    tooltip?: string;
    defaultHidden?: boolean;
}

export type TProTableProps<RecordType> = Omit<TableProps<RecordType>, 'columns'> & {
    tableId: string;
    headerConfig: THeaderConfig<RecordType>;
    wrapperClassName?: string;
    columns: ProColumnType<RecordType>[];
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

export type TColumnSettingChangeCb = <RecordType>(columns: ProColumnType<RecordType>) => void;
