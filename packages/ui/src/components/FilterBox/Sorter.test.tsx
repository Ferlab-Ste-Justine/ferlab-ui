import React from 'react';
import { render, screen } from '@testing-library/react';

import Sorter, { DEFAULT_SORTER_DICTIONARY } from './Sorter';

const dictionary = DEFAULT_SORTER_DICTIONARY;

describe('Sorter', () => {
    test('make sure Sorter render correctly', () => {
        const props = {
            dictionary,
            onSortChange: jest.fn(),
        };

        render(<Sorter {...props} />);
        expect(screen.getByText(dictionary.newest)).toBeTruthy();
    });
});
