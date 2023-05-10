import React from 'react';
import { render, screen } from '@testing-library/react';

import AssignmentsTag from '.';

describe('AssignmentTag', () => {
    test('make sure the name is rendered', () => {
        const props = {
            email: 'email@ferlab.bio',
            name: 'Prenom Nom',
            organization: 'LDM-01',
        };

        render(<AssignmentsTag {...props} />);
        expect(screen.getByText(props.name)).toBeTruthy();
    });

    test('make sure the organization is rendered', () => {
        const props = {
            email: 'email@ferlab.bio',
            name: 'Prenom Nom',
            organization: 'LDM-01',
        };

        render(<AssignmentsTag {...props} />);
        expect(screen.getByText(props.organization)).toBeTruthy();
    });
});
