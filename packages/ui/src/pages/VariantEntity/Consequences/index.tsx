import React from 'react';
import { Card, Space, Tag, Tooltip, Typography } from 'antd';
import { capitalize } from 'lodash';

import { TABLE_EMPTY_PLACE_HOLDER } from '../../../common/constants';
import Collapse, { CollapsePanel } from '../../../components/Collapse';
import Empty from '../../../components/Empty';
import ExternalLink from '../../../components/ExternalLink';
import CanonicalIcon from '../../../components/Icons/CanonicalIcon';
import ExpandableCell from '../../../components/tables/ExpandableCell';
import ExpandableTable from '../../../components/tables/ExpandableTable';
import { IArrangerEdge } from '../../../graphql/types';
import StackLayout from '../../../layout/StackLayout';
import { IVariantEntity, IVariantEntityDictionary } from '../types';
import { Impact } from '../types';
import { IVariantConsequence, IVariantGene } from '../types';

import styles from '@ferlab/style/pages/variantEntity/Consequences.module.scss';

const { Text, Title } = Typography;

type TableGroup = {
    consequences: IArrangerEdge<IVariantConsequence>[];
    omim: string;
    symbol: string;
    ensembleGeneId: string;
};

type SymbolToConsequences = {
    [key: string]: TableGroup;
};

export const INDEX_IMPACT_PREDICTION_FIELD = 0;
export const INDEX_IMPACT_PREDICTION_SHORT_LABEL = 1;
export const INDEX_IMPACT_SCORE = 2;

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

const getVepImpactTag = (score: number | string, dictionary: IVariantEntityDictionary['consequences']) => {
    switch (score) {
        case 1:
        case 'modifier':
            return <Tag>{dictionary.impactTag.modifier}</Tag>;
        case 2:
        case 'low':
            return <Tag color="green">{dictionary.impactTag.low}</Tag>;
        case 3:
        case 'moderate':
            return <Tag color="gold">{dictionary.impactTag.moderate}</Tag>;
        case 4:
        case 'high':
            return <Tag color="red">{dictionary.impactTag.high}</Tag>;
    }
};

const getLongPredictionLabelIfKnown = (predictionField: string, predictionShortLabel: string) => {
    if (!predictionField || !predictionShortLabel) {
        return null;
    }
    const dictionaryPath = `${predictionField.toLowerCase()}.${predictionShortLabel.toLowerCase()}`;
    const longPrediction = shortToLongPrediction[dictionaryPath];
    return longPrediction || null;
};

