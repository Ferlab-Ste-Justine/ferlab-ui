import EntityVariantSummary, { ISummaryProps } from '@ferlab/ui/core/pages/EntityPage/EntityVariantSummary';
import { Meta } from '@storybook/react';
import React from 'react';

export default {
    title: '@ferlab/Pages/EntityPage/EntityVariantSummary',
    component: EntityVariantSummary,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const EntityVariantSummaryStory = ({ storyTitle, ...props }: { storyTitle: string; props: ISummaryProps }) => (
    <>
        <h3>{storyTitle}</h3>
        <EntityVariantSummary {...props} />
    </>
);

export const BasicEntityVariantSummary = EntityVariantSummaryStory.bind({});
BasicEntityVariantSummary.args = {
    id: 'ID',
    loading: false,
    noDataLabel: 'No data available',
    data: {
        banner: [
            { label: 'Item 1', value: 'Value 1' },
            { label: 'Item 2', value: 'Value 2' },
            { label: 'Item 3', value: 'Value 3' },
            { label: 'Item 4', value: 'Value 4' },
            { label: 'Item 5', value: 'Value 5' },
        ],
        info: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
        details: {
            leftSection: {
                title: 'Block 1',
                items: [
                    { label: 'Item 1', value: 'Value 1' },
                    { label: 'Item 2', value: 'Value 2' },
                    { label: 'Item 3', value: 'Value 3' },
                    { label: 'Item 4', value: 'Value 4' },
                    { label: 'Item 5', value: 'Value 5' },
                    { label: 'Item 6', value: 'Value 6' },
                ],
            },
            middleSection: [
                {
                    title: 'Block 2.1',
                    items: [
                        { label: 'Item 1', value: 'Value 1' },
                        { label: 'Item 2', value: 'Value 2' },
                    ],
                },
                {
                    title: 'Block 2.2',
                    items: [{ label: 'Item 1', value: 'Value 1' }],
                },
            ],
            rightSection: {
                title: 'Block 3',
                items: [
                    { label: 'Item 1', value: 'Value 1' },
                    { label: 'Item 2', value: 'Value 2' },
                    { label: 'Item 3', value: 'Value 3' },
                ],
            },
        },
    },
};
