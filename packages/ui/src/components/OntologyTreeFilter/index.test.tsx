import React from 'react';
import { render, screen } from '@testing-library/react';

import { ONTOLOGY_TREE_MOCK_API_RESPONSE } from './utils.test';
import OntologyTreeModal, { DEFAULT_ONTOLOGY_TREE_MODAL_DICTIONARY } from '.';

const dictionary = DEFAULT_ONTOLOGY_TREE_MODAL_DICTIONARY;

describe('OntologyTreeModal', () => {
    test('make sure OntologyTreeModal render correctly when closed', () => {
        const props = {
            data: [],
            dictionary,
            handleCancel: jest.fn(),
            handleOnApply: jest.fn(),
            loading: false,
            open: false,
        };

        render(<OntologyTreeModal {...props} />);
        expect(screen.queryByText(dictionary.title)).toBeFalsy();
        expect(screen.queryByText(dictionary.tree.emptySelection)).toBeFalsy();
        expect(screen.queryByText('No data')).toBeFalsy();
    });

    test('make sure OntologyTreeModal render correctly with empty data', () => {
        const props = {
            data: [],
            dictionary,
            handleCancel: jest.fn(),
            handleOnApply: jest.fn(),
            loading: false,
            open: true,
        };

        render(<OntologyTreeModal {...props} />);
        expect(screen.queryByText(dictionary.title)).toBeTruthy();
        expect(screen.queryByText(dictionary.tree.emptySelection)).toBeFalsy();
        expect(screen.queryByText('No data')).toBeTruthy();
    });

    test('make sure OntologyTreeModal render correctly when loading', () => {
        const props = {
            data: [],
            dictionary,
            handleCancel: jest.fn(),
            handleOnApply: jest.fn(),
            loading: true,
            open: true,
        };

        render(<OntologyTreeModal {...props} />);
        expect(screen.queryByText(dictionary.title)).toBeTruthy();
        expect(screen.queryByText(dictionary.tree.emptySelection)).toBeFalsy();
        expect(screen.queryByText('No data')).toBeFalsy();
    });

    test('make sure OntologyTreeModal render correctly with data', () => {
        const props = {
            data: ONTOLOGY_TREE_MOCK_API_RESPONSE,
            dictionary,
            handleCancel: jest.fn(),
            handleOnApply: jest.fn(),
            loading: false,
            open: true,
        };

        render(<OntologyTreeModal {...props} />);
        expect(screen.queryByText(dictionary.title)).toBeTruthy();
        expect(screen.queryByText(dictionary.tree.emptySelection)).toBeTruthy();
        expect(screen.queryByText('No data')).toBeFalsy();
    });
});
