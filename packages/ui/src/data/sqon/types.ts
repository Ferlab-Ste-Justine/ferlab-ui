import { FieldOperators, BooleanOperators } from './operators';

export type TFilterValue = Array<string | number | boolean>;
export interface IValueContent {
    field: string;
    value: TFilterValue;
    index?: string;
}

export type TValueOp = FieldOperators | string;
export interface IValueFilter {
    content: IValueContent;
    op: TValueOp;
}

export type TSqonGroupOp = BooleanOperators | string;
export type TSqonContentValue = ISqonGroupFilter | IValueFilter;
export type TSqonContent = Array<TSqonContentValue>;
export interface ISqonGroupFilter {
    op: TSqonGroupOp;
    content: TSqonContent;
}

export type TSyntheticSqonContentValue = ISqonGroupFilter | IValueFilter | number;
export type TSyntheticSqonContent = Array<TSyntheticSqonContentValue>;
export interface ISyntheticSqon {
    op: TSqonGroupOp;
    content: TSyntheticSqonContent;
    id?: string;
    total?: number;
}
