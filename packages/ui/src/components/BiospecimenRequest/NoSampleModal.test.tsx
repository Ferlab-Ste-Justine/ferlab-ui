import React from 'react';
import { render, screen } from '@testing-library/react';

import { DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY } from './requestBiospecimen.utils';
import NoSampleModal from './NoSampleModal';

const dictionary = DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY;

describe('NoSampleModal', () => {
    test('make sure NoSampleModal render correctly', () => {
        const props = {
            dictionary,
            closeModal: jest.fn(),
            isOpen: true,
        };

        render(<NoSampleModal {...props} />);
        expect(screen.getByText(dictionary.modal.closeText)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.title)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.alert.infoDescription)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.alert.infoMessage)).toBeTruthy();
    });
});
