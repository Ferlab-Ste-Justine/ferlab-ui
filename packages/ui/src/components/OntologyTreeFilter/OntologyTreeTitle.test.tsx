import React from 'react';
import { render, screen } from '@testing-library/react';

import OntologyTreeTitle from './OntologyTreeTitle';

describe('OntologyTreeTitle', () => {
    test('make sure OntologyTreeTitle render correctly', () => {
        const props = {
            name: 'Abnormal heart valve morphology (HP:0001654)',
            participantsCount: 200,
            participantsWithExactTerm: 100,
        };

        render(<OntologyTreeTitle {...props} />);
        expect(screen.getByText('Abnormal heart valve morphology')).toBeTruthy();
        expect(screen.getByText('(HP:0001654)')).toBeTruthy();
        expect(screen.getByText(`${props.participantsCount}`)).toBeTruthy();
        expect(screen.getByText(`${props.participantsWithExactTerm}`)).toBeTruthy();
    });

    test('make sure OntologyTreeTitle render correctly with a search term', () => {
        const props = {
            name: 'Abnormal heart valve morphology (HP:0001654)',
            participantsCount: 200,
            participantsWithExactTerm: 100,
            searchTerm: {
                after: ' (HP:0001654)',
                before: 'Abnormal heart valve ',
                query: 'morphology',
                regex: 'morphology',
                term: 'morphology',
            },
        };

        render(<OntologyTreeTitle {...props} />);
        expect(screen.getByText('Abnormal heart valve')).toBeTruthy();
        expect(screen.getByText('morphology')).toBeTruthy();
        expect(screen.getByText('(HP:0001654)')).toBeTruthy();
        expect(screen.getByText(`${props.participantsCount}`)).toBeTruthy();
        expect(screen.getByText(`${props.participantsWithExactTerm}`)).toBeTruthy();
    });
});
