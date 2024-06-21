import React from 'react';
import { render, screen } from '@testing-library/react';

import OntologyTree, { DEFAULT_ONTOLOGY_TREE_DICTIONARY } from './OntologyTree';
import { legacyToNewOntologyTreeData } from './utils';
import { ONTOLOGY_TREE_MOCK_API_RESPONSE } from './utils.test';

const dictionary = DEFAULT_ONTOLOGY_TREE_DICTIONARY;

describe('OntologyTree', () => {
    test('make sure OntologyTree render correctly', () => {
        const data = legacyToNewOntologyTreeData(ONTOLOGY_TREE_MOCK_API_RESPONSE);
        const props = {
            data,
            dictionary,
            setTransferTargetKeys: jest.fn(),
            sqonTransferKeys: [],
            total: data.length,
            transferTargetKeys: [],
        };

        render(<OntologyTree {...props} />);
        expect(screen.getByText(dictionary.emptySelection)).toBeTruthy();
        expect(screen.getByText(`${props.total} unique items`)).toBeTruthy();
    });

    test('make sure OntologyTree render correctly with sqonTransferKeys', () => {
        const data = legacyToNewOntologyTreeData(ONTOLOGY_TREE_MOCK_API_RESPONSE);
        const props = {
            data,
            dictionary,
            setTransferTargetKeys: jest.fn(),
            sqonTransferKeys: ['Abnormal heart valve morphology (HP:0001654)'],
            total: data.length,
            transferTargetKeys: [],
        };

        render(<OntologyTree {...props} />);
        expect(screen.getByText(dictionary.emptySelection)).toBeTruthy();
        expect(screen.getByText(`${props.total} unique items`)).toBeTruthy();
    });

    test('make sure OntologyTree render correctly with empty data', () => {
        const props = {
            data: [],
            dictionary,
            setTransferTargetKeys: jest.fn(),
            sqonTransferKeys: [],
            total: 0,
            transferTargetKeys: [],
        };

        render(<OntologyTree {...props} />);
        expect(screen.getByText(dictionary.emptySelection)).toBeTruthy();
        expect(screen.getByText(`${props.total} unique items`)).toBeTruthy();
    });
});
