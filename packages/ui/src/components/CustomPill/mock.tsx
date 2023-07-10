import { ISavedFilter, SavedFilterTypeEnum } from '../QueryBuilder/types';

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
    title: 'Custom Pill 1',
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