const groupConsequencesBySymbol = (
    consequences: IArrangerEdge<IVariantConsequence>[],
    genes: IArrangerEdge<IVariantGene>[],
) => {
    if (!consequences.length) {
        return {};
    }
    return consequences.reduce((acc: SymbolToConsequences, consequence: IArrangerEdge<IVariantConsequence>) => {
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

const orderGenes = (mSymbolToConsequences: SymbolToConsequences) => {
    if (!mSymbolToConsequences || Object.keys(mSymbolToConsequences).length === 0) {
        return [];
    }
    return Object.entries(mSymbolToConsequences).map(([, values]) => ({
        ...values,
    }));
};

const orderConsequencesForTable = (tableGroups: TableGroup[]) => {
    if (!tableGroups || tableGroups.length === 0) {
        return [];
    }

    return tableGroups.map((tableGroup: TableGroup) => {
        const { consequences } = tableGroup;
        return {
            ...tableGroup,
            consequences: consequences,
        };
    });
};

export const sortConsequences = (data: IArrangerEdge<IVariantConsequence>[]) =>
    data
        .sort((a, b) => b.node.impact_score! - a.node.impact_score!)
        .sort((a, b) => (a.node.canonical === b.node.canonical ? 0 : a.node.canonical ? -1 : 1));

export const makeTables = (
    rawConsequences: IArrangerEdge<IVariantConsequence>[],
    rawGenes: IArrangerEdge<IVariantGene>[],
) => {
    if (!rawConsequences?.length) {
        return [];
    }
    const symbolToConsequences = groupConsequencesBySymbol(rawConsequences, rawGenes);
    const orderedGenes = orderGenes(symbolToConsequences);
    return orderConsequencesForTable(orderedGenes);
};

export const makeRows = (
    consequences: IArrangerEdge<IVariantConsequence>[],
    dictionary: IVariantEntityDictionary['consequences']['prediction'],
) =>
    consequences.map((consequence: IArrangerEdge<IVariantConsequence>, index: number) => ({
        aa_change: consequence.node.aa_change,
        coding_dna_change: consequence.node.coding_dna_change,
        consequences: consequence.node.consequences?.filter((c) => c?.length),
        conservation: consequence.node.conservations?.phylo_p17way_primate_rankscore,
        impact: [
            [
                dictionary.sift,
                consequence.node.predictions?.sift_pred,
                consequence.node.predictions?.sift_converted_rankscore,
            ],
            [
                dictionary.polyphen2,
                consequence.node.predictions?.polyphen2_hvar_pred,
                consequence.node.predictions?.sift_converted_rankscore,
            ],
            [
                dictionary.fathmm,
                consequence.node.predictions?.fathmm_pred,
                consequence.node.predictions?.fathmm_converted_rankscore,
            ],
            [dictionary.cadd, null, consequence.node.predictions?.cadd_rankscore],
            [dictionary.dann, null, consequence.node.predictions?.dann_rankscore],
            [
                dictionary.lrt,
                consequence.node.predictions?.lrt_pred,
                consequence.node.predictions?.lrt_converted_rankscore,
            ],
            [dictionary.revel, null, consequence.node.predictions?.revel_rankscore],
        ].filter(([, , score]) => score),
        key: `${index + 1}`,
        refseq_mrna_id: consequence.node.refseq_mrna_id || '',
        strand: consequence.node.strand,
        transcript: {
            ensembl_transcript_id: consequence.node.ensembl_transcript_id || '',
            isCanonical: consequence.node.canonical || false,
        },
        vep_impact: consequence.node.vep_impact,
    }));

export const getColumns = (dictionary: IVariantEntityDictionary['consequences']) => [
    {
        dataIndex: 'aa_change',
        render: (aa_change: string) => <div className={styles.longValue}>{aa_change || TABLE_EMPTY_PLACE_HOLDER}</div>,
        title: <Tooltip title={dictionary.aaColumnTooltip}>{dictionary.aaColumn}</Tooltip>,
        width: '10%',
    },
    {
        dataIndex: 'consequences',
        render: (consequences: string[]) => {
            if (!consequences.length) return '';
            return (
                <ExpandableCell
                    dataSource={consequences}
                    renderItem={(item: any, id) => (
                        <StackLayout className={styles.cellList} horizontal key={id}>
                            <Text>{item}</Text>
                        </StackLayout>
                    )}
                />
            );
        },
        title: dictionary.consequence,
        width: '15%',
    },
    {
        dataIndex: 'coding_dna_change',
        render: (coding_dna_change: string) => (
            <div className={styles.longValue}>{coding_dna_change || TABLE_EMPTY_PLACE_HOLDER}</div>
        ),
        title: dictionary.cdnaChangeColumn,
        width: '15%',
    },
    {
        dataIndex: 'strand',
        render: (strand: string) => strand || TABLE_EMPTY_PLACE_HOLDER,
        title: dictionary.strand,
        width: '5%',
    },
    {
        dataIndex: 'vep_impact',
        render: (vep: Impact) => getVepImpactTag(vep?.toLowerCase(), dictionary) || TABLE_EMPTY_PLACE_HOLDER,
        title: dictionary.vep,
        width: '5%',
    },
    {
        dataIndex: 'impact',
        render: (impact: string[][]) => {
            if (!impact?.length) return TABLE_EMPTY_PLACE_HOLDER;
            return (
                <ExpandableCell
                    dataSource={impact}
                    dictionnary={{
                        'see.less': dictionary.seeLess,
                        'see.more': dictionary.seeMore,
                    }}
                    nOfElementsWhenCollapsed={2}
                    renderItem={(item: any, id) => {
                        const predictionField = item[INDEX_IMPACT_PREDICTION_FIELD];
                        const score = item[INDEX_IMPACT_SCORE];
                        const predictionShortLabel = item[INDEX_IMPACT_PREDICTION_SHORT_LABEL];
                        const predictionLongLabel = getLongPredictionLabelIfKnown(
                            predictionField,
                            predictionShortLabel,
                        );
                        const label = predictionLongLabel || predictionShortLabel;
                        const description = label ? `${capitalize(label)} - ${score}` : score;
                        return (
                            <StackLayout className={styles.cellList} horizontal key={id}>
                                <Text type={'secondary'}>{predictionField}:</Text>
                                <Text>{description}</Text>
                            </StackLayout>
                        );
                    }}
                />
            );
        },
        title: dictionary.prediction.prediction,
        width: '15%',
    },
    {
        dataIndex: 'conservation',
        render: (conservation: number) => (conservation == null ? TABLE_EMPTY_PLACE_HOLDER : conservation),
        title: dictionary.conservationColumn,
        width: '10%',
    },
    {
        dataIndex: 'transcript',
        render: (transcript: { ensembl_transcript_id: string; isCanonical?: boolean }) => (
            <Space>
                <ExternalLink href={`https://www.ensembl.org/id/${transcript.ensembl_transcript_id}`}>
                    {transcript.ensembl_transcript_id}
                </ExternalLink>
                {transcript.isCanonical && (
                    <Tooltip title={dictionary.canonical}>
                        <CanonicalIcon className={styles.canonicalIcon} height={14} width={14} />{' '}
                    </Tooltip>
                )}
            </Space>
        ),
        title: dictionary.transcript,
        width: '15%',
    },
    {
        dataIndex: 'refseq_mrna_id',
        render: (refseq_mrna_id: string) =>
            refseq_mrna_id ? (
                <ExternalLink href={`https://www.ncbi.nlm.nih.gov/nuccore/${refseq_mrna_id}?report=graph`}>
                    {refseq_mrna_id}
                </ExternalLink>
            ) : (
                TABLE_EMPTY_PLACE_HOLDER
            ),
        title: dictionary.refSeq,
        width: '10%',
    },
];

interface IConsequencesProps {
    variant?: IVariantEntity;
    loading: boolean;
    id: string;
    dictionary: IVariantEntityDictionary['consequences'];
}

const Consequences: React.FC<IConsequencesProps> = ({ dictionary, id, loading, variant }) => {
    const consequences = variant?.consequences?.hits?.edges || [];
    const genes = variant?.genes?.hits?.edges || [];
    const tables = makeTables(consequences, genes);

    return (
        <div className={styles.container} id={id}>
            <Title className={styles.title} level={4}>
                {dictionary.consequence}
            </Title>
            <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['1']}>
                <CollapsePanel className={styles.panel} header={dictionary.geneConsequences} key="1">
                    <Card className={styles.card} loading={loading}>
                        <Space className={styles.consequenceCards} direction="vertical" size={48}>
                            {tables.length > 0 ? (
                                tables.map((tableData: TableGroup, index: number) => {
                                    const { symbol } = tableData;
                                    const { omim } = tableData;
                                    const orderedConsequences = sortConsequences(tableData.consequences);

                                    return (
                                        <Space
                                            className={styles.consequenceTableWrapper}
                                            direction="vertical"
                                            key={index}
                                            size={12}
                                        >
                                            <Space size={12}>
                                                <Space size={4}>
                                                    <span>
                                                        <span>{dictionary.gene} </span>
                                                        <span>
                                                            <ExternalLink
                                                                href={`https://useast.ensembl.org/Homo_sapiens/Gene/Summary?g=${symbol}`}
                                                            >
                                                                {symbol}
                                                            </ExternalLink>
                                                        </span>
                                                    </span>
                                                </Space>
                                                <Space size={4}>
                                                    {omim && (
                                                        <>
                                                            <span>{dictionary.omim}</span>
                                                            <span>
                                                                <ExternalLink href={`https://omim.org/entry/${omim}`}>
                                                                    {omim}
                                                                </ExternalLink>
                                                            </span>
                                                        </>
                                                    )}
                                                </Space>
                                            </Space>
                                            <ExpandableTable
                                                bordered
                                                buttonText={(showAll, hiddenNum) =>
                                                    showAll
                                                        ? `${dictionary.hideTranscript}`
                                                        : `${hiddenNum} ${dictionary.showTranscript}`
                                                }
                                                columns={getColumns(dictionary)}
                                                dataSource={makeRows(orderedConsequences, dictionary['prediction'])}
                                                nOfElementsWhenCollapsed={1}
                                                pagination={false}
                                                size="small"
                                            />
                                        </Space>
                                    );
                                })
                            ) : (
                                <Empty
                                    align="left"
                                    description={dictionary.noDataAvailable}
                                    noPadding
                                    showImage={false}
                                />
                            )}
                        </Space>
                    </Card>
                </CollapsePanel>
            </Collapse>
        </div>
    );
};

export default Consequences;
