import React from 'react';
import { render, screen } from '@testing-library/react';

import CavaticaIcon from '../../../../components/Widgets/Cavatica/CavaticaIcon';
import GridCardConnectPlaceholder from '../GridCardConnectPlaceholder';

const dictionary = {
    action: 'action',
    description: 'description',
};

describe('GridCardConnectPlaceholder', () => {
    test('make sure GridCardConnectPlaceholder render correctly', () => {
        const props = {
            dictionary,
            icon: <CavaticaIcon />,
        };

        render(<GridCardConnectPlaceholder {...props} />);
        expect(screen.getByText(dictionary.description)).toBeTruthy();
        expect(screen.getByText(dictionary.action)).toBeTruthy();
    });
});
