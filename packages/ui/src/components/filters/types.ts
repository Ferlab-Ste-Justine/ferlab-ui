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
    actions: IActions;
    globalSearch: IGlobalSearch;
    messages: IMessages;
    checkBox: ICheckBox;
    range: IRange;
}

export interface IActions {
    all: string;
    apply: string;
    clear: string;
    less: string;
    more: string;
    none: string;
    searchPlaceholder: string;
}

export interface IGlobalSearch {
    infoTooltip: string;
    placeholder: string;
}

export interface ICheckBox {
    searchPlaceholder: string;
}

export interface IMessages {
    errorNoData: string;
    errorNotFound: string;
}

export interface IRange {
    max: string;
    min: string;
}