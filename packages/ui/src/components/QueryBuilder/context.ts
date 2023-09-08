import { createContext } from 'react';

import {
    ICustomPillConfig,
    IDictionary,
    IFacetFilterConfig,
    IQueriesState,
    IQueryBuilderHeaderConfig,
    ISavedFilter,
} from './types';

export type TQueryBuilderContextType = {
    queryBuilderId: string;
    queriesState: IQueriesState;
    selectedSavedFilter: ISavedFilter | null;
    headerConfig: IQueryBuilderHeaderConfig;
    noQueries: boolean;
    canCombine: boolean;
    enableCombine: boolean;
    enableShowHideLabels: boolean;
    enableSingleQuery: boolean;
    hasEmptyQuery: boolean;
    customPillConfig: ICustomPillConfig;
};

export type TQueryCommonContext = {
    dictionary: IDictionary;
    facetFilterConfig: IFacetFilterConfig;
    showLabels: boolean;
};

export const defaultHeaderConfig = {
    defaultTitle: 'Untitled Filter',
    onDeleteFilter: () => {},
    onSaveFilter: () => {},
    onSetAsFavorite: () => {},
    onShareFilter: () => {},
    onUpdateFilter: () => {},
    options: {
        enableDuplicate: true,
        enableEditTitle: true,
        enableFavoriteFilter: false,
        enableShare: false,
        enableUndoChanges: false,
    },
    savedFilters: [],
    selectedSavedFilter: null,
    showHeader: false,
    showTools: false,
};

export const defaultFacetFilterConfig = {
    blacklistedFacets: [],
    enable: false,
    onFacetClick: () => {},
};

export const defaultCustomPillConfig: ICustomPillConfig = {
    createCustomPill: () => ({}),
};

export const QueryBuilderContext = createContext<TQueryBuilderContextType>({
    canCombine: false,
    customPillConfig: defaultCustomPillConfig,
    enableCombine: false,
    enableShowHideLabels: false,
    enableSingleQuery: false,
    hasEmptyQuery: false,
    headerConfig: defaultHeaderConfig,
    noQueries: false,
    queriesState: {
        activeId: '',
        queries: [],
    },
    queryBuilderId: '',
    selectedSavedFilter: null,
});

export const QueryCommonContext = createContext<TQueryCommonContext>({
    dictionary: {},
    facetFilterConfig: defaultFacetFilterConfig,
    showLabels: false,
});
