import React from 'react';
import { render, screen } from '@testing-library/react';

import EntityTitle from '.';

describe('EntityPage/EntityTitle', () => {
    test('make sure text does not render while loading', () => {
        const props = {
            extra: <>Extra</>,
            icon: <>Icon</>,
            loading: true,
            tag: <>Tag</>,
            text: 'This is a text',
        };

        render(<EntityTitle {...props} />);

        expect(screen.queryByText('Extra')).toBeNull();
        expect(screen.queryByText('Icon')).toBeNull();
        expect(screen.queryByText('Tag')).toBeNull();
        expect(screen.queryByText('This is a text')).toBeNull();
    });
    test('make sure Title render correctly', () => {
        const props = {
            extra: <>Extra</>,
            icon: <>Icon</>,
            loading: false,
            tag: <>Tag</>,
            text: 'This is a text',
        };

        render(<EntityTitle {...props} />);

        expect(screen.getByText('Extra')).toBeTruthy();
        expect(screen.getByText('Icon')).toBeTruthy();
        expect(screen.getByText('Tag')).toBeTruthy();
        expect(screen.getByText('This is a text')).toBeTruthy();
    });
});
