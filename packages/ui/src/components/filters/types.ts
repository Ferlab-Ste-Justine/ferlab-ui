import { ReactNode } from 'react';

import { RangeOperators, TermOperators } from '../../data/sqon/operators';

export type onChangeType<IFilterType extends TFilterData = any> = (fg: IFilterGroup, f: IFilter<IFilterType>[]) => void;
export type onIsOpenChange = (isOpen: boolean) => void;
export type onSearchVisibleChange = (isVisible: boolean) => void;

export interface IFilterRangeTypes {
    key: string;
    name: string | React.ReactNode;
}

export interface IFilterRange {
    max: number | undefined;
    min: number | undefined;
    noDataSelected?: boolean;
    operator: RangeOperators;
    rangeType?: string | undefined;
}

export interface IFilterText {
    text: string;
}

export interface IRangeOperatorConfig {
    operator: RangeOperators;
    name: ReactNode;
    disableMin?: boolean;
    disableMax?: boolean;
}

export interface IFilterCheckboxConfig {
    nameMapping?: {
        [field: string]: string;
    };
    showMoreReadOnly?: boolean;
    showSelectAll?: boolean;
    withFooter?: boolean;
    extraFilterDictionary?: string[];
    facetTranslate?: (value: string) => string;
}

export interface IFilterRangeConfig {
    max: number | undefined;
    min: number | undefined;
    step?: number | string;
    operators?: IRangeOperatorConfig[];
    rangeTypes?: IFilterRangeTypes[];
    defaultOperator?: RangeOperators;
}

export interface IFilterTextInputConfig {
    label: ReactNode;
    placeholder: string;
    tooltip?: {
        text: ReactNode;
    };
    validateInput?: (text: string) => boolean;
}

export type TFilterGroupConfig = IFilterRangeConfig | IFilterTextInputConfig | IFilterCheckboxConfig;

export interface IFilterGroup<T extends TFilterGroupConfig = any> {
    field: string;
    config?: T;
    title: ReactNode;
    type: VisualType;
    headerTooltip?: string;
}

export interface IFilterCount {
    count: number;
    key: string;
    operator?: TermOperators;
}

export type TFilterData = IFilterCount | IFilterRange | IFilterText;

export interface IFilter<T extends TFilterData = any> {
    data: T;
    name: ReactNode;
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

export type IFacetDictionary = {
    [key: string]: any;
};

export interface IActions {
    all: ReactNode;
    apply: ReactNode;
    clear: ReactNode;
    less: ReactNode;
    more: ReactNode;
    none: ReactNode;
    dictionary: ReactNode;
}

export interface ICheckBox {
    searchPlaceholder: ReactNode;
    noData: ReactNode;
}

export interface IMessages {
    errorNoData: ReactNode;
}

export interface IRange {
    max: ReactNode;
    min: ReactNode;
    unit?: ReactNode;
    is?: ReactNode;
    noData: ReactNode;
}

export interface IOperators {
    between?: ReactNode;
    lessThan?: ReactNode;
    lessThanOfEqual?: ReactNode;
    greaterThan?: ReactNode;
    greaterThanOrEqual?: ReactNode;
    allOf?: ReactNode;
    anyOf?: ReactNode;
    noneOf?: ReactNode;
}

export type TExtendedMapping = {
    active: boolean;
    displayName: string;
    isArray: boolean;
    type: string;
    field: string;
    rangeStep?: number;
};

export type IRangeAggs = {
    stats: {
        max: number;
        min: number;
    };
};
