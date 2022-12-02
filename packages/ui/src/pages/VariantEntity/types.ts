import { IArrangerResultsTree } from '../../graphql/types';

export interface IVariantEntityDictionary {
    summary: {
        summary: string;
        type: string;
        chromosome: string;
        position: string;
        cytobande: string;
        alternativeAllele: string;
        altAllele: string;
        referenceAllele: string;
        refAllele: string;
        referenceGenome: string;
        studies: string;
        participants: string;
        genes: string;
        omim: string;
        clinVar: string;
        gnomadGenome311: string;
        dbSNP: string;
    };
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
        prediction: {
            prediction: string;
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
        geneConsequences: string;
        gene: string;
        omim: string;
        hideTranscript: string;
        showTranscript: string;
        noDataAvailable: string;
    };
    frequencies: {
        frequence: string;
        kfStudies: string;
        publicCohorts: string;
        studies: string;
        domain: string;
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
    frequencies: IVariantFrequencies;
    genes: IArrangerResultsTree<IVariantGene>;
}

export interface IClinVar {
    clinvar_id: string | undefined;
    inheritance: string[];
    conditions: string[];
    clin_sig: string[];
}

export interface IVariantFrequenciesInternal {
    upper_bound_kf: BoundType;
}

export interface IVariantFrequencies {
    internal: IVariantFrequenciesInternal;
    topmed: FreqTopmed;
    one_thousand_genomes: FreqOneThousand;
    gnomad_exomes_2_1: Freqgnomad;
    gnomad_genomes_2_1: Freqgnomad;
    gnomad_genomes_3_0: Freqgnomad;
    gnomad_genomes_3_1_1: Freqgnomad;
}

export interface IVariantGene {
    id: any;
    location: string;
    omim_gene_id: string;
    symbol: string;
    cosmic: IArrangerResultsTree<CosmicEntity>;
    ddd: IArrangerResultsTree<DddEntity>;
    hpo: IArrangerResultsTree<HpoEntity>;
    omim: IArrangerResultsTree<OmimEntity>;
    orphanet: IArrangerResultsTree<OrphanetEntity>;
}

export interface IVariantConsequence {
    id: string;
    symbol: string;
    consequences: string[];
    vep_impact: Impact;
    aa_change: string | undefined | null;
    impact_score: number | null;
    canonical: boolean;
    coding_dna_change: string;
    strand: string;
    refseq_mrna_id: string;
    ensembl_transcript_id: string;
    ensembl_gene_id: string;
    predictions: IPredictionEntity;
    conservations: IConservationsEntity;
}

export interface IPredictionEntity {
    fathmm_pred: number;
    lrt_pred: string;
    lrt_converted_rankscore: number;
    revel_rankscore: number;
    sift_pred: string;
    polyphen2_hvar_pred: string;
    sift_converted_rankscore: number;
    cadd_rankscore: number;
    dann_rankscore: number;
    fathmm_converted_rankscore: number;
}

export interface IConservationsEntity {
    phylo_p17way_primate_rankscore: number;
}

export interface IVariantStudyEntity {
    id: string;
    participant_ids: string[];
    participant_number: number;
    study_id: string;
    frequencies: IVariantStudyFrequencies;
}

export interface IStudyEntity {
    id: string;
    domain: string;
}

export interface IVariantStudyFrequencies {
    upper_bound_kf: BoundType;
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

export type BoundType = {
    ac: number;
    homozygotes: number;
};

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

export type OmimEntity = {
    id: string;
    omim_id: string;
    name: string;
    inheritance: OmimInheritance | undefined | null;
};

export type HpoEntity = {
    id: string;
    hpo_term_label: string;
    hpo_term_id: string;
};

export type DddEntity = {
    id: string;
    disease_name: string;
};

export type CosmicEntity = {
    id: string;
    tumour_types_germline: string[];
};

export type OrphanetEntity = {
    id: string;
    panel: string;
    inheritance: OrphanetInheritance | null | undefined;
    disorder_id: number;
};

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
