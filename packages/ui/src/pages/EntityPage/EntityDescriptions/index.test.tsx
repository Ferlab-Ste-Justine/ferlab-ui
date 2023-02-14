import React from 'react';
import { render, screen } from '@testing-library/react';

import EntityDescription from '.';

const descriptions = [
    {
        label: 'label 1',
        value: 'value 1',
    },
    {
        label: 'label 2',
        value: 'value 2',
    },
    {
        label: 'label 3',
        value: 'value 3',
    },
];

describe('EntityPage/EntityDescription', () => {
    test('make sure text does not render while loading', () => {
        const props = {
            descriptions,
            header: 'Header',
            id: 'ID',
            loading: true,
            subheader: <>SubHeader</>,
            title: 'Title',
        };
        render(<EntityDescription {...props} />);
        expect(screen.getByText('Title')).toBeTruthy();
        expect(screen.getByText('Header')).toBeTruthy();

        expect(screen.queryByText('label 1')).toBeNull();
        expect(screen.queryByText('value 3')).toBeNull();
        expect(screen.queryByText('SubHeader')).toBeNull();
    });

    test('make sure all elements are rendered properly', () => {
        const props = {
            descriptions,
            header: 'Header',
            id: 'ID',
            loading: false,
            subheader: <>SubHeader</>,
            title: 'Title',
        };
        render(<EntityDescription {...props} />);
        expect(screen.getByText('label 1')).toBeTruthy();
        expect(screen.getByText('value 3')).toBeTruthy();
        expect(screen.getByText('Title')).toBeTruthy();
        expect(screen.getByText('Header')).toBeTruthy();
        expect(screen.getByText('SubHeader')).toBeTruthy();
    });
});
