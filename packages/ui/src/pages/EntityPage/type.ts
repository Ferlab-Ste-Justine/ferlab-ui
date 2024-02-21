import { IArrangerEdge, IArrangerResultsTree } from '../../graphql/types';

export interface IVariantEntityDictionary {
    consequences: {
        consequence: string;
        impactTag: {
            modifier: string;
            low: string;
            moderate: string;
            high: string;
        };
        aaColumnTooltip: string;
        aaColumn: string;
        cdnaChangeColumn: string;
        strand: string;
        vep: string;
        predictions: {
            predictions: string;
            sift: string;
            polyphen2: string;
            fathmm: string;
            cadd: string;
            dann: string;
            lrt: string;
            revel: string;
        };
        seeLess: string;
        seeMore: string;
        conservationColumn: string;
        transcript: string;
        canonical: string;
        refSeq: string;
        geneConsequence: string;
        gene: string;
        omim: string;
        hideTranscript: string;
        showTranscript: (count: number) => string;
        noDataAvailable: string;
    };
    frequencies: {
        kfStudies: string;
        publicCohorts: string;
        studies: string;
        domain: string;
        participantsInfoIconTooltip: string;
        participantsTooltip: string;
        participants: string;
        frequencyTooltip: string;
        frequency: string;
        altAllelesTooltip: string;
        altAlleles: string;
        homozygotesTooltip: string;
        homozygotes: string;
        total: string;
        cohort: string;
        altRefTooltip: string;
        altRef: string;
        noDataAvailable: string;
    };
    pathogenicity: {
        pathogenicity: string;
        clinVar: string;
        genePhenotype: string;
        source: string;
        gene: string;
        condition: string;
        inheritance: string;
        inheritances: string;
        interpretation: string;
    };
}

export interface IVariantEntity {
    id: string;
    alternate: string;
    chromosome: string;
    genome_build: string;
    hgvsg: string;
    locus: string;
    participant_number: number;
    participant_total_number: number;
    reference: string;
    rsnumber: string;
    start: number;
    variant_class: string;
    studies: IArrangerResultsTree<IVariantStudyEntity>;
    consequences: IArrangerResultsTree<IVariantConsequence>;
    clinvar: IClinVar;
    frequencies: IExternalFrequenciesEntity;
    genes: IArrangerResultsTree<IVariantGene>;
}

export interface IClinVar {
    clinvar_id: string | undefined;
    inheritance: string[];
    conditions: string[];
    clin_sig: string[];
}

export interface IVariantFrequenciesInternal {
    upper_bound_kf: IBoundType;
}

export interface IExternalFrequenciesEntity {
    gnomad_exomes_2_1_1: IBoundType;
    gnomad_genomes_2_1_1: IBoundType;
    gnomad_genomes_3: IBoundType;
    thousand_genomes: IBoundType;
    topmed_bravo: IBoundType;
}

export interface ConsequenceEntity {
    id: string;
    score: number;
    aa_change: string | undefined | null;
    canonical: boolean;
    cdna_position: string;
    cds_position: string;
    consequence: string[];
    ensembl_feature_id: string;
    ensembl_transcript_id: string;
    feature_type: string;
    hgvsc: string;
    hgvsp: string;
    impact_score: number;
    mane_plus: boolean;
    mane_select: boolean;
    picked: boolean;
    protein_position: string;
    refseq_mrna_id: string[];
    strand: string;
    uniprot_id: string;
    vep_impact: Impact;
    amino_acids: {
        reference: string;
        variant: string;
    };
    codons: {
        reference: string;
        variant: string;
    };
    conservations: IConservationsEntity;
    exon: {
        rank: number;
        total: number;
    };
    intron: {
        rank: number;
        total: number;
    };
    predictions: IPredictionEntity;
}

export type OmimEntity = {
    id: any;
    score: number;
    inheritance: string[];
    inheritance_code: string[];
    name: string;
    omim_id: string;
};

export type HpoEntity = {
    id: any;
    score: number;
    hpo_term_id: string;
    hpo_term_label: string;
    hpo_term_name: string;
};

export type DddEntity = {
    id: any;
    score: number;
    disease_name: string;
};

export type CosmicEntity = {
    id: any;
    score: number;
    tumour_types_germline: string[];
};

export type OrphanetEntity = {
    id: any;
    score: number;
    inheritance: string;
    disorder_id: number;
    panel: string;
};

