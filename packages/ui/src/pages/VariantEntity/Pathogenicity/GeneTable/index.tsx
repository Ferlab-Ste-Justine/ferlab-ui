import React from 'react';
import { Table, Typography } from 'antd';

import { TABLE_EMPTY_PLACE_HOLDER } from '../../../../common/constants';
import ExternalLink from '../../../../components/ExternalLink';
import { IArrangerEdge, IArrangerResultsTree } from '../../../../graphql/types';
import StackLayout from '../../../../layout/StackLayout';
import {
    ClinicalGenesTableSource,
    Conditions,
    CosmicConditions,
    CosmicEntity,
    DddConditions,
    DddEntity,
    HpoConditions,
    HpoEntity,
    Inheritance,
    IVariantEntity,
    IVariantEntityDictionary,
    IVariantGene,
    OmimConditions,
    OmimEntity,
    OmimGene,
    OmimInheritance,
    OrphanetConditions,
    OrphanetEntity,
    OrphanetInheritance,
    SingleValuedInheritance,
} from '../../types';
import { toKebabCase } from '../../utils';

import CosmicConditionCell from './conditions/CosmicConditionCell';
import DddConditionCell from './conditions/DddConditionCell';
import HpoConditionCell from './conditions/HpoConditionCell';
import OmimConditionCell from './conditions/OmimConditionCell';
import OrphanetConditionCell from './conditions/OrphanetConditionCell';

import styles from '@ferlab/style/pages/variantEntity/GeneTable.module.scss';

type Record = {
    source: ClinicalGenesTableSource;
    gene: string | OmimGene;
    conditions: Conditions;
    inheritance: Inheritance;
};

export const getColumnsPhenotypes = (dictionary: IVariantEntityDictionary['pathogenicity']) => [
    {
        dataIndex: 'source',
        title: dictionary.source,
    },
    {
        dataIndex: 'gene',
        render: (text: Conditions, record: Record) => {
            const { source } = record;
            if (source === ClinicalGenesTableSource.omim) {
                const [geneName, omimId] = record.gene as OmimGene;
                return (
                    <>
                        {`${geneName} (OMIM:`}
                        <ExternalLink href={`https://www.omim.org/entry/${omimId}`}>{omimId}</ExternalLink>)
                    </>
                );
            }
            return record.gene;
        },
        title: dictionary.gene,
    },
    {
        dataIndex: 'conditions',
        render: (text: Conditions, record: Record) => {
            switch (record.source) {
                case ClinicalGenesTableSource.omim:
                    return <OmimConditionCell conditions={record.conditions as OmimConditions} />;
                case ClinicalGenesTableSource.orphanet:
                    return <OrphanetConditionCell conditions={record.conditions as OrphanetConditions} />;
                case ClinicalGenesTableSource.hpo:
                    return <HpoConditionCell conditions={record.conditions as HpoConditions} />;
                case ClinicalGenesTableSource.ddd:
                    return <DddConditionCell conditions={record.conditions as DddConditions} />;
                default:
                    return <CosmicConditionCell conditions={record.conditions as CosmicConditions} />;
            }
        },
        title: dictionary.condition,
        width: '33%',
    },
    {
        dataIndex: 'inheritance',
        render: (text: Inheritance, record: Record) => {
            const { source } = record;
            if (source === ClinicalGenesTableSource.orphanet) {
                const orphanetInheritance = (record.inheritance || []) as OrphanetInheritance;
                return (
                    <>
                        {orphanetInheritance.map((inheritance: string[], index: number) => (
                            <StackLayout key={index}>
                                <Typography.Text>
                                    {inheritance ? inheritance.join(',') : TABLE_EMPTY_PLACE_HOLDER}
                                </Typography.Text>
                            </StackLayout>
                        ))}
                    </>
                );
            } else if (source === ClinicalGenesTableSource.omim) {
                const omimInheritance = record.inheritance as OmimInheritance;
                return (
                    <>
                        {omimInheritance.map((inheritance: string[], index: number) => (
                            <StackLayout key={index}>
                                <Typography.Text>
                                    {inheritance ? inheritance.join(',') : TABLE_EMPTY_PLACE_HOLDER}
                                </Typography.Text>
                            </StackLayout>
                        ))}
                    </>
                );
            }
            const inheritance = record.inheritance as SingleValuedInheritance;
            return inheritance || TABLE_EMPTY_PLACE_HOLDER;
        },
        title: dictionary.inheritance,
        width: '33%',
    },
];

const orphanetFromEdges = (gene: IArrangerEdge<IVariantGene>, orphanetEdges: IArrangerEdge<OrphanetEntity>[]) =>
    orphanetEdges.length > 0
        ? {
              conditions: orphanetEdges.map((orphanetNode) => ({
                  disorderId: orphanetNode.node.disorder_id,
                  panel: orphanetNode.node.panel,
              })),
              gene: gene.node.symbol,
              inheritance: orphanetEdges.map((orphanetNode) => orphanetNode.node.inheritance),
              source: ClinicalGenesTableSource.orphanet,
          }
        : null;

