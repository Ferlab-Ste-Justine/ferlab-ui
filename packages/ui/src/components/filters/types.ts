import { ReactNode } from 'react';

export type onChangeType = (fg: IFilterGroup, f: IFilter[]) => void;

export interface IFilterRangeTypes {
    key: string;
    name: string | React.ReactNode;
}

export interface IFilterRange {
    max: number | undefined;
    min: number | undefined;
    rangeType: string | undefined;
}

export interface IFilterRangeConfig {
    max: number | undefined;
    min: number | undefined;
    rangeTypes: IFilterRangeTypes[];
}

export type TFilterGroupConfig = IFilterRangeConfig;

export interface IFilterGroup {
    field: string;
    config?: TFilterGroupConfig;
    title: string | ReactNode;
    type: VisualType;
}

export interface IFilterCount {
    count: number;
    key: string;
}

export type TFilterData = IFilterCount | IFilterRange;

export interface IFilter<T extends TFilterData = any> {
    data: T;
    name: string | ReactNode;
    id: string; //  dash (-) separated key
}

export enum VisualType {
    Checkbox = 'checkbox',
    Toggle = 'toggle',
    Range = 'range',
}

export interface IDictionary {
    actions?: IActions;
    messages?: IMessages;
    checkBox?: ICheckBox;
    range?: IRange;
}

export interface IActions {
    all: string | ReactNode;
    apply: string | ReactNode;
    clear: string | ReactNode;
    less: string | ReactNode;
    more: string | ReactNode;
    none: string | ReactNode;
}

export interface ICheckBox {
    searchPlaceholder: string | ReactNode;
}

export interface IMessages {
    errorNoData: string | ReactNode;
}

export interface IRange {
    max: string | ReactNode;
    min: string | ReactNode;
}
