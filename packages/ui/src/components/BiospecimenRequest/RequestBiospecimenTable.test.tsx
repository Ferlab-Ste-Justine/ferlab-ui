import React from 'react';
import { render, screen } from '@testing-library/react';

import RequestBiospecimenTable from './RequestBiospecimenTable';

const data = [
    {
        study_code: 'code 1',
        study_name: 'name 1',
        nb_participants: 2,
        nb_available_samples: 3,
    },
    {
        study_code: 'code 2',
        study_name: 'name 2',
        nb_participants: 1,
        nb_available_samples: 1,
    },
];

const sqon = {
    content: [
        {
            content: { field: 'sample_id', index: 'biospecimen', value: ['BS_2AMK1CT2', 'BS_40Q97WCY', 'BS_1WWPQ3HY'] },
            op: 'in',
        },
    ],
    id: 'de286c30-9918-4459-92b7-c91f5805fd87',
    op: 'and',
};

export const columns = [
    {
        key: 'study_code',
        title: 'Study Code',
        dataIndex: 'study_code',
    },
    {
        key: 'nb_participants',
        title: 'Particpants',
        dataIndex: 'nb_participants',
    },
    {
        key: 'nb_available_samples',
        title: 'Available Samples',
        dataIndex: 'nb_available_samples',
    },
];

describe('RequestBiospecimenTable', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('make sure RequestBiospecimenTable render correctly', () => {
        const props = {
            columns,
            data,
            loading: false,
            sqon,
        };

        render(<RequestBiospecimenTable {...props} />);
        expect(screen.getByTestId('reqBioTable')).toBeTruthy();
    });

    test('make sure RequestBiospecimenTable render nothing without sqon', () => {
        const props = {
            columns,
            data,
            loading: false,
            sqon: undefined,
        };

        render(<RequestBiospecimenTable {...props} />);
        expect(screen.queryByTestId('reqBioTable')).toBeFalsy();
    });
});
