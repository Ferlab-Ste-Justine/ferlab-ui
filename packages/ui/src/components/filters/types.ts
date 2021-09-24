import { ReactNode } from 'react';
import { RangeOperators } from '../../data/sqon/operators';

export type onChangeType = (fg: IFilterGroup, f: IFilter[]) => void;

export interface IFilterRangeTypes {
    key: string;
    name: string | React.ReactNode;
}

export interface IFilterRange {
    max: number | undefined;
    min: number | undefined;
    operator?: string;
    rangeType?: string | undefined;
}

export interface IFilterText {
    text: string;
}

export interface IOperatorConfig {
    operator: RangeOperators;
    name: string | ReactNode;
    disableMin?: boolean;
    disableMax?: boolean;
}

export interface IFilterCheckboxConfig {
    nameMapping: {
        [field: string]: string;
    };
    withFooter?: boolean;
}

export interface IFilterRangeConfig {
    max: number | undefined;
    min: number | undefined;
    step?: number | string;
    operators?: IOperatorConfig[];
    rangeTypes?: IFilterRangeTypes[];
}

export interface IFilterTextInputConfig {
    label: string | ReactNode;
    placeholder: string;
    tooltip?: {
        text: string | ReactNode;
    };
    validateInput?: (text: string) => boolean;
}

export type TFilterGroupConfig = IFilterRangeConfig | IFilterTextInputConfig | IFilterCheckboxConfig;

export interface IFilterGroup<T extends TFilterGroupConfig = any> {
    field: string;
    config?: T;
    title: string | ReactNode;
    type: VisualType;
}

export interface IFilterCount {
    count: number;
    key: string;
}

export type TFilterData = IFilterCount | IFilterRange | IFilterText;

export interface IFilter<T extends TFilterData = any> {
    data: T;
    name: string;
    id: string; //  dash (-) separated key
}

export enum VisualType {
    Checkbox = 'checkbox',
    Toggle = 'toggle',
    Range = 'range',
    Text = 'text',
}

export interface IDictionary {
    actions?: IActions;
    messages?: IMessages;
    checkBox?: ICheckBox;
    range?: IRange;
    operators?: IOperators;
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
    unit?: string | ReactNode;
    is?: string | ReactNode;
}

export interface IOperators {
    between: string | ReactNode;
    lessThan: string | ReactNode;
    lessThanOfEqual: string | ReactNode;
    greaterThan: string | ReactNode;
    greaterThanOrEqual: string | ReactNode;
}
