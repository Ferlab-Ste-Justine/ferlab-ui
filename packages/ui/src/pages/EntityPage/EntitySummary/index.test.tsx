import React from 'react';
import { render, screen } from '@testing-library/react';

import EntitySummary, { IEntitySummaryColumns } from '.';

const data: IEntitySummaryColumns[] = [
    {
        column: {
            lg: 12,
            md: 24,
            xs: 24,
        },
        rows: [
            {
                data: [
                    {
                        label: 'Row 1 - Label 1',
                        value: 'Row 1 - Value 1',
                    },
                    {
                        label: 'Row 1 - Label 2',
                        value: 'Row 1 - Value 2',
                    },
                ],
                title: '',
            },
        ],
    },
    {
        column: {
            lg: 12,
            md: 24,
            xs: 24,
        },
        rows: [
            {
                data: [
                    {
                        label: 'Row 2 - Label 1',
                        value: 'Row 2 - Value 1',
                    },
                    {
                        label: 'Row 2 - Label 2',
                        value: 'Row 2 - Value 2',
                    },
                ],
                title: 'Title Row 2',
            },
            {
                data: [
                    {
                        label: 'Row 3 - Label 1',
                        value: 'Row 3 - Value 1',
                    },
                ],
                title: 'Title Row 3',
            },
        ],
    },
];

describe('EntityPage/EntitySummary', () => {
    test('make sure table is not rendered while loading', () => {
        const props = {
            data: [],
            header: 'Header',
            id: 'ID',
            loading: true,
            title: 'Title',
        };

        render(<EntitySummary {...props} />);
        expect(screen.queryByText('Row 1 - Value 1')).toBeNull();
    });

    test('make sure Title is rendered when the props is defined', () => {
        const props = {
            data,
            header: 'Header',
            id: 'ID',
            loading: false,
            title: 'Title',
        };

        render(<EntitySummary {...props} />);
        expect(screen.getByText('Title')).toBeTruthy();
    });

    test('make sure to render Data when data is not empty', () => {
        const props = {
            data,
            header: 'Header',
            id: 'ID',
            loading: false,
            title: 'Title',
        };

        render(<EntitySummary {...props} />);
        expect(screen.queryByText('Row 1 - Value 1')).toBeTruthy();
    });

    test('make sure to render Data when data is empty', () => {
        const props = {
            data: [],
            header: 'Header',
            id: 'ID',
            loading: false,
            title: 'Title',
        };

        render(<EntitySummary {...props} />);
        expect(screen.queryByText('Row 1 - Value 1')).toBeNull();
    });
});
