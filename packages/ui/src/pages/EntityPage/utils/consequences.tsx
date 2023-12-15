import React from 'react';
import { Tag } from 'antd';

import { IArrangerEdge } from '../../../graphql/types';
import {
    IGeneConsquenceTableGroup,
    IPredictionEntity,
    ISymbolToConsequences,
    IVariantConsequence,
    IVariantGene,
} from '../type';

export const INDEX_IMPACT_PREDICTION_FIELD = 0;
export const INDEX_IMPACT_PREDICTION_SHORT_LABEL = 1;
export const INDEX_IMPACT_SCORE = 2;

export const getLongPredictionLabelIfKnown = (predictionField: string, predictionShortLabel: string): string | null => {
    if (!predictionField || !predictionShortLabel) {
        return null;
    }
    const dictionaryPath = `${predictionField.toLowerCase()}.${predictionShortLabel.toLowerCase()}`;
    const longPrediction = shortToLongPrediction[dictionaryPath];
    return longPrediction || null;
};

export const shortToLongPrediction: Record<string, string> = {
    'fathmm.d': 'damaging',
    'fathmm.t': 'tolerated',
    'lrt.d': 'deleterious',
    'lrt.n': 'neutral',
    'lrt.u': 'unknown',
    'polyphen2.b': 'benign',
    'polyphen2.d': 'probably damaging',
    'polyphen2.p': 'possibly damaging',
    'sift.d': 'damaging',
    'sift.t': 'tolerated',
};

export const getVepImpactTag = (
    score: number | string,
    dictionary: {
        modifier: string;
        low: string;
        moderate: string;
        high: string;
    },
): React.ReactNode => {
    switch (score) {
        case 1:
        case 'modifier':
            return <Tag>{dictionary.modifier}</Tag>;
        case 2:
        case 'low':
            return <Tag color="green">{dictionary.low}</Tag>;
        case 3:
        case 'moderate':
            return <Tag color="gold">{dictionary.moderate}</Tag>;
        case 4:
        case 'high':
            return <Tag color="red">{dictionary.high}</Tag>;
    }
};

export const sortConsequences = (data: IArrangerEdge<IVariantConsequence>[]): IArrangerEdge<IVariantConsequence>[] =>
    data
        .sort((a, b) => b.node.impact_score! - a.node.impact_score!)
        .sort((a, b) => (a.node.canonical === b.node.canonical ? 0 : a.node.canonical ? -1 : 1));

const groupConsequencesBySymbol = (
    consequences: IArrangerEdge<IVariantConsequence>[],
    genes: IArrangerEdge<IVariantGene>[],
) => {
    if (!consequences.length) {
        return {};
    }
    return consequences.reduce((acc: ISymbolToConsequences, consequence: IArrangerEdge<IVariantConsequence>) => {
        const { symbol } = consequence.node;
        if (!symbol) {
            return acc;
        }
        const gene = genes.find((g) => g.node.symbol === symbol);
        const omim = gene ? gene.node.omim_gene_id : '';
        const ensembleGeneId = consequence.node.ensembl_gene_id || '';
        const oldConsequences = acc[symbol]?.consequences || [];

        return {
            ...acc,
            [symbol]: {
                consequences: [...oldConsequences, { ...consequence }],
                ensembleGeneId,
                omim,
                symbol,
            },
        };
    }, {});
};

const orderGenes = (mSymbolToConsequences: ISymbolToConsequences) => {
    if (!mSymbolToConsequences || Object.keys(mSymbolToConsequences).length === 0) {
        return [];
    }
    return Object.entries(mSymbolToConsequences).map(([, values]) => ({
        ...values,
    }));
};

const orderConsequencesForTable = (tableGroups: IGeneConsquenceTableGroup[]) => {
    if (!tableGroups || tableGroups.length === 0) {
        return [];
    }

    return tableGroups.map((tableGroup: IGeneConsquenceTableGroup) => {
        const { consequences } = tableGroup;
        return {
            ...tableGroup,
            consequences: consequences,
        };
    });
};

export const mergeConsequencesWithGenes = (
    rawConsequences: IArrangerEdge<IVariantConsequence>[],
    rawGenes: IArrangerEdge<IVariantGene>[],
): IGeneConsquenceTableGroup[] => {
    if (!rawConsequences?.length) {
        return [];
    }

    const symbolToConsequences = groupConsequencesBySymbol(rawConsequences, rawGenes);
    const orderedGenes = orderGenes(symbolToConsequences);
    return orderConsequencesForTable(orderedGenes);
};

export const getPredictionScore = (
    predictions: IPredictionEntity,
    dictionary: {
        sift: string;
        polyphen2: string;
        fathmm: string;
        cadd: string;
        dann: string;
        lrt: string;
        revel: string;
    },
): any[][] =>
    [
        [dictionary.sift, predictions?.sift_pred, predictions?.sift_converted_rankscore],
        [dictionary.polyphen2, predictions?.polyphen2_hvar_pred, predictions?.sift_converted_rankscore],
        [dictionary.fathmm, predictions?.fathmm_converted_rankscore],
        [dictionary.cadd, null, predictions?.cadd_rankscore],
        [dictionary.dann, null, predictions?.dann_rankscore],
        [dictionary.lrt, predictions?.lrt_pred, predictions?.lrt_converted_rankscore],
        [dictionary.revel, null, predictions?.revel_rankscore],
    ].filter(([, , score]) => score);
