import React from 'react';
import OntologyTreeModal from '@ferlab/ui/core/components/OntologyTreeFilter';
import { Meta } from '@storybook/react';
import { TermOperators } from '@ferlab/ui/core/data/sqon/operators';


const MOCK_API = [
    {
        doc_count: 7175,
        filter_by_term: {
            doc_count: 539,
        },
        key: 'Phenotypic abnormality (HP:0000118)',
        top_hits: {
            parents: ['All (HP:0000001)'],
        },
    },
    {
        doc_count: 277,
        filter_by_term: {
            doc_count: 18,
        },
        key: 'Abnormal heart valve morphology (HP:0001654)',
        top_hits: {
            parents: ['Abnormal heart morphology (HP:0001627)'],
        },
    },
    {
        doc_count: 7175,
        filter_by_term: {
            doc_count: 0,
        },
        key: 'All (HP:0000001)',
        top_hits: {
            parents: [],
        },
    },
    {
        doc_count: 4413,
        filter_by_term: {
            doc_count: 308,
        },
        key: 'Abnormality of the nervous system (HP:0000707)',
        top_hits: {
            parents: ['Phenotypic abnormality (HP:0000118)'],
        },
    },
    {
        doc_count: 4293,
        filter_by_term: {
            doc_count: 253,
        },
        key: 'Abnormality of the cardiovascular system (HP:0001626)',
        top_hits: {
            parents: ['Phenotypic abnormality (HP:0000118)'],
        },
    },
    {
        doc_count: 4353,
        filter_by_term: {
            doc_count: 0,
        },
        key: 'Abnormal nervous system physiology (HP:0012638)',
        top_hits: {
            parents: ['Abnormality of the nervous system (HP:0000707)'],
        },
    },
    {
        doc_count: 3729,
        filter_by_term: {
            doc_count: 202,
        },
        key: 'Abnormality of cardiovascular system morphology (HP:0030680)',
        top_hits: {
            parents: ['Abnormality of the cardiovascular system (HP:0001626)'],
        },
    },
    {
        doc_count: 3556,
        filter_by_term: {
            doc_count: 985,
        },
        key: 'Abnormal heart morphology (HP:0001627)',
        top_hits: {
            parents: ['Abnormality of cardiovascular system morphology (HP:0030680)'],
        },
    },
];


export default {
    title: '@ferlab/Components/OntologyTreeModal',
    component: OntologyTreeModal,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

export const OntologyTreeModalStory = () => (
  <>
  <h3>OntologyTreeModal Story</h3>
  <div>
    <OntologyTreeModal open={true} data={MOCK_API} loading={false} handleCancel={() => console.log('handleCancel')} handleOnApply={() => console.log('handleOnApply')} />
  </div>
  </>
)

export const OntologyTreeModalLoadingStory = () => (
  <>
  <h3>OntologyTreeModal Loading Story</h3>
  <div>
    <OntologyTreeModal open={true} data={[]} loading={true} handleCancel={() => console.log('handleCancel')} handleOnApply={() => console.log('handleOnApply')} />
  </div>
  </>
)