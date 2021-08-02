import { IN_OP, GTE_OP, LTE_OP, NOT_IN_OP, ALL_OP, BETWEEN_OP, AND_OP, OR_OP } from './operators';

export type TFilterValue = Array<string | number | boolean>;
export interface IValueContent {
    field: string;
    value: TFilterValue;
}

export type TValueOp =
    | typeof IN_OP
    | typeof GTE_OP
    | typeof LTE_OP
    | typeof NOT_IN_OP
    | typeof ALL_OP
    | typeof BETWEEN_OP;
export interface IValueFilter {
    content: IValueContent;
    op: TValueOp;
}

export type TSqonGroupOp = typeof AND_OP | typeof OR_OP;
export interface ISqonGroupFilter {
    op: TSqonGroupOp;
    content: Array<ISqonGroupFilter | IValueFilter>;
};

export interface ISyntheticSqon {
    op: TSqonGroupOp;
    content: Array<ISyntheticSqon | IValueFilter | number>;
    id?: string;
    total?: number;
};