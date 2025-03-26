import React from 'react';
import { render, screen } from '@testing-library/react';

import PageHeader from '.';

describe('layout/PageHeader', () => {
    test('make sure render title only if no other props filled', () => {
        const props = {
            title: 'Title',
        };

        render(<PageHeader {...props} />);
        expect(screen.getByText('Title')).toBeTruthy();
        expect(screen.queryByText('Subtitle')).toBeNull();
        expect(screen.queryByText('Icon')).toBeNull();
        expect(screen.queryByRole('button')).toBeNull();
    });
    test('make sure render back button if it is filled', () => {
        const props = {
            onBackButton: jest.fn(),
            title: 'Title',
        };

        render(<PageHeader {...props} />);
        expect(screen.getByText('Title')).toBeTruthy();
        expect(screen.queryByRole('button')).toBeTruthy();
        expect(screen.queryByText('Subtitle')).toBeNull();
        expect(screen.queryByText('Icon')).toBeNull();
    });
    test('make sure render subtitle if it is filled', () => {
        const props = {
            subtitle: 'Subtitle',
            title: 'Title',
        };

        render(<PageHeader {...props} />);
        expect(screen.getByText('Title')).toBeTruthy();
        expect(screen.queryByText('Subtitle')).toBeTruthy();
        expect(screen.queryByText('Icon')).toBeNull();
        expect(screen.queryByRole('button')).toBeNull();
    });
    test('make sure render icon if it is filled', () => {
        const props = {
            icon: <>Icon</>,
            title: 'Title',
        };

        render(<PageHeader {...props} />);
        expect(screen.getByText('Title')).toBeTruthy();
        expect(screen.queryByText('Icon')).toBeTruthy();
        expect(screen.queryByText('Subtitle')).toBeNull();
        expect(screen.queryByRole('button')).toBeNull();
    });
    test('make sure render all if all props are filled', () => {
        const props = {
            icon: <>Icon</>,
            onBackButton: jest.fn(),
            subtitle: 'Subtitle',
            title: 'Title',
        };

        render(<PageHeader {...props} />);
        expect(screen.getByText('Title')).toBeTruthy();
        expect(screen.queryByText('Icon')).toBeTruthy();
        expect(screen.queryByText('Subtitle')).toBeTruthy();
        expect(screen.queryByRole('button')).toBeTruthy();
    });
});
