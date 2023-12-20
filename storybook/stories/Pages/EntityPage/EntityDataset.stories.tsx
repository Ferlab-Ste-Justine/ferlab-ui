import React from 'react';
import { Meta } from '@storybook/react';
import EntityDataset from '@ferlab/ui/core/pages/EntityPage/EntityDataset';

export default {
    title: '@ferlab/Pages/EntityPage/EntityDataset',
    component: EntityDataset,
    decorators: [(Story) => <Story />],
    argTypes: {
        file_count: {
            control: 'text',
        },
        header: {
            control: 'text',
        },
        loading: {
            control: 'boolean',
        },
        descriptions: {
            control: 'array',
        },
    },
} as Meta;

const props = {
    descriptions: [
        { label: 'Label 1', value: 'Value 1' },
        { label: 'Label 2', value: 'Value 2' },
        { label: 'Label 3', value: 'Value 3' },
    ],
    dictionnary: {
        participants: 'Participants Label',
        files: 'Files Label',
    },
    file_count: 10,
    header: 'Header',
    id: 'entity-dataset',
    loading: false,
    participant_count: 5,
    title: 'Entity Dataset Title',
};

export const EntityDatasetStory = () => <EntityDataset {...props} />;
