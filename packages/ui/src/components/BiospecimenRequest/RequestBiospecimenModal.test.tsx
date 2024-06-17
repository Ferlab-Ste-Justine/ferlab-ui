import '@testing-library/jest-dom';

import React from 'react';
import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';

import { DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY } from './requestBiospecimen.utils';
import RequestBiospecimenModal from './RequestBiospecimenModal';
import { columns } from './RequestBiospecimenTable.test';

// jest.mock('./NoSampleModal', () => () => {
//     const mockedNoSampleModal = <div>mocked no sample modal</div>;
//     return mockedNoSampleModal;
// });

const dictionary = DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY;

const data = [
    {
        nb_available_samples: 3,
        nb_participants: 2,
        study_code: 'code 1',
        study_name: 'name 1',
    },
    {
        nb_available_samples: 1,
        nb_participants: 1,
        study_code: 'code 2',
        study_name: 'name 2',
    },
];

describe('RequestBiospecimenModal', () => {
    it('should render RequestBiospecimenModal correctly', () => {
        const props = {
            closeModal: jest.fn(),
            columns: columns,
            createAndFetchReport: jest.fn(),
            dictionary,
            getSamples: jest.fn().mockReturnValueOnce({ error: undefined, loading: false, result: data }),
            getSavedSets: jest.fn().mockReturnValueOnce({ isLoading: false, savedSets: [] }),
            isOpen: true,
        };

        render(<RequestBiospecimenModal {...props} />);
        expect(screen.getByText(dictionary.modal.cancelText)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.title)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.description)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.nameForm.title)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.nameForm.note)).toBeTruthy();
    });

    it('should render empty dom if getSamples loading true', () => {
        const props = {
            closeModal: jest.fn(),
            columns: columns,
            createAndFetchReport: jest.fn(),
            dictionary,
            getSamples: jest.fn().mockReturnValueOnce({ error: undefined, loading: true, result: data }),
            getSavedSets: jest.fn().mockReturnValueOnce({ isLoading: false, savedSets: [] }),
            isOpen: true,
        };

        const { container } = render(<RequestBiospecimenModal {...props} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('should render no sample alert if getSamples has no error and no sample', () => {
        const props = {
            closeModal: jest.fn(),
            columns: columns,
            createAndFetchReport: jest.fn(),
            dictionary,
            getSamples: jest.fn().mockReturnValueOnce({ error: undefined, loading: false, result: [] }),
            getSavedSets: jest.fn().mockReturnValueOnce({ isLoading: false, savedSets: [] }),
            isOpen: true,
        };

        render(<RequestBiospecimenModal {...props} />);
        expect(screen.getByText(dictionary.modal.alert.infoDescription)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.alert.infoMessage)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.closeText)).toBeTruthy();
        expect(screen.queryByText(dictionary.modal.okText)).toBeFalsy();
    });

    it('should render RequestBiospecimenModal with alert if getSamples has error', () => {
        const props = {
            closeModal: jest.fn(),
            columns: columns,
            createAndFetchReport: jest.fn(),
            dictionary,
            getSamples: jest.fn().mockReturnValueOnce({ error: 'error', loading: false, result: [] }),
            getSavedSets: jest.fn().mockReturnValueOnce({ isLoading: false, savedSets: [] }),
            isOpen: true,
        };

        render(<RequestBiospecimenModal {...props} />);
        expect(screen.getByText(dictionary.modal.alert.errorMessage)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.alert.errorDescription)).toBeTruthy();
    });
});
