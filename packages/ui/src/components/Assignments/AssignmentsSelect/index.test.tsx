import React from 'react';
import { render, screen } from '@testing-library/react';

import AssignmentsSelect, { TAssignmentsSelect } from '.';

describe('AssignmentTag', () => {
    test('make sure all options is renderer if visible is true', () => {
        const props = {
            assignedPractionnerRoles: [],
            handleSelect: ([]) => undefined,
            options: [
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
                    ldm: 'LDM-02',
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
            ],
            visibleOptions: true,
        } as TAssignmentsSelect;

        render(<AssignmentsSelect {...props} />);
        props.options.forEach((o) => {
            expect(screen.getByText(o.ldm)).toBeTruthy();
        });
    });

    test('make sure no options is renderer if visible is false', () => {
        const props = {
            assignedPractionnerRoles: [],
            handleSelect: ([]) => undefined,
            options: [
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
                    ldm: 'LDM-02',
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
            ],
            visibleOptions: false,
        } as TAssignmentsSelect;

        render(<AssignmentsSelect {...props} />);
        props.options.forEach((o) => {
            expect(screen.queryByText(o.ldm)).toBeNull();
        });
    });
});
