import React from 'react';
import QueriesSidebar, { IQueriesSidebarProps } from '@ferlab/ui/components/CustomPill/QueriesSidebar/index';
import { ISavedFilter, SavedFilterTypeEnum } from '@ferlab/ui/components/QueryBuilder/types';
import { Meta } from '@storybook/react/types-6-0';

const customPillOne: ISavedFilter = {
    favorite: false,
    id: 'eb6b7dd4-6415-42b5-a270-4c6a404c1284',
    queries: [
        {
            content: [
                {
                    content: {
                        field: 'consequences.vep_impact',
                        index: 'Variants',
                        value: ['MODIFIER'],
                    },
                    op: 'in',
                },
                {
                    content: {
                        field: 'consequences.consequences',
                        index: 'Variants',
                        value: ['upstream_gene_variant'],
                    },
                    op: 'in',
                },
            ],
            id: '2a1fb1e7-4e15-4b90-9d23-4f29a9c86e00',
            op: 'and',
        },
    ],
    title: 'Custom Pill 1 or maybe another name for this pill',
    type: SavedFilterTypeEnum.Custom_pill,
};

const customPillTwo: ISavedFilter = {
    favorite: false,
    id: 'ad6b7dd4-6415-42b5-a270-4c6a404c1284',
    queries: [
        {
            content: [
                {
                    content: {
                        field: 'consequences.vep_impact',
                        index: 'Variants',
                        value: ['HIGH'],
                    },
                    op: 'in',
                },
                {
                    content: {
                        field: 'consequences.consequences',
                        index: 'Variants',
                        value: ['intron_variant', 'upstream_gene_variant'],
                    },
                    op: 'in',
                },
            ],
            id: '6g1fb1e7-4e15-4b90-9d23-4f29a9c86e00',
            op: 'and',
        },
    ],
    title: 'Custom Pill 2',
    type: SavedFilterTypeEnum.Custom_pill,
};

export default {
    title: '@ferlab/Components/CustomPill/QueriesSidebar',
    component: QueriesSidebar,
    decorators: [
        (Story) => (
            <>
                <h2>{Story.name}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const QueriesSidebarStory = ({ title, ...props }: { title: string; props: IQueriesSidebarProps }) => (
    <>
        <h3>{title}</h3>
        <div
            style={{
                padding: '10px',
                border: '1px solid lightgray',
                width: '300px',
            }}
        >
            <QueriesSidebar {...props} />
        </div>
    </>
);

export const WithoutPill = QueriesSidebarStory.bind({});
WithoutPill.args = {
    title: 'Custom pill sidebar without pill',
    customPills: [],
    dictionary: {
        emptyText:
            'Vous pouvez créer des requêtes personnalisées en ajoutant des critères à la barre de requêtes et en cliquant sur le bouton sauvegarder.',
        learnMore: 'En savoir plus',
        title: 'Mes requetes',
    },
};

export const WithPills = QueriesSidebarStory.bind({});
WithPills.args = {
    title: 'Custom pill sidebar with pills',
    customPills: [customPillOne, customPillTwo],
    dictionary: {
        emptyText:
            'Vous pouvez créer des requêtes personnalisées en ajoutant des critères à la barre de requêtes et en cliquant sur le bouton sauvegarder.',
        learnMore: 'En savoir plus',
        title: 'Mes requetes',
    },
};