export interface IVariantGene {
    id: any;
    score: number;
    alias: string[];
    biotype: string;
    ensembl_gene_id: string;
    entrez_gene_id: string;
    hgnc: string;
    location: string;
    name: string;
    omim_gene_id: string;
    symbol: string;
    consequences: IArrangerResultsTree<ConsequenceEntity>;
    cosmic: IArrangerResultsTree<CosmicEntity>;
    ddd: IArrangerResultsTree<DddEntity>;
    gnomad: {
        loeuf: string;
        pli: number;
    };
    hpo: IArrangerResultsTree<HpoEntity>;
    omim: IArrangerResultsTree<OmimEntity>;
    orphanet: IArrangerResultsTree<OrphanetEntity>;
    spliceai: {
        ds: number;
        type: string[];
    };
}

export interface IVariantConsequence {
    id: string;
    symbol: string;
    consequences: string[];
    vep_impact: Impact;
    impact_score: number | null;
    canonical: boolean;
    strand: string;
    refseq_mrna_id: string;
    ensembl_transcript_id: string;
    ensembl_gene_id: string;
    predictions: IPredictionEntity;
    conservations: IConservationsEntity;
    biotype: string;
    hgvsc: string;
    hgvsp: string;
}

export interface IConservationsEntity {
    phyloP100way_vertebrate: number;
    phyloP17way_primate: number;
}

export interface IVariantStudyEntity {
    id: string;
    participant_ids: string[];
    participant_number: number;
    study_id: string;
    study_code?: string;
    frequencies: IVariantStudyFrequencies;
}

export interface IStudyEntity {
    id: string;
    domain: string;
}

export interface IVariantStudyFrequencies {
    upper_bound_kf: IBoundType;
}

export interface IParticipantQueryParams {
    field: string;
    index: string;
    queryBuilderId: string;
    route: string;
}

export type FreqAll = {
    ac: number;
    af: number;
    an: number;
};

export type FreqTopmed = FreqAll & { homozygotes: number };
export type Freqgnomad = FreqAll & { homozygotes: number };
export type FreqOneThousand = FreqAll & { homozygotes: number };

export interface IBoundType {
    ac?: number;
    af?: number;
    an?: number;
    pn?: number;
    pc?: number;
    pf?: number;
    het?: number;
    hom?: number;
}

export type OmimCondition = {
    omimName: string;
    omimId: string;
};

export type OmimConditions = OmimCondition[];

export type HpoCondition = {
    hpoTermLabel: string;
    hpoTermTermId: string;
};
export type HpoConditions = HpoCondition[];

export type OrphanetCondition = {
    panel: string;
    disorderId: number;
};
export type OrphanetConditions = OrphanetCondition[];

export type DddCondition = string;
export type DddConditions = DddCondition[];

export type CosmicCondition = string;
export type CosmicConditions = CosmicCondition[];

export type Conditions = OmimConditions | HpoConditions | OrphanetConditions | DddConditions | CosmicConditions;

export type OrphanetInheritance = string[][];
export type OmimInheritance = string[][];
export type SingleValuedInheritance = string;
export type Inheritance = SingleValuedInheritance | OrphanetInheritance | OmimInheritance;

export type OmimGene = string[][];

export enum Impact {
    High = 'HIGH',
    Moderate = 'MODERATE',
    Low = 'LOW',
    Modifier = 'MODIFIER',
}

export enum ClinicalGenesTableSource {
    orphanet = 'Orphanet',
    omim = 'OMIM',
    hpo = 'HPO',
    ddd = 'DDD',
    cosmic = 'Cosmic',
}

export interface IGeneConsquenceTableGroup {
    consequences: IArrangerEdge<IVariantConsequence>[];
    omim: string;
    symbol: string;
    ensembleGeneId: string;
}

export interface ISymbolToConsequences {
    [key: string]: IGeneConsquenceTableGroup;
}

export interface IPredictionEntity {
    cadd_phred: number;
    cadd_score: number;
    dann_score: number;
    fathmm_pred: string;
    fathmm_score: number;
    lrt_pred: string;
    lrt_score: number;
    polyphen2_hvar_pred: string;
    polyphen2_hvar_score: number;
    revel_score: number;
    sift_pred: string;
    sift_score: number;
}

export interface IPublicCohortRow {
    cohort: {
        cohortName: string;
        link?: string;
    };
    alt: string | number | null;
    altRef: string | number | null;
    homozygotes: string | number | null;
    frequency: string | number | null;
    key: string;
}

export interface IGeneRecord {
    source: ClinicalGenesTableSource;
    gene: string | OmimGene;
    conditions: Conditions;
    inheritance: Inheritance;
}
