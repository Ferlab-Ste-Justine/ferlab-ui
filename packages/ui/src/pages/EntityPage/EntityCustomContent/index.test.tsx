import React from 'react';
import { render, screen } from '@testing-library/react';

import EntityCustomContent from '.';

const customContent = <span>Custom content</span>;

describe('EntityPage/EntityCustomContent', () => {
    test('make sure content is not rendered while loading', () => {
        const props = {
            customContent,
            header: 'Header',
            id: 'ID',
            loading: true,
            title: 'Title',
        };

        render(<EntityCustomContent {...props} />);
        expect(screen.getByText('Title')).toBeTruthy();
        expect(screen.queryByText('Custom content')).toBeNull();
    });
    test('make sure Title is rendered when the props is defined', () => {
        const props = {
            customContent,
            header: 'Header',
            id: 'ID',
            loading: false,
            title: 'Title',
        };

        render(<EntityCustomContent {...props} />);
        expect(screen.getByText('Title')).toBeTruthy();
    });
    test('make sure Title is NOT rendered when the props is undefined', () => {
        const props = {
            customContent,
            header: 'Header',
            id: 'ID',
            loading: false,
        };

        render(<EntityCustomContent {...props} />);
        expect(screen.queryByText('Title')).toBeNull();
    });

    test('make sure to display a Custom Content if it is not empty', () => {
        const props = {
            customContent,
            emptyMessage: 'Is empty',
            header: 'Header',
            id: 'ID',
            loading: false,
        };

        render(<EntityCustomContent {...props} />);
        expect(screen.queryByText(props.emptyMessage)).toBeNull();
        expect(screen.getByText('Custom content')).toBeTruthy();
    });

    test('make sure to display "No data available" if custom content is empty', () => {
        const props = {
            customContent: undefined,
            emptyMessage: 'Is empty',
            header: 'Header',
            id: 'ID',
            loading: false,
        };

        render(<EntityCustomContent {...props} />);
        expect(screen.getByText(props.emptyMessage)).toBeTruthy();
        expect(screen.queryByText('Custom content')).toBeNull();
    });
});
