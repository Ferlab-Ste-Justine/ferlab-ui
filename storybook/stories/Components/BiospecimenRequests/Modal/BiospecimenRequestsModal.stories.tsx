import React from 'react';
import { Meta } from '@storybook/react';
import RequestBiospecimenButton from '@ferlab/ui/core/components/BiospecimenRequest/RequestBiospecimenButton';
import { DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY } from '@ferlab/ui/core/components/BiospecimenRequest/requestBiospecimen.utils';
import { Space } from 'antd';

const columns = [
    {
        key: 'study_code',
        title: 'Study Code',
        dataIndex: 'study_code',
    },
    {
        key: 'nb_participants',
        title: 'Particpants',
        dataIndex: 'nb_participants',
    },
    {
        key: 'nb_available_samples',
        title: 'Available Samples',
        dataIndex: 'nb_available_samples',
    },
];

const data = [
    {
        study_code: 'code 1',
        study_name: 'name 1',
        nb_participants: 2,
        nb_available_samples: 3,
    },
    {
        study_code: 'code 2',
        study_name: 'name 2',
        nb_participants: 1,
        nb_available_samples: 1,
    },
];

const sqon = {
    content: [
        {
            content: { field: 'sample_id', index: 'biospecimen', value: ['BS_2AMK1CT2', 'BS_40Q97WCY', 'BS_1WWPQ3HY'] },
            op: 'in',
        },
    ],
    id: 'de286c30-9918-4459-92b7-c91f5805fd87',
    op: 'and',
};

export default {
    title: '@ferlab/Components/BiospecimentRequest',
    component: RequestBiospecimenButton,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

export const RequestBiospecimenButtonStories = () => (
    <Space size={20}>
        <div>
            <h2>Basic Modal</h2>
            <RequestBiospecimenButton
                createAndFetchReport={(name: string) => {
                    console.log('createAndFetchReport(name)', name);
                }}
                dictionary={DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY}
                columns={columns}
                getSamples={() => {
                    return {
                        error: undefined,
                        loading: false,
                        result: data,
                    };
                }}
                getSavedSets={() => {
                    return {
                        isLoading: false,
                        savedSets: [],
                    };
                }}
                nbBiospecimenSelected={2}
                sqon={sqon}
            />
        </div>
        <div>
            <h2>Limit Modal</h2>
            <RequestBiospecimenButton
                createAndFetchReport={(name: string) => {
                    console.log('createAndFetchReport(name)', name);
                }}
                dictionary={DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY}
                columns={columns}
                getSamples={() => {
                    return {
                        error: undefined,
                        loading: false,
                        result: data,
                    };
                }}
                getSavedSets={() => {
                    return {
                        isLoading: false,
                        savedSets: [],
                    };
                }}
                nbBiospecimenSelected={20000}
            />
        </div>
        <div>
            <h2>No Sample Modal</h2>
            <RequestBiospecimenButton
                createAndFetchReport={(name: string) => {
                    console.log('createAndFetchReport(name)', name);
                }}
                dictionary={DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY}
                columns={columns}
                getSamples={() => {
                    return {
                        error: undefined,
                        loading: false,
                        result: [],
                    };
                }}
                getSavedSets={() => {
                    return {
                        isLoading: false,
                        savedSets: [],
                    };
                }}
                nbBiospecimenSelected={2}
            />
        </div>
        <div>
            <h2>Error Modal</h2>
            <RequestBiospecimenButton
                createAndFetchReport={(name: string) => {
                    console.log('createAndFetchReport(name)', name);
                }}
                dictionary={DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY}
                columns={columns}
                getSamples={() => {
                    return {
                        error: 'error',
                        loading: false,
                        result: data,
                    };
                }}
                getSavedSets={() => {
                    return {
                        isLoading: false,
                        savedSets: [],
                    };
                }}
                nbBiospecimenSelected={2}
            />
        </div>
    </Space>
);
