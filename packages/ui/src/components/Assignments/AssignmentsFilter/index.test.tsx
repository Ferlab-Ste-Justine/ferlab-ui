import React from 'react';
import { render, screen } from '@testing-library/react';

import { TPractitionnerInfo } from '../types';
import { getPractitionnerName } from '../utils';

import AssignmentsFilter from '.';

const options: TPractitionnerInfo[] = [
    {
        email: 'email1@ferlab.bio',
        ldm: 'LDM-01',
        name: [
            {
                family: 'Family01',
                given: ['given01'],
            },
        ],
        practitionerRoles_Id: 'PR01',
    },
    {
        email: 'email2@ferlab.bio',
        ldm: 'LDM-01',
        name: [
            {
                family: 'Family02',
                given: ['given02'],
            },
        ],
        practitionerRoles_Id: 'PR02',
    },
    {
        email: 'email3@ferlab.bio',
        ldm: 'LDM-03',
        name: [
            {
                family: 'Family03',
                given: ['given03'],
            },
        ],
        practitionerRoles_Id: 'PR03',
    },
];

describe('Assignation Filter', () => {
    test('make sure Checkbox Filter is correctly rendered', () => {
        render(<AssignmentsFilter options={options} />);

        expect(screen.queryByText(getPractitionnerName(options[0].name))).toBeTruthy();
        expect(screen.queryByText(getPractitionnerName(options[1].name))).toBeTruthy();
    });
});
