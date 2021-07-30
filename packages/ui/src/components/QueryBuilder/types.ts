interface IActions {
    addQuery?: string | React.ReactNode;
    combine?: string | React.ReactNode;
    labels?: string | React.ReactNode;
    delete?: IDeleteTranslation;
    clear?: IClearTranslation;
}

interface IClearTranslation {
    title: string | React.ReactNode;
    cancel: string | React.ReactNode;
    confirm: string | React.ReactNode;
    buttonTitle: string | React.ReactNode;
    description: string | React.ReactNode;
}
interface IDeleteTranslation {
    title: string | React.ReactNode;
    cancel: string | React.ReactNode;
    confirm: string | React.ReactNode;
}

type TTranslation = (key: string) => string | React.ReactNode;
interface IQuery {
    combine?: ICombineTranslation;
    noQuery?: string | React.ReactNode;
    facet: TTranslation;
}

interface ICombineTranslation {
    intersection: string | React.ReactNode;
    union: string | React.ReactNode;
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
