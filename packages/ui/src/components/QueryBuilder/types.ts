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

export interface IQueryBuilderState {
    state?: ISyntheticSqon[];
    active?: string;
}

export interface IQueriesState {
    activeId: string;
    queries: ISyntheticSqon[];
}

export interface ISavedFilter {
    id: string;
    title: string;
    favorite: boolean;
    queries: ISyntheticSqon[];
}

export interface IQueryBuilderHeaderConfigOptions {
    enableEditTitle?: boolean;
    enableShare?: boolean;
    enableDuplicate?: boolean;
    enableFavoriteFilter?: boolean;
}

export interface IQueryBuilderHeaderConfig {
    showTools: boolean;
    showHeader: boolean;
    defaultTitle?: string;
    titleMaxLength?: number;
    options?: IQueryBuilderHeaderConfigOptions;
    savedFilters?: ISavedFilter[];
    selectedSavedFilter?: ISavedFilter | null;
    onSetAsFavorite?: (filter: ISavedFilter) => void;
    onUpdateFilter?: (filter: ISavedFilter) => void;
    onShareFilter?: (filter: ISavedFilter) => void;
    onSaveFilter?: (filter: ISavedFilter) => void;
    onDeleteFilter?: (filterId: string) => void;
}

export type TOnSavedFilterChange = (savedFilter: ISavedFilter) => void;
export type TCallbackRemoveAction = (f: IValueFilter, query: ISyntheticSqon | Record<string, never>) => void;
export type TCallbackRemoveReferenceAction = (refIndex: number, query: ISyntheticSqon | Record<string, never>) => void;
export type TOnChange = (id: string, query: ISyntheticSqon | Record<string, never>) => void;
export type TOnFacetClick = (filter: IValueFilter) => void;

// Dictionnary Types

interface IActions {
    addQuery?: React.ReactNode;
    combine?: React.ReactNode;
    labels?: React.ReactNode;
    clear?: IClearTranslation;
    delete?: IDeleteTranslation;
    new?: React.ReactNode;
    duplicate?: React.ReactNode;
    changeOperatorTo?: React.ReactNode;
}

interface IClearTranslation {
    title: React.ReactNode;
    cancel: React.ReactNode;
    confirm: React.ReactNode;
    buttonTitle: React.ReactNode;
    description: React.ReactNode;
}

interface IDeleteTranslation {
    title: React.ReactNode;
    titleSelected?: React.ReactNode;
    cancel: React.ReactNode;
    confirm: React.ReactNode;
}

interface IFacetValueMapping {
    [facet: string]: {
        [value: string]: string;
    };
}

type TTranslation = (key: string) => React.ReactNode;
interface IQuery {
    combine?: ICombineTranslation;
    noQuery?: React.ReactNode;
    facet?: TTranslation;
    facetValueMapping?: IFacetValueMapping;
}

interface ICombineTranslation {
    and: React.ReactNode;
    or: React.ReactNode;
}

interface IPopupConfirmDictionary {
    title: React.ReactNode;
    okText: React.ReactNode;
    cancelText: React.ReactNode;
    content: React.ReactNode;
}

interface IInputDictionary {
    label: React.ReactNode;
    placeholder: string;
}

export interface IFacetFilterConfig {
    enable: boolean;
    selectedFilterContent?: React.ReactElement;
    onFacetClick: TOnFacetClick;
    blacklistedFacets?: Array<string>;
}

interface IQueryBuilderHeaderDictionnary {
    modal?: {
        edit?: IPopupConfirmDictionary & {
            input: IInputDictionary & {
                maximumLength: React.ReactNode;
            };
        };
        confirmUnsaved?: {
            title: React.ReactNode;
            openSavedFilter: {
                okText: React.ReactNode;
                cancelText: React.ReactNode;
                content: React.ReactNode;
            };
            createNewFilter: {
                okText: React.ReactNode;
                cancelText: React.ReactNode;
                content: React.ReactNode;
            };
        };
    };
    form?: {
        error?: {
            fieldRequired: React.ReactNode;
        };
    };
    notification?: {
        savedTitle: React.ReactNode;
    };
    popupConfirm?: {
        delete: IPopupConfirmDictionary;
    };
    tooltips?: {
        newQueryBuilder: React.ReactNode;
        save: React.ReactNode;
        saveChanges: React.ReactNode;
        duplicateQueryBuilder: React.ReactNode;
        delete: React.ReactNode;
        share: React.ReactNode;
        setAsDefaultFilter: React.ReactNode;
        usetDefaultFilter: React.ReactNode;
        noSavedFilters: React.ReactNode;
    };
    myFiltersDropdown?: {
        title: React.ReactNode;
        manageMyFilter: React.ReactNode;
    };
    duplicateFilterTitleSuffix?: string;
}

export interface IDictionary {
    queryBuilderHeader?: IQueryBuilderHeaderDictionnary;
    actions?: IActions;
    query?: IQuery;
}
