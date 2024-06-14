import React from 'react';
import { render, screen } from '@testing-library/react';

import { DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY } from './requestBiospecimen.utils';
import RequestBiospecimenLimitModal from './RequestBiospecimenLimitModal';

const dictionary = DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY;

describe('RequestBiospecimenLimitModal', () => {
    test('make sure RequestBiospecimenLimitModal render correctly', () => {
        const props = {
            closeModal: jest.fn(),
            dictionary,
            isOpen: true,
        };

        render(<RequestBiospecimenLimitModal {...props} />);
        expect(screen.getByText(dictionary.modal.cancelText)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.okText)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.title)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.description)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.alert.limitDescription)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.alert.limitMessage)).toBeTruthy();
    });
});
