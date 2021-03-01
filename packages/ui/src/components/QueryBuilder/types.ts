interface IActions {
    addQuery?: string | React.ReactNode;
    combine?: string | React.ReactNode;
    showLabels?: string | React.ReactNode;
    hideLabels?: string | React.ReactNode;
    clear?: string | React.ReactNode;
}

type TTranslation = (key: string) => string | React.ReactNode;
interface IQuery {
    noQuery?: string | React.ReactNode;
    facet: TTranslation;
}

export enum CombinerEnum {
    And = 'and',
    Or = 'or',
}

export type TCallbackRemoveAction = (f: IValueFilter) => void;
export type TOnChange = (id: string, query: ISqonGroupFilter | Record<string, never>) => void;

export interface IDictionary {
    actions?: IActions;
    query?: IQuery;
}

export type TFilterValue = Array<string | number | boolean>;
export interface IValueContent {
    field: string;
    value: TFilterValue;
}

export type TValueOp = 'in' | '>=' | '<=' | 'not in' | 'all' | 'between';
export interface IValueFilter {
    content: IValueContent;
    op: TValueOp;
}

export type TSqonGroupContent = IValueFilter[];
export type TSqonGroupOp = 'and' | 'or';
export interface ISqonGroupFilter {
    content: TSqonGroupContent;
    op: TSqonGroupOp;
}
