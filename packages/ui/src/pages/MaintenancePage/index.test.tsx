import React from 'react';
import { render, screen } from '@testing-library/react';

import MaintenancePage from '.';

describe('MaintenancePage', () => {
    test('make sure Maintenance page is correctly rendered', () => {
        const props = {
            subtitle: 'Subtitle',
            title: 'Title',
        };

        render(<MaintenancePage {...props} />);
        expect(screen.getByText(props.title)).toBeTruthy();
        expect(screen.getByText(props.subtitle)).toBeTruthy();
    });
});
