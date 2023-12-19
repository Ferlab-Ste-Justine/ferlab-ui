import React from 'react';
import { render, screen } from '@testing-library/react';

import GridCardConnectPlaceholder from '../GridCardConnectPlaceholder';

const dictionary = {
    action: 'action',
    description: 'description',
};

describe('GridCardConnectPlaceholder', () => {
    test('make sure GridCardConnectPlaceholder render correctly', () => {
        const props = {
            dictionary,
        };

        render(<GridCardConnectPlaceholder {...props} />);
        expect(screen.getByText(dictionary.description)).toBeTruthy();
        expect(screen.getByText(dictionary.action)).toBeTruthy();
    });
});
