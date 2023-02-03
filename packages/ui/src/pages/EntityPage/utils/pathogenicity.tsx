import { IArrangerEdge, IArrangerResultsTree } from '../../../graphql/types';
import { removeUnderscoreAndCapitalize, toKebabCase } from '../../../utils/stringUtils';
import {
    ClinicalGenesTableSource,
    Conditions,
    CosmicEntity,
    DddEntity,
    HpoEntity,
    IClinVar,
    Inheritance,
    IVariantGene,
    OmimEntity,
    OrphanetEntity,
} from '../type';

export const makeClinvarRows = (clinvar?: IClinVar) => {
    if (!clinvar || !clinvar.conditions?.length) {
        return [];
    }
    const inheritance = (clinvar.inheritance || [])[0] || '';
    const interpretation = removeUnderscoreAndCapitalize((clinvar.clin_sig || [])[0] || '');

    return clinvar.conditions.map((condition: string) => ({
        condition,
        inheritance,
        interpretation,
    }));
};
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

export const makeGenesOrderedRow = (genesHits?: IArrangerResultsTree<IVariantGene>) => {
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
