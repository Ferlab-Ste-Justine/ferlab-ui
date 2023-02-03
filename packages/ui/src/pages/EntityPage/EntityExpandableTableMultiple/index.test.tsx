import React from 'react';
import { render, screen } from '@testing-library/react';

import EntityExpandableTableMultiple from '.';

const tables = [
    {
        columns: [
            {
                dataIndex: 'columns1',
                key: 'columns1',
                title: 'table 1 columns one',
            },
            {
                dataIndex: 'columns2',
                key: 'columns2',
                title: 'table 1 columns two',
            },
            {
                dataIndex: 'columns3',
                key: 'columns3',
                title: 'table 1columns three',
            },
        ],
        data: [
            {
                columns1: 'Table 1 Columns 1, Row 1',
                columns2: 'Table 1 Columns 2, Row 1',
                columns3: 'Table 1 Columns 3, Row 1',
            },
            {
                columns1: 'Table 1 Columns 1, Row 2',
                columns2: 'Table 1 Columns 2, Row 2',
                columns3: 'Table 1 Columns 3, Row 2',
            },
            {
                columns1: 'Table 1 Columns 1, Row 3',
                columns2: 'Table 1 Columns 2, Row 3',
                columns3: 'Table 1 Columns 3, Row 3',
            },
        ],
        subtitle: <span>Subtitle for Table 1</span>,
    },

    {
        bordered: false,
        columns: [
            {
                dataIndex: 'columns1',
                key: 'columns1',
                title: 'columns one',
            },
            {
                dataIndex: 'columns2',
                key: 'columns2',
                title: 'columns two',
            },
            {
                dataIndex: 'columns3',
                key: 'columns3',
                title: 'columns three',
            },
        ],
        data: [
            {
                columns1: 'Table 2 Columns 1, Row 1',
                columns2: 'Table 2 Columns 2, Row 1',
                columns3: 'Table 2 Columns 3, Row 1',
            },
            {
                columns1: 'Table 2 Columns 1, Row 2',
                columns2: 'Table 2 Columns 2, Row 2',
                columns3: 'Table 2 Columns 3, Row 2',
            },
            {
                columns1: 'Table 2 Columns 1, Row 3',
                columns2: 'Table 2 Columns 2, Row 3',
                columns3: 'Table 2 Columns 3, Row 3',
            },
        ],
    },
];

describe('EntityPage/EntityExpandableTableMultiple', () => {
    test('make sure table is not rendered while loading', () => {
        const props = {
            header: 'Header',
            id: 'ID',
            loading: true,
            tables,
            title: 'Title',
        };

        render(<EntityExpandableTableMultiple {...props} />);
        expect(screen.getByText('Title')).toBeTruthy();
        expect(screen.queryByText('Table 1 Columns 1, Row 1')).toBeNull();
        expect(screen.queryByText('Table 2 Columns 1, Row 1')).toBeNull();
    });
    test('make sure Title is rendered when the props is defined', () => {
        const props = {
            header: 'Header',
            id: 'ID',
            loading: false,
            tables,
            title: 'Title',
        };

        render(<EntityExpandableTableMultiple {...props} />);
        expect(screen.getByText('Title')).toBeTruthy();
    });
    test('make sure Title is NOT rendered when the props is undefined', () => {
        const props = {
            header: 'Header',
            id: 'ID',
            loading: false,
            tables,
        };

        render(<EntityExpandableTableMultiple {...props} />);
        expect(screen.queryByText('Title')).toBeNull();
    });

    test('make sure all Tables are displayed', () => {
        const props = {
            header: 'Header',
            id: 'ID',
            loading: false,
            tables,
        };

        render(<EntityExpandableTableMultiple {...props} />);
        expect(screen.queryByText('Table 1 Columns 1, Row 1')).toBeTruthy();
        expect(screen.queryByText('Table 2 Columns 1, Row 1')).toBeTruthy();
    });
});
