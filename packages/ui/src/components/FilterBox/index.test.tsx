import React from 'react';
import { render, screen } from '@testing-library/react';

import FilterBox, { DEFAULT_FILTER_BOX_DICTIONARY } from '.';

const dictionary = DEFAULT_FILTER_BOX_DICTIONARY;

describe('FilterBox', () => {
    test('make sure FilterBox render correctly', () => {
        const props = {
            dictionary,
            handleActiveFilter: jest.fn(),
            hasFilters: false,
            options: {
                interests: [
                    { label: 'interest1', value: 'interest1' },
                    { label: 'interest2', value: 'interest2' },
                ],
                roles: [
                    { label: 'role1', value: 'role1' },
                    { label: 'role2', value: 'role2' },
                ],
                usages: [
                    { label: 'usage1', value: 'usage1' },
                    { label: 'usage2', value: 'usage2' },
                ],
            },
        };

        render(<FilterBox {...props} />);
        expect(screen.getByText(dictionary.barPlaceholder)).toBeTruthy();
    });
});
