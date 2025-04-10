import { ISyntheticSqon } from '@ferlab/ui/data/sqon/types';

export type TVennChartDictionary = {
    query: {
        title: string;
        column: string;
    };
    set: {
        title: string;
        column: string;
        footer: string;
        tooltipDataExplo: string;
        tooltipVariantExplo?: string;
        max: string;
    };
    save: TVennChartSaveDictionary;
    count: string;
    participants: string;
    biospecimens: string;
    download: {
        png: string;
        fileNameTemplate?: string;
        fileNameDateFormat?: string;
    };
    files: string;
    filters?: {
        compareButton: string;
        compareDisabledTooltip: string;
        optionDisabledTooltip: string;
        resetTooltip: string;
        selectEntity: string;
        selectEntityPlaceholder: string;
        selectSet: string;
        selectSetPlaceholder: string;
    };
};

export type TVennChartSaveDictionary = {
    nameTemplate: string;
    maximumLength: string;
    permittedCharacters: string;
    requiredField: string;
    titleData: string;
    titleVariant?: string;
    getEntityText: (index: string, entityCount: number) => string;
    label: string;
    checkbox: {
        label: string;
        tooltips: string;
    };
    alreadyExist: string;
    ok: string;
    cancel: string;
};

export interface ISummaryData {
    operation: string;
    entityCount: number;
    qbSqon: ISyntheticSqon;
}

export interface ISetOperation {
    operation: string;
    entityCount: number;
    entitySqon: ISyntheticSqon;
    setId: string;
}

export type THandleSubmit = {
    index: string;
    name: string;
    sets: ISetOperation[];
    invisible: boolean;
    callback: () => void;
};

export type TOption = {
    label: string;
    value: string;
    icon: React.ReactNode;
    tabId?: string;
};
