import React from 'react';
import { render, screen } from '@testing-library/react';
import { capitalize } from 'lodash';

import { SelectedCount } from '.';

describe('SelectedCount', () => {
    test('make sure clear Button is correctly rendered', () => {
        const props = {
            selectedRowCount: 10,
        };

        render(<SelectedCount {...props} />);
        expect(screen.getByText('Clear')).toBeTruthy();
    });

    test('make sure selectedAllPage Button is correctly rendered', () => {
        const props = {
            selectedAllPage: true,
            selectedRowCount: 10,
        };

        render(<SelectedCount {...props} />);
        expect(screen.getByText('Select all results')).toBeTruthy();
    });
    test('make sure the text is correctly rendered when more than 1 selectedRowCount', () => {
        const props = {
            selectedRowCount: 10,
        };

        render(<SelectedCount {...props} />);
        expect(screen.getByText('items selected')).toBeTruthy();
    });

    test('make sure the text is correctly rendered when only 1 selectedRowCount', () => {
        const props = {
            selectedRowCount: 1,
        };

        render(<SelectedCount {...props} />);
        expect(screen.getByText('item selected')).toBeTruthy();
    });
});
