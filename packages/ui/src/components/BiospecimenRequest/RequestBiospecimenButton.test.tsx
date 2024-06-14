import React from 'react';
import { render, screen } from '@testing-library/react';

import { DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY } from './requestBiospecimen.utils';
import RequestBiospecimenButton from './RequestBiospecimenButton';
import { columns } from './RequestBiospecimenTable.test';

const dictionary = DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY;

describe('RequestBiospecimenButton', () => {
    test('make sure RequestBiospecimenButton render correctly', () => {
        const props = {
            columns: columns,
            createAndFetchReport: jest.fn(),
            dictionary,
            getSamples: jest.fn(),
            getSavedSets: jest.fn(),
            nbBiospecimenSelected: 2,
        };

        render(<RequestBiospecimenButton {...props} />);
        expect(screen.getByText(dictionary.buttonLabel)).toBeTruthy();
    });
});
