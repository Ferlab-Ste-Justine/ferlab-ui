import { createContext } from 'react';
import { IDictionary, IFacetFilterConfig, IQueriesState, IQueryBuilderHeaderConfig, ISavedFilter } from './types';

export type TQueryBuilderContextType = {
    queryBuilderId: string;
    dictionary: IDictionary;
    queriesState: IQueriesState;
    selectedSavedFilter: ISavedFilter | null;
    headerConfig: IQueryBuilderHeaderConfig;
    facetFilterConfig: IFacetFilterConfig;
    noQueries: boolean;
    showLabels: boolean;
    canCombine: boolean;
    enableCombine: boolean;
    enableShowHideLabels: boolean;
    enableSingleQuery: boolean;
    hasEmptyQuery: boolean;
};

export const defaultHeaderConfig = {
    defaultTitle: 'Untitled Filter',
    onSaveFilter: () => {},
    onDeleteFilter: () => {},
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

export const QueryBuilderContext = createContext<TQueryBuilderContextType>({
    queryBuilderId: '',
    dictionary: {},
    queriesState: {
        activeId: '',
        queries: [],
    },
    selectedSavedFilter: null,
    headerConfig: defaultHeaderConfig,
    facetFilterConfig: defaultFacetFilterConfig,
    noQueries: false,
    showLabels: false,
    canCombine: false,
    enableCombine: false,
    enableShowHideLabels: false,
    enableSingleQuery: false,
    hasEmptyQuery: false,
});
