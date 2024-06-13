import React from 'react';
import { render, screen } from '@testing-library/react';

import EditBiospecimenRequestModal, { DEFAULT_EDIT_BIOSPECIMENT_REQUEST_MODAL } from './EditBiospecimenRequestModal';

const dictionary = DEFAULT_EDIT_BIOSPECIMENT_REQUEST_MODAL;

const data = [
    {
        created_date: '2023-12-18T20:03:16.113Z',
        id: '01bba984-2915-4e14-81ea-f706ca3fd545',
        setType: 'biospecimen-request',
        size: 2,
        tag: 'biospecimen request 1',
        updated_date: '2023-12-18T20:03:16.113Z',
    },
    {
        created_date: '2023-07-18T20:03:16.113Z',
        id: '01bba984-2915-4e14-81ea-f706ca3fd541',
        setType: 'biospecimen-request',
        size: 2,
        tag: 'biospecimen request 2',
        updated_date: '2023-08-18T20:03:16.113Z',
    },
];

describe('EditBiospecimenRequestModal', () => {
    test('make sure EditBiospecimenRequestModal render correctly', () => {
        const props = {
            biospecimenRequests: data[0],
            dictionary,
            handleClose: jest.fn(),
            handleSubmit: jest.fn(),
            open: true,
            savedSets: data,
        };

        render(<EditBiospecimenRequestModal {...props} />);
        expect(screen.getByText(dictionary.modal.okText)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.title)).toBeTruthy();
        expect(screen.getByText(dictionary.modal.cancelText)).toBeTruthy();
    });
});