const omimFromEdges = (gene: IArrangerEdge<IVariantGene>, omimEdges: IArrangerEdge<OmimEntity>[]) =>
    omimEdges.length > 0
        ? {
              conditions: omimEdges.map((omimNode: IArrangerEdge<OmimEntity>) => ({
                  omimId: omimNode.node.omim_id,
                  omimName: omimNode.node.name,
              })),
              gene: [gene.node.symbol, gene.node.omim_gene_id],
              inheritance: omimEdges.map((omimNode: IArrangerEdge<OmimEntity>) => omimNode.node.inheritance) || [],
              source: ClinicalGenesTableSource.omim,
          }
        : null;

const hpoFromEdges = (gene: IArrangerEdge<IVariantGene>, hpoEdges: IArrangerEdge<HpoEntity>[]) =>
    hpoEdges.length > 0
        ? {
              conditions: hpoEdges.map((hpoNode: IArrangerEdge<HpoEntity>) => ({
                  hpoTermLabel: hpoNode.node.hpo_term_label,
                  hpoTermTermId: hpoNode.node.hpo_term_id,
              })),
              gene: gene.node.symbol,
              inheritance: '',
              source: ClinicalGenesTableSource.hpo,
          }
        : null;

const dddFromEdges = (gene: IArrangerEdge<IVariantGene>, dddEdges: IArrangerEdge<DddEntity>[]) =>
    dddEdges.length > 0
        ? {
              conditions: dddEdges.map((dddNode: IArrangerEdge<DddEntity>) => dddNode.node.disease_name),
              gene: gene.node.symbol,
              inheritance: '',
              source: ClinicalGenesTableSource.ddd,
          }
        : null;

const cosmicFromEdges = (gene: IArrangerEdge<IVariantGene>, cosmicEdges: IArrangerEdge<CosmicEntity>[]) =>
    cosmicEdges.length > 0
        ? {
              conditions: cosmicEdges
                  .map((cosmicNode: IArrangerEdge<CosmicEntity>) => cosmicNode.node.tumour_types_germline)
                  .flat(),
              gene: gene.node.symbol,
              inheritance: '',
              source: ClinicalGenesTableSource.cosmic,
          }
        : null;

const keepOnlyOmimWithId = (arr: IArrangerEdge<OmimEntity>[]) =>
    arr.filter((omimNode: IArrangerEdge<OmimEntity>) => omimNode.node.omim_id);

export const makeUnGroupedDataRows = (genes: IArrangerEdge<IVariantGene>[]) => {
    if (!genes.length) {
        return [];
    }

    return genes.map((gene) => {
        const rowOrphanet = orphanetFromEdges(gene, gene.node.orphanet?.hits?.edges || []);
        const rowOmim = omimFromEdges(gene, keepOnlyOmimWithId(gene.node.omim?.hits?.edges || []));
        const rowCosmic = cosmicFromEdges(gene, gene.node.cosmic?.hits?.edges || []);
        const rowHpo = hpoFromEdges(gene, gene.node.hpo?.hits?.edges || []);
        const rowDdd = dddFromEdges(gene, gene.node.ddd?.hits?.edges || []);

        return [rowOrphanet, rowOmim, rowHpo, rowDdd, rowCosmic].filter((row) => row).flat();
    });
};

export const groupRowsBySource = (ungroupedDataTable: any[]) => {
    const orphanetRows = ungroupedDataTable.flat().filter((row) => row.source === ClinicalGenesTableSource.orphanet);
    const omimRows = ungroupedDataTable.flat().filter((row) => row.source === ClinicalGenesTableSource.omim);
    const hpoRows = ungroupedDataTable.flat().filter((row) => row.source === ClinicalGenesTableSource.hpo);
    const dddRows = ungroupedDataTable.flat().filter((row) => row.source === ClinicalGenesTableSource.ddd);
    const cosmicRows = ungroupedDataTable.flat().filter((row) => row.source === ClinicalGenesTableSource.cosmic);

    return [...orphanetRows, ...omimRows, ...hpoRows, ...dddRows, ...cosmicRows];
};

const makeGenesOrderedRow = (genesHits?: IArrangerResultsTree<IVariantGene>) => {
    const genes = genesHits?.hits?.edges || [];

    if (!genes.length) {
        return [];
    }

    const ungroupedRows = makeUnGroupedDataRows(genes);
    const groupedRows = groupRowsBySource(ungroupedRows);

    return groupedRows.map((row, index) => ({
        conditions: row.conditions as Conditions,
        gene: row.gene,
        inheritance: row.inheritance as Inheritance,
        key: toKebabCase(`${index}-${[row.gene].flat().join('-')}`),
        source: row.source,
    }));
};

interface IGeneTableProps {
    loading: boolean;
    variant?: IVariantEntity;
    dictionary: IVariantEntityDictionary['pathogenicity'];
}

const GeneTable: React.FC<IGeneTableProps> = ({ dictionary, loading, variant }) => (
    <Table
        bordered
        columns={getColumnsPhenotypes(dictionary)}
        dataSource={makeGenesOrderedRow(variant?.genes)}
        loading={loading}
        pagination={false}
        rowClassName={styles.notStriped}
        size="small"
    />
);

export default GeneTable;
