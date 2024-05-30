import React from 'react';

import OntologyTreeTitle from './OntologyTreeTitle';
import {
    disableNodesInTree,
    extractCodeAndTitle,
    filterTransferTargetKeys,
    flattenTransferTargetKeys,
    getChildrenKeysByKey,
    getChildrenKeysByNode,
    legacyToNewOntologyTreeData,
    ontologyTreeDataToOntologyDataNode,
    ontologyTreeToTransferData,
    searchInOntologyTree,
} from './utils';

export const ONTOLOGY_TREE_MOCK_API_RESPONSE = [
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

const LEGACY_ONTOLOGY_TREE_DATA = legacyToNewOntologyTreeData(ONTOLOGY_TREE_MOCK_API_RESPONSE);

describe('OntologyTreeFilter utils', () => {
    test("legacyToNewOntologyTreeData should correctly convert server's respond", () => {
        expect(legacyToNewOntologyTreeData(ONTOLOGY_TREE_MOCK_API_RESPONSE)).toEqual([
            {
                doc_count: 7175,
                filter_by_term: {
                    doc_count: 539,
                },
                key: 'Phenotypic abnormality (HP:0000118)',
                top_hits: {
                    children: [
                        'Abnormality of the nervous system (HP:0000707)',
                        'Abnormality of the cardiovascular system (HP:0001626)',
                    ],
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
                    children: [],
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
                    children: ['Phenotypic abnormality (HP:0000118)'],
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
                    children: ['Abnormal nervous system physiology (HP:0012638)'],
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
                    children: ['Abnormality of cardiovascular system morphology (HP:0030680)'],
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
                    children: [],
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
                    children: ['Abnormal heart morphology (HP:0001627)'],
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
                    children: ['Abnormal heart valve morphology (HP:0001654)'],
                    parents: ['Abnormality of cardiovascular system morphology (HP:0030680)'],
                },
            },
        ]);
    });

    test('ontologyTreeDataToOntologyDataNode should create a antd tree compatible structure', () => {
        const ontologyTreeData = ontologyTreeDataToOntologyDataNode(LEGACY_ONTOLOGY_TREE_DATA);
        expect(ontologyTreeData).toEqual([
            {
                children: [
                    {
                        children: [
                            {
                                children: [],
                                key: 'Phenotypic abnormality HP:0000118-Abnormality of the nervous system HP:0000707-Abnormal nervous system physiology HP:0012638',
                                name: 'Abnormal nervous system physiology (HP:0012638)',
                                participantsCount: 4353,
                                participantsWithExactTerm: 0,
                                path: 'Phenotypic abnormality HP:0000118-Abnormality of the nervous system HP:0000707',
                                title: (
                                    <OntologyTreeTitle
                                        name="Abnormal nervous system physiology (HP:0012638)"
                                        participantsCount={4353}
                                        participantsWithExactTerm={0}
                                    />
                                ),
                            },
                        ],
                        key: 'Phenotypic abnormality HP:0000118-Abnormality of the nervous system HP:0000707',
                        name: 'Abnormality of the nervous system (HP:0000707)',
                        participantsCount: 4413,
                        participantsWithExactTerm: 308,
                        path: 'Phenotypic abnormality HP:0000118',
                        title: (
                            <OntologyTreeTitle
                                name="Abnormality of the nervous system (HP:0000707)"
                                participantsCount={4413}
                                participantsWithExactTerm={308}
                            />
                        ),
                    },
                    {
                        children: [
                            {
                                children: [
                                    {
                                        children: [
                                            {
                                                children: [],
                                                key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627-Abnormal heart valve morphology HP:0001654',
                                                name: 'Abnormal heart valve morphology (HP:0001654)',
                                                participantsCount: 277,
                                                participantsWithExactTerm: 18,
                                                path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                                                title: (
                                                    <OntologyTreeTitle
                                                        name="Abnormal heart valve morphology (HP:0001654)"
                                                        participantsCount={277}
                                                        participantsWithExactTerm={18}
                                                    />
                                                ),
                                            },
                                        ],
                                        key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                                        name: 'Abnormal heart morphology (HP:0001627)',
                                        participantsCount: 3556,
                                        participantsWithExactTerm: 985,
                                        path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                                        title: (
                                            <OntologyTreeTitle
                                                name="Abnormal heart morphology (HP:0001627)"
                                                participantsCount={3556}
                                                participantsWithExactTerm={985}
                                            />
                                        ),
                                    },
                                ],
                                key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                                name: 'Abnormality of cardiovascular system morphology (HP:0030680)',
                                participantsCount: 3729,
                                participantsWithExactTerm: 202,
                                path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                                title: (
                                    <OntologyTreeTitle
                                        name="Abnormality of cardiovascular system morphology (HP:0030680)"
                                        participantsCount={3729}
                                        participantsWithExactTerm={202}
                                    />
                                ),
                            },
                        ],
                        key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                        name: 'Abnormality of the cardiovascular system (HP:0001626)',
                        participantsCount: 4293,
                        participantsWithExactTerm: 253,
                        path: 'Phenotypic abnormality HP:0000118',
                        title: (
                            <OntologyTreeTitle
                                name="Abnormality of the cardiovascular system (HP:0001626)"
                                participantsCount={4293}
                                participantsWithExactTerm={253}
                            />
                        ),
                    },
                ],
                key: 'Phenotypic abnormality HP:0000118',
                name: 'Phenotypic abnormality (HP:0000118)',
                participantsCount: 7175,
                participantsWithExactTerm: 539,
                path: '',
                title: (
                    <OntologyTreeTitle
                        name="Phenotypic abnormality (HP:0000118)"
                        participantsCount={7175}
                        participantsWithExactTerm={539}
                    />
                ),
            },
        ]);
    });

    test('ontologyTreeToTransferData should return a antd transfer compatible array', () => {
        const transferData = ontologyTreeToTransferData(LEGACY_ONTOLOGY_TREE_DATA);
        expect(transferData).toEqual([
            {
                key: 'Phenotypic abnormality HP:0000118',
                title: 'Phenotypic abnormality (HP:0000118)',
            },
            {
                key: 'Phenotypic abnormality HP:0000118-Abnormality of the nervous system HP:0000707',
                title: 'Abnormality of the nervous system (HP:0000707)',
            },
            {
                key: 'Phenotypic abnormality HP:0000118-Abnormality of the nervous system HP:0000707-Abnormal nervous system physiology HP:0012638',
                title: 'Abnormal nervous system physiology (HP:0012638)',
            },
            {
                key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                title: 'Abnormality of the cardiovascular system (HP:0001626)',
            },
            {
                key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                title: 'Abnormality of cardiovascular system morphology (HP:0030680)',
            },
            {
                key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                title: 'Abnormal heart morphology (HP:0001627)',
            },
            {
                key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627-Abnormal heart valve morphology HP:0001654',
                title: 'Abnormal heart valve morphology (HP:0001654)',
            },
            {
                key: 'All (HP:0000001)',
                title: 'All (HP:0000001)',
            },
        ]);
    });

    test('searchInOntologyTree should return matching keys, selectedCount and a new tree when searching by title', () => {
        const ontologyTreeData = ontologyTreeDataToOntologyDataNode(LEGACY_ONTOLOGY_TREE_DATA);
        expect(searchInOntologyTree(ontologyTreeData[0], 'heart')).toEqual({
            keys: [
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627-Abnormal heart valve morphology HP:0001654',
                'Phenotypic abnormality HP:0000118',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                'Phenotypic abnormality HP:0000118',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                'Phenotypic abnormality HP:0000118',
            ],
            selectedCount: 2,
            tree: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [],
                                                    hasSearchTerm: true,
                                                    key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627-Abnormal heart valve morphology HP:0001654',
                                                    name: 'Abnormal heart valve morphology (HP:0001654)',
                                                    participantsCount: 277,
                                                    participantsWithExactTerm: 18,
                                                    path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                                                    title: (
                                                        <OntologyTreeTitle
                                                            name="Abnormal heart valve morphology (HP:0001654)"
                                                            participantsCount={277}
                                                            participantsWithExactTerm={18}
                                                            searchTerm={{
                                                                after: ' valve morphology HP:0001654',
                                                                before: 'Abnormal ',
                                                                query: 'heart',
                                                                regex: 'heart',
                                                                term: 'heart',
                                                            }}
                                                        />
                                                    ),
                                                },
                                            ],
                                            hasSearchTerm: true,
                                            key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                                            name: 'Abnormal heart morphology (HP:0001627)',
                                            participantsCount: 3556,
                                            participantsWithExactTerm: 985,
                                            path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                                            title: (
                                                <OntologyTreeTitle
                                                    name="Abnormal heart morphology (HP:0001627)"
                                                    participantsCount={3556}
                                                    participantsWithExactTerm={985}
                                                    searchTerm={{
                                                        after: ' morphology HP:0001627',
                                                        before: 'Abnormal ',
                                                        query: 'heart',
                                                        regex: 'heart',
                                                        term: 'heart',
                                                    }}
                                                />
                                            ),
                                        },
                                    ],
                                    hasSearchTerm: true,
                                    key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                                    name: 'Abnormality of cardiovascular system morphology (HP:0030680)',
                                    participantsCount: 3729,
                                    participantsWithExactTerm: 202,
                                    path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                                    title: (
                                        <OntologyTreeTitle
                                            name="Abnormality of cardiovascular system morphology (HP:0030680)"
                                            participantsCount={3729}
                                            participantsWithExactTerm={202}
                                        />
                                    ),
                                },
                            ],
                            hasSearchTerm: true,
                            key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                            name: 'Abnormality of the cardiovascular system (HP:0001626)',
                            participantsCount: 4293,
                            participantsWithExactTerm: 253,
                            path: 'Phenotypic abnormality HP:0000118',
                            title: (
                                <OntologyTreeTitle
                                    name="Abnormality of the cardiovascular system (HP:0001626)"
                                    participantsCount={4293}
                                    participantsWithExactTerm={253}
                                />
                            ),
                        },
                    ],
                    key: 'Phenotypic abnormality HP:0000118',
                    name: 'Phenotypic abnormality (HP:0000118)',
                    participantsCount: 7175,
                    participantsWithExactTerm: 539,
                    path: '',
                    title: (
                        <OntologyTreeTitle
                            name="Phenotypic abnormality (HP:0000118)"
                            participantsCount={7175}
                            participantsWithExactTerm={539}
                        />
                    ),
                },
            ],
        });
    });

    test('searchInOntologyTree should return matching keys, selectedCount and a new tree when searching by code', () => {
        const ontologyTreeData = ontologyTreeDataToOntologyDataNode(LEGACY_ONTOLOGY_TREE_DATA);
        expect(searchInOntologyTree(ontologyTreeData[0], 'HP:0001654')).toEqual({
            keys: [
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627-Abnormal heart valve morphology HP:0001654',
                'Phenotypic abnormality HP:0000118',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                'Phenotypic abnormality HP:0000118',
            ],
            selectedCount: 1,
            tree: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [],
                                                    hasSearchTerm: true,
                                                    key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627-Abnormal heart valve morphology HP:0001654',
                                                    name: 'Abnormal heart valve morphology (HP:0001654)',
                                                    participantsCount: 277,
                                                    participantsWithExactTerm: 18,
                                                    path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                                                    title: (
                                                        <OntologyTreeTitle
                                                            name="Abnormal heart valve morphology (HP:0001654)"
                                                            participantsCount={277}
                                                            participantsWithExactTerm={18}
                                                            searchTerm={{
                                                                after: '',
                                                                before: 'Abnormal heart valve morphology ',
                                                                query: 'HP:0001654',
                                                                regex: 'HP:0001654',
                                                                term: 'HP:0001654',
                                                            }}
                                                        />
                                                    ),
                                                },
                                            ],
                                            hasSearchTerm: true,
                                            key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                                            name: 'Abnormal heart morphology (HP:0001627)',
                                            participantsCount: 3556,
                                            participantsWithExactTerm: 985,
                                            path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                                            title: (
                                                <OntologyTreeTitle
                                                    name="Abnormal heart morphology (HP:0001627)"
                                                    participantsCount={3556}
                                                    participantsWithExactTerm={985}
                                                />
                                            ),
                                        },
                                    ],
                                    hasSearchTerm: true,
                                    key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                                    name: 'Abnormality of cardiovascular system morphology (HP:0030680)',
                                    participantsCount: 3729,
                                    participantsWithExactTerm: 202,
                                    path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                                    title: (
                                        <OntologyTreeTitle
                                            name="Abnormality of cardiovascular system morphology (HP:0030680)"
                                            participantsCount={3729}
                                            participantsWithExactTerm={202}
                                        />
                                    ),
                                },
                            ],
                            hasSearchTerm: true,
                            key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                            name: 'Abnormality of the cardiovascular system (HP:0001626)',
                            participantsCount: 4293,
                            participantsWithExactTerm: 253,
                            path: 'Phenotypic abnormality HP:0000118',
                            title: (
                                <OntologyTreeTitle
                                    name="Abnormality of the cardiovascular system (HP:0001626)"
                                    participantsCount={4293}
                                    participantsWithExactTerm={253}
                                />
                            ),
                        },
                    ],
                    key: 'Phenotypic abnormality HP:0000118',
                    name: 'Phenotypic abnormality (HP:0000118)',
                    participantsCount: 7175,
                    participantsWithExactTerm: 539,
                    path: '',
                    title: (
                        <OntologyTreeTitle
                            name="Phenotypic abnormality (HP:0000118)"
                            participantsCount={7175}
                            participantsWithExactTerm={539}
                        />
                    ),
                },
            ],
        });
    });

    test('searchInOntologyTree should return matching keys, selectedCount and a new tree when searching by title + code', () => {
        const ontologyTreeData = ontologyTreeDataToOntologyDataNode(LEGACY_ONTOLOGY_TREE_DATA);
        expect(searchInOntologyTree(ontologyTreeData[0], 'morphology HP:0001654')).toEqual({
            keys: [
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627-Abnormal heart valve morphology HP:0001654',
                'Phenotypic abnormality HP:0000118',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                'Phenotypic abnormality HP:0000118',
            ],
            selectedCount: 1,
            tree: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [],
                                                    hasSearchTerm: true,
                                                    key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627-Abnormal heart valve morphology HP:0001654',
                                                    name: 'Abnormal heart valve morphology (HP:0001654)',
                                                    participantsCount: 277,
                                                    participantsWithExactTerm: 18,
                                                    path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                                                    title: (
                                                        <OntologyTreeTitle
                                                            name="Abnormal heart valve morphology (HP:0001654)"
                                                            participantsCount={277}
                                                            participantsWithExactTerm={18}
                                                            searchTerm={{
                                                                after: '',
                                                                before: 'Abnormal heart valve ',
                                                                query: 'morphology HP:0001654',
                                                                regex: 'morphology\\s*HP:0001654',
                                                                term: 'morphology HP:0001654',
                                                            }}
                                                        />
                                                    ),
                                                },
                                            ],
                                            hasSearchTerm: true,
                                            key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                                            name: 'Abnormal heart morphology (HP:0001627)',
                                            participantsCount: 3556,
                                            participantsWithExactTerm: 985,
                                            path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                                            title: (
                                                <OntologyTreeTitle
                                                    name="Abnormal heart morphology (HP:0001627)"
                                                    participantsCount={3556}
                                                    participantsWithExactTerm={985}
                                                />
                                            ),
                                        },
                                    ],
                                    hasSearchTerm: true,
                                    key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                                    name: 'Abnormality of cardiovascular system morphology (HP:0030680)',
                                    participantsCount: 3729,
                                    participantsWithExactTerm: 202,
                                    path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                                    title: (
                                        <OntologyTreeTitle
                                            name="Abnormality of cardiovascular system morphology (HP:0030680)"
                                            participantsCount={3729}
                                            participantsWithExactTerm={202}
                                        />
                                    ),
                                },
                            ],
                            hasSearchTerm: true,
                            key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                            name: 'Abnormality of the cardiovascular system (HP:0001626)',
                            participantsCount: 4293,
                            participantsWithExactTerm: 253,
                            path: 'Phenotypic abnormality HP:0000118',
                            title: (
                                <OntologyTreeTitle
                                    name="Abnormality of the cardiovascular system (HP:0001626)"
                                    participantsCount={4293}
                                    participantsWithExactTerm={253}
                                />
                            ),
                        },
                    ],
                    key: 'Phenotypic abnormality HP:0000118',
                    name: 'Phenotypic abnormality (HP:0000118)',
                    participantsCount: 7175,
                    participantsWithExactTerm: 539,
                    path: '',
                    title: (
                        <OntologyTreeTitle
                            name="Phenotypic abnormality (HP:0000118)"
                            participantsCount={7175}
                            participantsWithExactTerm={539}
                        />
                    ),
                },
            ],
        });
        expect(searchInOntologyTree(ontologyTreeData[0], 'morphology (HP:0001654)')).toEqual({
            keys: [
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627-Abnormal heart valve morphology HP:0001654',
                'Phenotypic abnormality HP:0000118',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                'Phenotypic abnormality HP:0000118',
            ],
            selectedCount: 1,
            tree: [
                {
                    children: [
                        {
                            children: [
                                {
                                    children: [
                                        {
                                            children: [
                                                {
                                                    children: [],
                                                    hasSearchTerm: true,
                                                    key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627-Abnormal heart valve morphology HP:0001654',
                                                    name: 'Abnormal heart valve morphology (HP:0001654)',
                                                    participantsCount: 277,
                                                    participantsWithExactTerm: 18,
                                                    path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                                                    title: (
                                                        <OntologyTreeTitle
                                                            name="Abnormal heart valve morphology (HP:0001654)"
                                                            participantsCount={277}
                                                            participantsWithExactTerm={18}
                                                            searchTerm={{
                                                                after: '',
                                                                before: 'Abnormal heart valve ',
                                                                query: 'morphology (HP:0001654)',
                                                                regex: 'morphology\\s*HP:0001654',
                                                                term: 'morphology HP:0001654',
                                                            }}
                                                        />
                                                    ),
                                                },
                                            ],
                                            hasSearchTerm: true,
                                            key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                                            name: 'Abnormal heart morphology (HP:0001627)',
                                            participantsCount: 3556,
                                            participantsWithExactTerm: 985,
                                            path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                                            title: (
                                                <OntologyTreeTitle
                                                    name="Abnormal heart morphology (HP:0001627)"
                                                    participantsCount={3556}
                                                    participantsWithExactTerm={985}
                                                />
                                            ),
                                        },
                                    ],
                                    hasSearchTerm: true,
                                    key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                                    name: 'Abnormality of cardiovascular system morphology (HP:0030680)',
                                    participantsCount: 3729,
                                    participantsWithExactTerm: 202,
                                    path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                                    title: (
                                        <OntologyTreeTitle
                                            name="Abnormality of cardiovascular system morphology (HP:0030680)"
                                            participantsCount={3729}
                                            participantsWithExactTerm={202}
                                        />
                                    ),
                                },
                            ],
                            hasSearchTerm: true,
                            key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                            name: 'Abnormality of the cardiovascular system (HP:0001626)',
                            participantsCount: 4293,
                            participantsWithExactTerm: 253,
                            path: 'Phenotypic abnormality HP:0000118',
                            title: (
                                <OntologyTreeTitle
                                    name="Abnormality of the cardiovascular system (HP:0001626)"
                                    participantsCount={4293}
                                    participantsWithExactTerm={253}
                                />
                            ),
                        },
                    ],
                    key: 'Phenotypic abnormality HP:0000118',
                    name: 'Phenotypic abnormality (HP:0000118)',
                    participantsCount: 7175,
                    participantsWithExactTerm: 539,
                    path: '',
                    title: (
                        <OntologyTreeTitle
                            name="Phenotypic abnormality (HP:0000118)"
                            participantsCount={7175}
                            participantsWithExactTerm={539}
                        />
                    ),
                },
            ],
        });
    });

    test('searchInOntologyTree should return matching no result found', () => {
        const ontologyTreeData = ontologyTreeDataToOntologyDataNode(LEGACY_ONTOLOGY_TREE_DATA);
        const { keys, selectedCount } = searchInOntologyTree(ontologyTreeData[0], 'no result should be found');
        expect(keys).toEqual([]);
        expect(selectedCount).toBe(0);
    });

    test('disableNodesInTree should disable/enable nodes', () => {
        const ontologyTreeData = ontologyTreeDataToOntologyDataNode(LEGACY_ONTOLOGY_TREE_DATA);
        const treeTargetKeys = [
            'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
            'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
            'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627-Abnormal heart valve morphology HP:0001654',
        ];
        const transferTargetKeys = [
            'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
        ];
        const result = searchInOntologyTree(ontologyTreeData[0], 'heart');
        expect(disableNodesInTree(result.tree[0], treeTargetKeys, transferTargetKeys)).toEqual([
            {
                children: [
                    {
                        children: [
                            {
                                children: [
                                    {
                                        children: [
                                            {
                                                children: [],
                                                disableCheckbox: true,
                                                disabled: true,
                                                hasSearchTerm: true,
                                                key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627-Abnormal heart valve morphology HP:0001654',
                                                name: 'Abnormal heart valve morphology (HP:0001654)',
                                                participantsCount: 277,
                                                participantsWithExactTerm: 18,
                                                path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                                                title: (
                                                    <OntologyTreeTitle
                                                        name="Abnormal heart valve morphology (HP:0001654)"
                                                        participantsCount={277}
                                                        participantsWithExactTerm={18}
                                                        searchTerm={{
                                                            after: ' valve morphology HP:0001654',
                                                            before: 'Abnormal ',
                                                            query: 'heart',
                                                            regex: 'heart',
                                                            term: 'heart',
                                                        }}
                                                    />
                                                ),
                                            },
                                        ],
                                        disableCheckbox: true,
                                        disabled: true,
                                        hasSearchTerm: true,
                                        key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
                                        name: 'Abnormal heart morphology (HP:0001627)',
                                        participantsCount: 3556,
                                        participantsWithExactTerm: 985,
                                        path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                                        title: (
                                            <OntologyTreeTitle
                                                name="Abnormal heart morphology (HP:0001627)"
                                                participantsCount={3556}
                                                participantsWithExactTerm={985}
                                                searchTerm={{
                                                    after: ' morphology HP:0001627',
                                                    before: 'Abnormal ',
                                                    query: 'heart',
                                                    regex: 'heart',
                                                    term: 'heart',
                                                }}
                                            />
                                        ),
                                    },
                                ],
                                disableCheckbox: false,
                                disabled: false,
                                hasSearchTerm: true,
                                key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
                                name: 'Abnormality of cardiovascular system morphology (HP:0030680)',
                                participantsCount: 3729,
                                participantsWithExactTerm: 202,
                                path: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                                title: (
                                    <OntologyTreeTitle
                                        name="Abnormality of cardiovascular system morphology (HP:0030680)"
                                        participantsCount={3729}
                                        participantsWithExactTerm={202}
                                    />
                                ),
                            },
                        ],
                        disableCheckbox: false,
                        disabled: false,
                        hasSearchTerm: true,
                        key: 'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
                        name: 'Abnormality of the cardiovascular system (HP:0001626)',
                        participantsCount: 4293,
                        participantsWithExactTerm: 253,
                        path: 'Phenotypic abnormality HP:0000118',
                        title: (
                            <OntologyTreeTitle
                                name="Abnormality of the cardiovascular system (HP:0001626)"
                                participantsCount={4293}
                                participantsWithExactTerm={253}
                            />
                        ),
                    },
                ],
                key: 'Phenotypic abnormality HP:0000118',
                name: 'Phenotypic abnormality (HP:0000118)',
                participantsCount: 7175,
                participantsWithExactTerm: 539,
                path: '',
                title: (
                    <OntologyTreeTitle
                        name="Phenotypic abnormality (HP:0000118)"
                        participantsCount={7175}
                        participantsWithExactTerm={539}
                    />
                ),
            },
        ]);
    });

    test('getChildrenKeysByNode should return all children keys related to a node', () => {
        const ontologyTreeData = ontologyTreeDataToOntologyDataNode(LEGACY_ONTOLOGY_TREE_DATA);
        expect(getChildrenKeysByNode(ontologyTreeData[0])).toEqual([
            'Phenotypic abnormality HP:0000118-Abnormality of the nervous system HP:0000707',
            'Phenotypic abnormality HP:0000118-Abnormality of the nervous system HP:0000707-Abnormal nervous system physiology HP:0012638',
            'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
            'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
            'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
            'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627-Abnormal heart valve morphology HP:0001654',
        ]);
    });

    test('getChildrenKeysByKey should return all children keys related to node key', () => {
        const ontologyTreeData = ontologyTreeDataToOntologyDataNode(LEGACY_ONTOLOGY_TREE_DATA);
        expect(
            getChildrenKeysByKey(
                ontologyTreeData[0],
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
            ),
        ).toEqual([
            'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680',
            'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627',
            'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626-Abnormality of cardiovascular system morphology HP:0030680-Abnormal heart morphology HP:0001627-Abnormal heart valve morphology HP:0001654',
        ]);
    });

    test('filterTransferTargetKeys should remove all transferTargetKeys', () => {
        const ontologyTreeData = ontologyTreeDataToOntologyDataNode(LEGACY_ONTOLOGY_TREE_DATA);
        expect(
            filterTransferTargetKeys(
                ['Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626'],
                ontologyTreeData[0],
                [
                    'Phenotypic abnormality HP:0000118-Abnormality of the nervous system HP:0000707-Abnormal nervous system physiology HP:0012638',
                ],
            ),
        ).toEqual([
            'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
            'Phenotypic abnormality HP:0000118',
        ]);
    });

    test('flattenTransferTargetKeys should convert transfer keys to a search query friendly array', () => {
        expect(
            flattenTransferTargetKeys([
                'Phenotypic abnormality HP:0000118-Abnormality of the cardiovascular system HP:0001626',
            ]),
        ).toEqual(['Abnormality of the cardiovascular system HP:0001626']);
    });

    test('extractCodeAndTitle should extract title and code from a string', () => {
        expect(extractCodeAndTitle('Phenotypic abnormality (HP:0000118)')).toEqual({
            code: '(HP:0000118)',
            title: 'Phenotypic abnormality',
        });

        expect(extractCodeAndTitle('Phenotypic abnormality (MONDO:0000118)')).toEqual({
            code: '(MONDO:0000118)',
            title: 'Phenotypic abnormality',
        });
    });
});
