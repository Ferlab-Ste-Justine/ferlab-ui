import React from 'react';
import { render, screen } from '@testing-library/react';

import EntityTitleLogo from '.';

describe('EntityPage/EntityTitleLogo', () => {
    test('make sure text does not render while loading', () => {
        const props = {
            extra: <>Extra</>,
            logo: <>Logo</>,
            loading: true,
            title: 'This is a text',
        };

        render(<EntityTitleLogo {...props} />);

        expect(screen.queryByText('Extra')).toBeNull();
        expect(screen.queryByText('Logo')).toBeNull();
        expect(screen.queryByText('This is a text')).toBeNull();
    });
    test('make sure Title render correctly', () => {
        const props = {
            extra: <>Extra</>,
            logo: <>Logo</>,
            loading: false,
            title: 'This is a text',
        };

        render(<EntityTitleLogo {...props} />);

        expect(screen.getByText('Extra')).toBeTruthy();
        expect(screen.getByText('Logo')).toBeTruthy();
        expect(screen.getByText('This is a text')).toBeTruthy();
    });
});
