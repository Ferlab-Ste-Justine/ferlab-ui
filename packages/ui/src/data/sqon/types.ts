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

/**
 * Strategy to use to merge the values of the field.
 */
export enum MERGE_VALUES_STRATEGIES {
    /**
     * Defaults to `OVERRIDE_VALUES`
     */
    DEFAULT = 'OVERRIDE_VALUES',
    /**
     * Replaces existing values with provided ones
     */
    OVERRIDE_VALUES = 'OVERRIDE_VALUES',
    /**
     * Append provided values to existing ones
     */
    APPEND_VALUES = 'APPEND_VALUES',
}

/**
 * Strategy to use to merge the operator of the field.
 */
export enum MERGE_OPERATOR_STRATEGIES {
    /**
     * Defaults to `OVERRIDE_OPERATOR`
     */
    DEFAULT = 'OVERRIDE_OPERATOR',
    /**
     * Replaces existing operator with provided one
     */
    OVERRIDE_OPERATOR = 'OVERRIDE_OPERATOR',
    /**
     * Keep the current operator.
     * The one provided will be used if the field is not found.
     */
    KEEP_OPERATOR = 'KEEP_OPERATOR',
}

export interface IMergeOptions {
    values: MERGE_VALUES_STRATEGIES;
    operator: MERGE_OPERATOR_STRATEGIES;
}
