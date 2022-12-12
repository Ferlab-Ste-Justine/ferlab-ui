import React from "react";
import { Meta, Story } from "@storybook/react/types-6-0";
import VariantEntity, { IVariantEntityProps } from "@ferlab/ui/pages/VariantEntity";
import { Impact, IParticipantQueryParams, IVariantEntity, IVariantEntityDictionary } from "@ferlab/ui/pages/VariantEntity/types";

export default {
    title: "@ferlab/Pages/VariantEntity",
    component: VariantEntity,
    decorators: [(Story) => <Story />],
} as Meta<typeof VariantEntity>;

const participantQueryParams: IParticipantQueryParams = {
    field: 'participant_id',
    index: 'participant',
    queryBuilderId: 'storybook-qb-id',
    route: 'route',
  };

const dictionary: IVariantEntityDictionary = {
    summary: {
        summary: 'Summary',
        type: 'Type',
        chromosome: 'Chromosome',
        position: 'Position',
        cytoband: 'Cytoband',
        alternativeAllele: 'Alternative allele',
        altAllele: 'ALT Allele',
        referenceAllele: 'Reference allele',
        refAllele: 'REF Allele',
        referenceGenome: 'Reference Genome',
        studies: 'Studies',
        participants: 'Participants',
        genes: 'Genes',
        omim: 'OMIM',
        clinVar: 'ClinVar',
        gnomadGenome311: 'gnomAD Genome (v3.1.1)',
        dbSNP: 'dbSNP',
      },
      consequences: {
        consequence: 'Consequence',
        impactTag: {
          modifier: 'MODIFIER',
          low: 'LOW',
          moderate: 'MODERATE',
          high: 'HIGH',
        },
        aaColumnTooltip: 'Amino acid substitution',
        aaColumn: 'AA',
        cdnaChangeColumn: 'coding DNA',
        strand: 'Strand',
        vep: 'VEP',
        predictions: {
          predictions: 'Predictions',
          sift: 'Sift',
          polyphen2: 'Polyphen2',
          fathmm: 'Fathmm',
          cadd: 'Cadd',
          dann: 'Dann',
          lrt: 'Lrt',
          revel: 'Revel',
        },
        seeLess: 'See less',
        seeMore: 'See more',
        conservationColumn: 'Conservation',
        transcript: 'Transcript',
        canonical: 'Canonical transcript',
        refSeq: 'RefSeq',
        geneConsequence: 'Gene Consequence',
        gene: 'Gene',
        omim: 'OMIM',
        hideTranscript: 'Show less',
        showTranscript: (count: number = 3) => `${count} other transcripts`,
        noDataAvailable: 'No data available',
      },
      frequencies: {
        kfStudies: 'Kids First Studies',
        publicCohorts: 'Public Cohorts',
        studies: 'Studies',
        domain: 'Domain',
        participantsInfoIconTooltip: 'Due to participant confidentiality, links may return a smaller number than displayed',
        participantsTooltip: '# of affected participants across Kids First studies',
        participants: 'Participants',
        frequency: 'Frequency',
        frequencyTooltip: 'Frequency of the variant across Kids First studies',
        altAlleles: 'ALT Alleles',
        altAllelesTooltip: 'Number of alternative alleles',
        homozygotes: 'Homozygotes',
        homozygotesTooltip: 'Number of homozygote variants',
        total: 'Total',
        cohort: 'Cohort',
        altRef: 'Alleles (ALT + REF)',
        altRefTooltip: 'Alternative alleles + Reference alleles',
        noDataAvailable: 'No data available for this variant',
      },
      pathogenicity: {
        pathogenicity: 'Pathogenicity',
        clinVar: 'ClinVar',
        genePhenotype: 'Gene - Phenotype',
        source: 'Source',
        gene: 'Gene',
        condition: 'Condition',
        inheritance: 'Inheritance',
        inheritances: 'Inheritances',
        interpretation: 'Interpretation',
      }
}

