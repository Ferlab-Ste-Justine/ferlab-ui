
import React from "react";
import { Meta } from "@storybook/react";
import ConsequencesCell, { IConsequenceEntity } from '@ferlab/ui/components/Consequences/Cell';
import { IArrangerEdge } from "@ferlab/ui/graphql/types";

const data = [
    {
        "node": {
            "aa_change": "p.Arg151Ter",
            "amino_acids": {
                "reference": "R",
                "variant": "*"
            },
            "canonical": false,
            "cdna_position": "502",
            "cds_position": "451",
            "coding_dna_change": "c.451G>A",
            "codons": {
                "reference": "Cga",
                "variant": "Tga"
            },
            "consequence": [
                "stop gained"
            ],
            "conservations": {
                "phyloP100way_vertebrate": -3.864,
                "phyloP17way_primate": -1.463
            },
            "ensembl_feature_id": "ENST00000372333",
            "ensembl_transcript_id": "ENST00000372333",
            "exon": {
                "rank": "4",
                "total": 4
            },
            "feature_type": "Transcript",
            "hgvsc": "ENST00000372333.3:c.451C>T",
            "hgvsp": "ENSP00000361408.3:p.Arg151Ter",
            "impact_score": 4,
            "intron": null,
            "mane_plus": false,
            "mane_select": false,
            "picked": true,
            "predictions": {
                "cadd_phred": 0.219,
                "cadd_score": -0.373276,
                "dann_score": 0.9572040498913029,
                "fathmm_pred": null,
                "fathmm_score": null,
                "lrt_pred": null,
                "lrt_score": null,
                "polyphen2_hvar_pred": null,
                "polyphen2_hvar_score": null,
                "revel_score": null,
                "sift_pred": null,
                "sift_score": null
            },
            "protein_position": "151",
            "refseq_mrna_id": null,
            "strand": "-1",
            "uniprot_id": null,
            "vep_impact": "HIGH"
        }
    },
    {
        "node": {
            "aa_change": "p.Pro210=",
            "amino_acids": {
                "reference": "P",
                "variant": null
            },
            "canonical": true,
            "cdna_position": "817",
            "cds_position": "630",
            "coding_dna_change": "c.630G>A",
            "codons": {
                "reference": "ccC",
                "variant": "ccT"
            },
            "consequence": [
                "synonymous"
            ],
            "conservations": null,
            "ensembl_feature_id": "ENST00000372336",
            "ensembl_transcript_id": "ENST00000372336",
            "exon": {
                "rank": "4",
                "total": 4
            },
            "feature_type": "Transcript",
            "hgvsc": "ENST00000372336.3:c.630C>T",
            "hgvsp": "ENSP00000361411.3:p.Pro210=",
            "impact_score": 2,
            "intron": null,
            "mane_plus": false,
            "mane_select": true,
            "picked": false,
            "predictions": null,
            "protein_position": "210",
            "refseq_mrna_id": [
                "NM_153367"
            ],
            "strand": "-1",
            "uniprot_id": "A0A024QZP0",
            "vep_impact": "LOW"
        }
    }
] as IArrangerEdge<IConsequenceEntity>[];

export default {
    title: "@ferlab/Components/Consequences/Cell",
    component: ConsequencesCell,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
    argTypes: {
        title: {
            control: "string",
        },
    },
} as Meta;

export const ConsequencesCellStory = () => (
<>
  <h3>Consequences Cell with empty data</h3>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ConsequencesCell consequences={data} symbol="ZCCHC24" emptyText="No data available" />
    </div>
</>);

export const ConsequencesCellWitNO_GENEStory = () => (
<>
  <h3>Consequences Cell with NO_GENE symbol</h3>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
    <ConsequencesCell consequences={data} symbol="NO_GENE" emptyText="No data available" />
    </div>
</>);