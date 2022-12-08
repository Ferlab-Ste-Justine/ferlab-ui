import React from 'react';
import { render, screen } from '@testing-library/react';

import { default as Status, StatusOptions } from './Status';

const translationDictionary = {
    [StatusOptions.Active]: 'Approved',
    [StatusOptions.Completed]: 'Completed',
    [StatusOptions.Draft]: 'Draft',
    [StatusOptions.Revoked]: 'Refused',
    [StatusOptions.Submitted]: 'Submitted',
    [StatusOptions.Incomplete]: 'Incomplete',
};

describe('labels/Status', () => {
    test('make sure Active Status component render correctly', () => {
        const props = {
            dictionary: translationDictionary,
            status: StatusOptions.Active,
        };
        render(<Status {...props} />);
        expect(screen.getByText('Approved')).toBeTruthy();
    });

    test('make sure Completed Status component render correctly', () => {
        const props = {
            dictionary: translationDictionary,
            status: StatusOptions.Completed,
        };
        render(<Status {...props} />);
        expect(screen.getByText('Completed')).toBeTruthy();
    });

    test('make sure Draft Status component render correctly', () => {
        const props = {
            dictionary: translationDictionary,
            status: StatusOptions.Draft,
        };
        render(<Status {...props} />);
        expect(screen.getByText('Draft')).toBeTruthy();
    });

    test('make sure Incomplete Status component render correctly', () => {
        const props = {
            dictionary: translationDictionary,
            status: StatusOptions.Incomplete,
        };
        render(<Status {...props} />);
        expect(screen.getByText('Incomplete')).toBeTruthy();
    });

    test('make sure Revoked Status component render correctly', () => {
        const props = {
            dictionary: translationDictionary,
            status: StatusOptions.Revoked,
        };
        render(<Status {...props} />);
        expect(screen.getByText('Refused')).toBeTruthy();
    });

    test('make sure Submitted Status component render correctly', () => {
        const props = {
            dictionary: translationDictionary,
            status: StatusOptions.Submitted,
        };
        render(<Status {...props} />);
        expect(screen.getByText('Submitted')).toBeTruthy();
    });
});
