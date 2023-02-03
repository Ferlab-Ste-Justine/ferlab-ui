import React from 'react';
import { render, screen } from '@testing-library/react';

import { ProColumnType } from '../../../components/ProTable/types';

import EntityTable from '.';

const columns: ProColumnType[] = [
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
];

const data = [
    {
        columns1: 'Columns 1, Row 1',
        columns2: 'Columns 2, Row 1',
        columns3: 'Columns 3, Row 1',
    },
    {
        columns1: 'Columns 1, Row 2',
        columns2: 'Columns 2, Row 2',
        columns3: 'Columns 3, Row 2',
    },
    {
        columns1: 'Columns 1, Row 3',
        columns2: 'Columns 2, Row 3',
        columns3: 'Columns 3, Row 3',
    },
];

const summaryColumns = [
    {
        index: 0,
        value: 'Summary Columns 1',
    },
    {
        index: 1,
        value: 'Summary Columns 2',
    },
    {
        index: 2,
        value: 'Summary Columns 3',
    },
];

describe('EntityPage/EntityTable', () => {
    test('make sure table is not rendered while loading', () => {
        const props = {
            columns,
            data,
            header: 'Header',
            id: 'ID',
            loading: true,
            title: 'Title',
        };

        render(<EntityTable {...props} />);
        expect(screen.getByText('Title')).toBeTruthy();
        expect(screen.queryByText(data[0].columns1)).toBeNull();
        expect(screen.queryByText(data[2].columns3)).toBeNull();
    });
    test('make sure Title is rendered when the props is defined', () => {
        const props = {
            columns,
            data,
            header: 'Header',
            id: 'ID',
            loading: false,
            title: 'Title',
        };

        render(<EntityTable {...props} />);
        expect(screen.getByText('Title')).toBeTruthy();
    });
    test('make sure Title is NOT rendered when the props is undefined', () => {
        const props = {
            columns,
            data,
            header: 'Header',
            id: 'ID',
            loading: false,
        };

        render(<EntityTable {...props} />);
        expect(screen.queryByText('Title')).toBeNull();
    });

    test('make sure to display a ProTable if data is not empty', () => {
        const props = {
            columns,
            data,
            emptyMessage: 'Is empty',
            header: 'Header',
            id: 'ID',
            loading: false,
        };

        render(<EntityTable {...props} />);
        expect(screen.queryByText(props.emptyMessage)).toBeNull();
        expect(screen.getByText(data[0].columns1)).toBeTruthy();
        expect(screen.getByText(data[2].columns3)).toBeTruthy();
    });

    test('make sure to display "No data available" if data is empty', () => {
        const props = {
            columns,
            data: [],
            emptyMessage: 'Is empty',
            header: 'Header',
            id: 'ID',
            loading: false,
        };

        render(<EntityTable {...props} />);
        expect(screen.getByText(props.emptyMessage)).toBeTruthy();
        expect(screen.queryByText(data[0].columns1)).toBeNull();
        expect(screen.queryByText(data[2].columns3)).toBeNull();
    });

    test('make sure add a table summary if summaryColumns is defined', () => {
        const props = {
            columns,
            data,
            emptyMessage: 'Is empty',
            header: 'Header',
            id: 'ID',
            loading: false,
            summaryColumns,
        };

        render(<EntityTable {...props} />);
        expect(screen.getByText(data[0].columns1)).toBeTruthy();
        expect(screen.getByText(data[2].columns3)).toBeTruthy();
        expect(screen.getByText(summaryColumns[0].value)).toBeTruthy();
        expect(screen.getByText(summaryColumns[2].value)).toBeTruthy();
    });
});