const variant: IVariantEntity = {
    alternate: 'T',
    chromosome: '10',
    clinvar: {
        clinvar_id: '850024',
        clin_sig: ['Uncertain_significance'],
        conditions: ['Brugada syndrome 4'],
        inheritance: ['germline']
    },
    genome_build: 'GRCh38',
    hgvsg: 'chr10:g.122455024G>T',
    id: 'OLK63HwBxS_wf2ymadU5',
    locus: '10-122455024-G-T',
    participant_number: 1,
    participant_total_number: 11030,
    reference: 'G',
    rsnumber: 'rs767767755',
    start: 122455024,
    variant_class: 'SNV',
    consequences: {
        hits: {
            edges: [
                {
                    node: {
                        id: 'OLK63HwBxS_wf2ymadU5',
                        canonical: true,
                        consequences: ['splice_region_variant', 'synonymous_variant'],
                        conservations: {phylo_p17way_primate_rankscore: 0.999},
                        ensembl_gene_id: 'ENSG00000254636',
                        ensembl_transcript_id: 'ENST00000528446',
                        impact_score: 2,
                        biotype: 'protein_coding',
                        hgvsc: 'ENST00000528446.1:c.112C>T',
                        hgvsp: 'ENSP00000436682.1:p.Arg38Ter',
                        predictions: {
                            cadd_rankscore: 0.66174,
                            dann_rankscore: 0.98917,
                            fathmm_converted_rankscore: 0.49358,
                            fathmm_pred: 1,
                            lrt_converted_rankscore: 0.8433,
                            lrt_pred: 'D',
                            polyphen2_hvar_pred: 'B',
                            revel_rankscore: 0.77205,
                            sift_converted_rankscore: 0.91255,
                            sift_pred: 'D',
                        },
                        refseq_mrna_id: 'NM_001099667',
                        strand: '1',
                        symbol: 'ARMS2',
                        vep_impact: Impact.Low,
                    }
                }
            ]
        }
    },
    frequencies: {        
        gnomad_exomes_2_1: {
            ac: 3,
            af: 0.000014643289468546215,
            an: 204872,
            homozygotes: 19,
        },
        gnomad_genomes_2_1: {
            ac: 3,
            af: 0.000014643289468546215,
            an: 204872,
            homozygotes: 23,
        },
        gnomad_genomes_3_0: {
            ac: 1,
            af: 0.000006980315510261064,
            an: 143260,
            homozygotes: 33
        },
        gnomad_genomes_3_1_1: {
            ac: 1,
            af: 0.00000657194,
            an: 152162,
            homozygotes: 4
        },
        internal: {
            upper_bound_kf: {
                ac: 1,
                homozygotes: 11,
            }
        },
        one_thousand_genomes: {
            ac: 1,
            af: 0.00000657194,
            an: 152162,
            homozygotes: 26
        },
        topmed: {
            ac: 1,
            af: 0.00000796381,
            an: 125568,
            homozygotes: 5
        },
    },
    genes: {
        hits: {
            edges: [
                {
                    node: {
                        id: 'OLK63HwBxS_wf2ymadU5',
                        location: '10q26.13',
                        omim_gene_id: '611313',
                        symbol: 'ARMS2',
                        cosmic: {
                            hits: {
                                edges: []
                            }
                        },
                        ddd: {
                            hits: {
                                edges: []
                            }
                        },
                        hpo: {
                            hits: {
                                edges: []
                            }
                        },
                        omim: {
                            hits: {
                                edges: [{
                                    node: {
                                        id: 'OLK63HwBxS_wf2ymadU5',
                                        inheritance: [['Autosomal dominant']],
                                        name: 'Macular degeneration, age-related, 8',
                                        omim_id: '613778',
                                    }
                                }]
                            }
                        },
                        orphanet: {
                            hits: {
                                edges: [{
                                    node: {
                                        id: 'OLK63HwBxS_wf2ymadU5',
                                        disorder_id: 3259,
                                        inheritance: [['Biallelic']],
                                        panel: "NON RARE IN EUROPE: Age-related macular degeneration",
                                    }
                                }]
                            }
                        },
                    }
                }
            ]
        }
    },
    studies: {
        hits: {
            edges: [
                {
                    node: {  
                        id: 'OLK63HwBxS_wf2ymadU5',                  
                        frequencies: {
                            upper_bound_kf: {
                                ac: 1,
                                homozygotes: 0,
                            }
                        },
                        participant_ids: ['PT_0XQZQZ0J'],
                        participant_number: 1,
                        study_id: 'SD_BHJXBDQK',
                    }
                }
            ]
        }
    },
};

const VariantEntityStory = ({...props}: {props: Story<IVariantEntityProps>}) => (
    <VariantEntity 
        loading={false} 
        participantQueryParams={participantQueryParams}
        dictionary={dictionary}
        {...props}  
    />
)

export const VariantEntityEmpty = VariantEntityStory.bind({});
export const VariantEntityLoading = VariantEntityStory.bind({});
export const VariantEntityWithData = VariantEntityStory.bind({});

VariantEntityLoading.args = {loading: true}
VariantEntityWithData.args = {variant}