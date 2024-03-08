import EntityStatistics, { DEFAULT_ENTITY_STATISTIC_DICTIONARY } from '@ferlab/ui/core/pages/EntityPage/EntityStatistics';
import { Meta } from '@storybook/react';
import React from 'react';


const statistic = {
    dataCategory: {
        data: [
            {
                frequency: '',
                id: 'Transcriptomics',
                label: 'Transcriptomics',
                value: 580,
            },
            {
                frequency: '',
                id: 'Genomics',
                label: 'Genomics',
                value: 459,
            },
            {
                frequency: '',
                id: 'Proteomics',
                label: 'Proteomics',
                value: 479,
            },
            {
                frequency: '',
                id: 'Metabolomics',
                label: 'Metabolomics',
                value: 420,
            },
        ],
        filter: {
            total: 10,
        },
        loading: false,
    },
    dataType: {
        data: [
            {
                frequency: '',
                id: 'Gene Expression Quantifications',
                label: 'Gene Expression Quantifications',
                value: 580,
            },
            {
                frequency: '',
                id: 'Gene Fusions',
                label: 'Gene Fusions',
                value: 580,
            },
            {
                frequency: '',
                id: 'Aligned Reads',
                label: 'Aligned Reads',
                value: 606,
            },
            {
                frequency: '',
                id: 'Unaligned Reads',
                label: 'Unaligned Reads',
                value: 402,
            },
            {
                frequency: '',
                id: 'Protein abundance (absolute protein concentration)',
                label: 'Protein abundance (absolute protein concentration)',
                value: 479,
            },
            {
                frequency: '',
                id: 'gVCF',
                label: 'gVCF',
                value: 459,
            },
            {
                frequency: '',
                id: 'Variant Calls',
                label: 'Variant Calls',
                value: 453,
            },
            {
                frequency: '',
                id: 'Preprocessed metabolite relative abundance',
                label: 'Preprocessed metabolite relative abundance',
                value: 420,
            },
            {
                frequency: '',
                id: 'Other',
                label: 'Other',
                value: 21,
            },
        ],
        filter: {
            total: 10,
        },
        loading: false,
    },
    demography: {
        ethnicity: [
            {
                frequency: 81.82674199623352,
                id: 'Not Hispanic or Latino',
                label: 'Not Hispanic or Latino',
                value: 869,
            },
            {
                frequency: 14.40677966101695,
                id: 'Hispanic or Latino',
                label: 'Hispanic or Latino',
                value: 153,
            },
            {
                frequency: 3.766478342749529,
                id: 'Unknown',
                label: 'Unknown',
                value: 40,
            },
        ],
        loading: false,
        race: [
            {
                frequency: 84.46327683615819,
                id: 'White',
                label: 'White',
                value: 897,
            },
            {
                frequency: 10.64030131826742,
                id: 'Unknown',
                label: 'Unknown',
                value: 113,
            },
            {
                frequency: 2.2598870056497176,
                id: 'Black or African American',
                label: 'Black or African American',
                value: 24,
            },
            {
                frequency: 1.7890772128060264,
                id: 'Asian',
                label: 'Asian',
                value: 19,
            },
            {
                frequency: 0.6591337099811676,
                id: 'American Indian or Alaska Native',
                label: 'American Indian or Alaska Native',
                value: 7,
            },
            {
                frequency: 0.18832391713747645,
                id: 'Native Hawaiian or Other Pacific Islander',
                label: 'Native Hawaiian or Other Pacific Islander',
                value: 2,
            },
        ],
        sex: [
            {
                frequency: 52.07156308851224,
                id: 'female',
                label: 'female',
                value: 553,
            },
            {
                frequency: 47.92843691148776,
                id: 'male',
                label: 'male',
                value: 509,
            },
        ],
    },
    downSyndromeStatus: {
        data: [
            {
                frequency: 64.87758945386064,
                id: 'T21',
                label: 'T21',
                value: 689,
            },
            {
                frequency: 35.122410546139356,
                id: 'D21',
                label: 'D21',
                value: 373,
            },
        ],
        loading: false,
    },
    mondo: {
        data: [
            {
                id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the cardiovascular system (HP:0001626)-Abnormality of cardiovascular system morphology (HP:0030680)-Abnormal heart morphology (HP:0001627)',
                label: 'Abnormal heart morphology (HP:0001627)',
                value: 246,
            },
            {
                id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the endocrine system (HP:0000818)-Abnormality of the thyroid gland (HP:0000820)-Abnormality of thyroid physiology (HP:0002926)-Hypothyroidism (HP:0000821)',
                label: 'Hypothyroidism (HP:0000821)',
                value: 239,
            },
            {
                id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the nervous system (HP:0000707)-Abnormal nervous system physiology (HP:0012638)-Behavioral abnormality (HP:0000708)-Sleep disturbance (HP:0002360)-Sleep apnea (HP:0010535)',
                label: 'Sleep apnea (HP:0010535)',
                value: 161,
            },
            {
                id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the respiratory system (HP:0002086)-Abnormal respiratory system physiology (HP:0002795)-Abnormal pattern of respiration (HP:0002793)-Apnea (HP:0002104)-Sleep apnea (HP:0010535)',
                label: 'Sleep apnea (HP:0010535)',
                value: 161,
            },
        ],
        filter: {
            excludes: ['Hypothyroidism (HP:0000821)'],
            total: 10,
            unique: true,
        },
        loading: false,
    },
    phenotype: {
        data: [
            {
                id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the cardiovascular system (HP:0001626)-Abnormality of cardiovascular system morphology (HP:0030680)-Abnormal heart morphology (HP:0001627)',
                label: 'Abnormal heart morphology (HP:0001627)',
                value: 246,
            },
            {
                id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the endocrine system (HP:0000818)-Abnormality of the thyroid gland (HP:0000820)-Abnormality of thyroid physiology (HP:0002926)-Hypothyroidism (HP:0000821)',
                label: 'Hypothyroidism (HP:0000821)',
                value: 239,
            },
            {
                id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the nervous system (HP:0000707)-Abnormal nervous system physiology (HP:0012638)-Behavioral abnormality (HP:0000708)-Sleep disturbance (HP:0002360)-Sleep apnea (HP:0010535)',
                label: 'Sleep apnea (HP:0010535)',
                value: 161,
            },
            {
                id: 'Phenotypic abnormality (HP:0000118)-Abnormality of the respiratory system (HP:0002086)-Abnormal respiratory system physiology (HP:0002795)-Abnormal pattern of respiration (HP:0002793)-Apnea (HP:0002104)-Sleep apnea (HP:0010535)',
                label: 'Sleep apnea (HP:0010535)',
                value: 161,
            },
        ],
        filter: {
            excludes: [
                'complete trisomy 21 (MONDO:0700030)',
                'Down syndrome (MONDO:0008608)',
                'mosaic translocation Down syndrome (MONDO:0700129)',
                'mosaic trisomy 21 (MONDO:0700127)',
                'partial segmental duplication (MONDO:0700130)',
                'translocation Down syndrome (MONDO:0700128)',
            ],
            total: 10,
            unique: true,
        },
        loading: false,
    },
    sampleAvailability: {
        data: [
            {
                frequency: '',
                id: 'available',
                label: 'available',
                value: 28657,
            },
            {
                frequency: '',
                id: 'unavailable',
                label: 'unavailable',
                value: 10773,
            },
        ],
        loading: false,
    },
    sampleType: {
        data: [
            {
                frequency: '',
                id: 'Plasma',
                label: 'Plasma',
                value: 12766,
            },
            {
                frequency: '',
                id: 'White Blood Cells',
                label: 'White Blood Cells',
                value: 10577,
            },
            {
                frequency: '',
                id: 'Red Blood Cells',
                label: 'Red Blood Cells',
                value: 8190,
            },
            {
                frequency: '',
                id: 'DNA',
                label: 'DNA',
                value: 2476,
            },
            {
                frequency: '',
                id: 'RNA',
                label: 'RNA',
                value: 2129,
            },
            {
                frequency: '',
                id: 'Peripheral Whole Blood',
                label: 'Peripheral Whole Blood',
                value: 1247,
            },
            {
                frequency: '',
                id: 'PBMCs',
                label: 'PBMCs',
                value: 895,
            },
            {
                frequency: '',
                id: 'CD4+ Tconv Cells',
                label: 'CD4+ Tconv Cells',
                value: 179,
            },
            {
                frequency: '',
                id: 'Monocytes',
                label: 'Monocytes',
                value: 176,
            },
            {
                frequency: '',
                id: 'NK Cells',
                label: 'NK Cells',
                value: 168,
            },
            {
                frequency: '',
                id: 'CD8+ T Cells',
                label: 'CD8+ T Cells',
                value: 151,
            },
            {
                frequency: '',
                id: 'B Cells',
                label: 'B Cells',
                value: 129,
            },
            {
                frequency: '',
                id: 'Granulocytes',
                label: 'Granulocytes',
                value: 89,
            },
            {
                frequency: '',
                id: 'Blood Smear Slide',
                label: 'Blood Smear Slide',
                value: 78,
            },
            {
                frequency: '',
                id: 'Regulatory T Cells',
                label: 'Regulatory T Cells',
                value: 57,
            },
            {
                frequency: '',
                id: 'Buffy Coat',
                label: 'Buffy Coat',
                value: 53,
            },
            {
                frequency: '',
                id: 'ATAC-Seq Sample',
                label: 'ATAC-Seq Sample',
                value: 46,
            },
            {
                frequency: '',
                id: 'Saliva',
                label: 'Saliva',
                value: 24,
            },
        ],
        loading: false,
    },
};


export default {
    title: "@ferlab/Pages/EntityPage/EntityStatistics",
    component: EntityStatistics,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

export const EntityStatisticsStory = () => (
    <div style={{width: '1400px', height: '1000px' }}>
        <EntityStatistics
            header='Entity Statistic'
            id='entity-statistic'
            loading={false}
            statistic={statistic}
            title= 'Data'
            dictionary={DEFAULT_ENTITY_STATISTIC_DICTIONARY}
        />
    </div>
);