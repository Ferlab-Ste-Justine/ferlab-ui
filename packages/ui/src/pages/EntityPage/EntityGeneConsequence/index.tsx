import React from 'react';

import { ProColumnType } from '../../../components/ProTable/types';
import { IArrangerEdge } from '../../../graphql/types';
import { hydrateResults } from '../../../graphql/utils';
import EntityExpandableTableMultiple from '../EntityExpandableTableMultiple';
import { IVariantConsequence, IVariantGene } from '../type';
import { mergeConsequencesWithGenes, sortConsequences } from '../utils/consequences';

import EntityGeneConsequenceSubtitle from './EntityGeneConsequenceSubtitle';

export interface IEntityGeneConsequences {
    id: string;
    header: string;
    title?: string;
    loading: boolean;
    direction?: 'horizontal' | 'vertical';
    columns: ProColumnType[];
    genes?: IArrangerEdge<IVariantGene>[];
    consequences?: IArrangerEdge<IVariantConsequence>[];
    dictionary: {
        hideTranscript: string;
        showTranscript: (count: number) => string;
        noDataAvailable: string;
    };
}

export const EntityGeneConsequences = ({
    columns,
    consequences,
    dictionary,
    genes,
    header,
    id,
    loading,
}: IEntityGeneConsequences): JSX.Element => {
    const geneConsequences = mergeConsequencesWithGenes(consequences || [], genes || []);

    return (
        <EntityExpandableTableMultiple
            dictionary={dictionary}
            direction="vertical"
            header={header}
            id={id}
            loading={loading}
            tables={geneConsequences.map((table) => ({
                columns,
                data: hydrateResults(sortConsequences(table.consequences)),
                subTitle: (
                    <EntityGeneConsequenceSubtitle
                        consequences={table.consequences}
                        dictionary={{
                            gene: 'Gene',
                            omim: 'Omim',
                        }}
                        omim={table.omim}
                        symbol={table.symbol}
                    />
                ),
            }))}
            title={header}
        />
    );
};

export default EntityGeneConsequences;
