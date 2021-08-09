import React from 'react';
import { ISyntheticSqon, IValueFilter } from '../../data/sqon/types';

interface IActions {
    addQuery?: string | React.ReactNode;
    combine?: string | React.ReactNode;
    labels?: string | React.ReactNode;
    delete?: IDeleteTranslation;
    clear?: IClearTranslation;
    changeOperatorTo: string | React.ReactNode;
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
    and: string | React.ReactNode;
    or: string | React.ReactNode;
}

export type ArrayTenOrMore<T> = {
    0: T
    1: T
    2: T
    3: T
    4: T
    5: T
    6: T
    7: T
    8: T
    9: T
    10: T
} & Array<T>

export enum CombinerEnum {
    And = 'and',
    Or = 'or',
}

export type TCallbackRemoveAction = (f: IValueFilter, query: ISyntheticSqon| Record<string, never>) => void;
export type TCallbackRemoveReferenceAction = (refIndex: number, query: ISyntheticSqon | Record<string, never>) => void;
export type TOnChange = (id: string, query: ISyntheticSqon | Record<string, never>) => void;

export interface IDictionary {
    actions?: IActions;
    query?: IQuery;
}
