import React from 'react';
import { ISyntheticSqon, IValueFilter } from '../../data/sqon/types';

export type ArrayTenOrMore<T> = {
    0: T;
    1: T;
    2: T;
    3: T;
    4: T;
    5: T;
    6: T;
    7: T;
    8: T;
    9: T;
    10: T;
} & Array<T>;

export enum CombinerEnum {
    And = 'and',
    Or = 'or',
}

export interface IQueriesState {
    activeId: string;
    queries: ISyntheticSqon[];
}

export interface ISavedFilter {
    id: string;
    title: string;
    default: boolean;
    filters: ISyntheticSqon[];
}

export interface IQueryBuilderHeaderConfigOptions {
    enableEditTitle: boolean;
    enableShare: boolean;
    enableDuplicate: boolean;
    enableDefaultFilter: boolean;
}

export interface IQueryBuilderHeaderConfig {
    showTools: boolean;
    showHeader: boolean;
    defaultTitle?: string | React.ReactNode;
    titleMaxLength?: number;
    options?: IQueryBuilderHeaderConfigOptions;
    savedFilters?: ISavedFilter[];
    selectedSavedFilter?: ISavedFilter | null;
    onSaveFilter: (filter: ISavedFilter) => void;
    onDeleteFilter: (filterId: string) => void;
}

export type TOnSavedFilterChange = (savedFilter: ISavedFilter) => void;
export type TCallbackRemoveAction = (f: IValueFilter, query: ISyntheticSqon | Record<string, never>) => void;
export type TCallbackRemoveReferenceAction = (refIndex: number, query: ISyntheticSqon | Record<string, never>) => void;
export type TOnChange = (id: string, query: ISyntheticSqon | Record<string, never>) => void;
export type TOnFacetClick = (field: string) => void;

// Dictionnary Types

interface IActions {
    addQuery?: string | React.ReactNode;
    combine?: string | React.ReactNode;
    labels?: string | React.ReactNode;
    clear?: IClearTranslation;
    delete?: IDeleteTranslation;
    new?: string | React.ReactNode;
    duplicate?: string | React.ReactNode;
    changeOperatorTo?: string | React.ReactNode;
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
    titleSelected?: string | React.ReactNode;
    cancel: string | React.ReactNode;
    confirm: string | React.ReactNode;
}

interface IFacetValueMapping {
    [facet: string]: {
        [value: string]: string;
    };
}

type TTranslation = (key: string) => string | React.ReactNode;
interface IQuery {
    combine?: ICombineTranslation;
    noQuery?: string | React.ReactNode;
    facet?: TTranslation;
    facetValueMapping?: IFacetValueMapping;
}

interface ICombineTranslation {
    and: string | React.ReactNode;
    or: string | React.ReactNode;
}

interface IPopupConfirmDictionary {
    title: string | React.ReactNode;
    okText: string | React.ReactNode;
    cancelText: string | React.ReactNode;
}

interface IInputDictionary {
    label: string | React.ReactNode;
    placeholder: string;
}

interface IQueryBuilderHeaderDictionnary {
    modal?: {
        edit?: IPopupConfirmDictionary & {
            input: IInputDictionary & {
                maximumLength: string | React.ReactNode;
            };
        };
        confirmUnsaved?: {
            title: string | React.ReactNode;
            openSavedFilter: {
                okText: string | React.ReactNode;
                cancelText: string | React.ReactNode;
                content: string | React.ReactNode;
            };
            createNewFilter: {
                okText: string | React.ReactNode;
                cancelText: string | React.ReactNode;
                content: string | React.ReactNode;
            };
        };
    };
    notification?: {
        savedTitle: string | React.ReactNode;
    };
    popupConfirm?: {
        delete: IPopupConfirmDictionary;
    };
    tooltips?: {
        newQueryBuilder: string | React.ReactNode;
        save: string | React.ReactNode;
        saveChanges: string | React.ReactNode;
        duplicateQueryBuilder: string | React.ReactNode;
        delete: string | React.ReactNode;
        share: string | React.ReactNode;
        setAsDefaultFilter: string | React.ReactNode;
        usetDefaultFilter: string | React.ReactNode;
        noSavedFilters: string | React.ReactNode;
    };
    myFiltersDropdown?: {
        title: string | React.ReactNode;
        manageMyFilter: string | React.ReactNode;
    };
}

export interface IDictionary {
    queryBuilderHeader?: IQueryBuilderHeaderDictionnary;
    actions?: IActions;
    query?: IQuery;
}
