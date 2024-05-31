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

    test('make sure OntologyTreeTitle render correctly when search by term e.g. "morphology"', () => {
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

    test('make sure OntologyTreeTitle render correctly when searching by code with parenthesis e.g. "(HP:0001654)"', () => {
        const props = {
            name: 'Abnormal heart valve morphology (HP:0001654)',
            participantsCount: 200,
            participantsWithExactTerm: 100,
            searchTerm: {
                after: '',
                before: 'Abnormal heart valve morphology',
                query: '(HP:0001654)',
                regex: 'HP:0001654',
                term: 'HP:0001654',
            },
        };
        render(<OntologyTreeTitle {...props} />);
        expect(screen.getByText('Abnormal heart valve morphology')).toBeTruthy();
        expect(screen.getByText('(HP:0001654)')).toBeTruthy();
        expect(screen.getByText(`${props.participantsCount}`)).toBeTruthy();
        expect(screen.getByText(`${props.participantsWithExactTerm}`)).toBeTruthy();
    });

    test('make sure OntologyTreeTitle render correctly when searching by code without parenthesis e.g. "HP:0001654"', () => {
        const props = {
            name: 'Abnormal heart valve morphology (HP:0001654)',
            participantsCount: 200,
            participantsWithExactTerm: 100,
            searchTerm: {
                after: ' )',
                before: 'Abnormal heart valve morphology ',
                query: 'HP:0001654',
                regex: 'HP:0001654',
                term: 'HP:0001654',
            },
        };
        render(<OntologyTreeTitle {...props} />);
        expect(screen.getByText('Abnormal heart valve morphology')).toBeTruthy();
        expect(screen.getByText('HP:0001654')).toBeTruthy();
        expect(screen.getByText(`${props.participantsCount}`)).toBeTruthy();
        expect(screen.getByText(`${props.participantsWithExactTerm}`)).toBeTruthy();
    });

    test('make sure OntologyTreeTitle render correctly when searching by term and code e.g. "morphology (HP:0001654)"', () => {
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

    test('make sure OntologyTreeTitle render correctly when searching by term and code without parenthesis e.g. "morphology HP:0001654"', () => {
        const props = {
            name: 'Abnormal heart valve morphology (HP:0001654)',
            participantsCount: 200,
            participantsWithExactTerm: 100,
            searchTerm: {
                after: ' ',
                before: 'Abnormal heart valve ',
                query: 'morphology HP:0001654',
                regex: 'morphologys*HP:0001654',
                term: 'morphology HP:0001654',
            },
        };
        render(<OntologyTreeTitle {...props} />);
        expect(screen.getByText('Abnormal heart valve')).toBeTruthy();
        expect(screen.getByText('morphology')).toBeTruthy();
        expect(screen.getByText('(HP:0001654')).toBeTruthy();
        expect(screen.getByText(')')).toBeTruthy();
        expect(screen.getByText(`${props.participantsCount}`)).toBeTruthy();
        expect(screen.getByText(`${props.participantsWithExactTerm}`)).toBeTruthy();
    });

    test('make sure OntologyTreeTitle render correctly when searching by term and code with only the right parenthesis e.g. "morphology HP:0001654)"', () => {
        const props = {
            name: 'Abnormal heart valve morphology (HP:0001654)',
            participantsCount: 200,
            participantsWithExactTerm: 100,
            searchTerm: {
                after: '',
                before: 'Abnormal heart valve morphology ',
                query: 'morphology HP:0001654)',
                regex: 'morphologys*HP:0001654',
                term: 'morphology HP:0001654',
            },
        };
        render(<OntologyTreeTitle {...props} />);
        expect(screen.getByText('Abnormal heart valve')).toBeTruthy();
        expect(screen.getByText('morphology')).toBeTruthy();
        expect(screen.getByText('(HP:0001654')).toBeTruthy();
        expect(screen.getByText(`${props.participantsCount}`)).toBeTruthy();
        expect(screen.getByText(`${props.participantsWithExactTerm}`)).toBeTruthy();
    });

    test('make sure OntologyTreeTitle render correctly when searching with a partial code e.g. "000165"', () => {
        const props = {
            name: 'Abnormal heart valve morphology (HP:0001654)',
            participantsCount: 200,
            participantsWithExactTerm: 100,
            searchTerm: {
                after: '',
                before: 'Abnormal heart valve morphology HP:',
                query: '000165',
                regex: '000165',
                term: '000165',
            },
        };
        render(<OntologyTreeTitle {...props} />);
        expect(screen.getByText('Abnormal heart valve morphology')).toBeTruthy();
        expect(screen.getByText('000165')).toBeTruthy();
        expect(screen.getByText(`${props.participantsCount}`)).toBeTruthy();
        expect(screen.getByText(`${props.participantsWithExactTerm}`)).toBeTruthy();
    });
});
