import React from 'react';
import { render, screen } from '@testing-library/react';

import BiospecimenRequestsWidget, { DEFAULT_BIOSPECIMEN_REQUESTS_WIDGET_DICTIONARY } from '.';

const dictionary = DEFAULT_BIOSPECIMEN_REQUESTS_WIDGET_DICTIONARY;

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

describe('BiospecimenRequestsWidget', () => {
    test('make sure BiospecimenRequestsWidget render correctly', () => {
        const props = {
            data,
            dictionary,
            handleListItemClick: jest.fn(),
            handleListItemDelete: jest.fn(),
            handleListItemEdit: jest.fn(),
            handleListItemShare: jest.fn(),
            id: '1',
            loading: false,
        };

        render(<BiospecimenRequestsWidget {...props} />);
        expect(screen.getByText(dictionary.title)).toBeTruthy();
        expect(screen.getByText(data[0].tag)).toBeTruthy();
        expect(screen.getByText(data[1].tag)).toBeTruthy();
    });

    test('make sure BiospecimenRequestsWidget render correctly when loading', () => {
        const props = {
            data: [],
            dictionary,
            handleListItemClick: jest.fn(),
            handleListItemDelete: jest.fn(),
            handleListItemEdit: jest.fn(),
            handleListItemShare: jest.fn(),
            id: '1',
            loading: true,
        };

        render(<BiospecimenRequestsWidget {...props} />);
        expect(screen.getByText(dictionary.title)).toBeTruthy();
    });
});
