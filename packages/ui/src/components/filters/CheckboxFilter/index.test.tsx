import React from 'react';
import { render, screen } from '@testing-library/react';
import { capitalize } from 'lodash';

import { IFilter, IFilterCheckboxConfig, IFilterCount, IFilterGroup, VisualType } from '../types';

import CheckboxFilter, { TermFilterProps } from './CheckboxFilter';
import { getMappedName } from './CheckboxFilter.utils';

const filters: IFilter<IFilterCount>[] = [
    {
        data: {
            count: 1,
            key: 'One',
        },
        id: 'id_one',
        name: 'One',
    },
    {
        data: {
            count: 2,
            key: 'Two',
        },
        id: 'id_two',
        name: 'Two',
    },
];

const filterGroup: IFilterGroup<IFilterCheckboxConfig> = {
    field: 'this.field',
    title: 'title_filter_group',
    type: VisualType.Checkbox,
};

const defaultProps: TermFilterProps = {
    filterGroup,
    filters,
    hasSearchInput: false,
    maxShowing: 5,
    onChange: () => null,
};

describe('CheckboxFilter', () => {
    test('make sure Checkbox Filter is correctly rendered', () => {
        render(<CheckboxFilter {...defaultProps} />);

        expect(screen.queryByText(filters[0].name as string)).toBeTruthy();
        expect(screen.queryByText(filters[1].name as string)).toBeTruthy();
    });

    test('make sure dictionary switch visible if extra filters with 0 results', () => {
        defaultProps.filterGroup.config = {
            extraFilterDictionary: ['id_three'],
        };

        render(<CheckboxFilter {...defaultProps} />);

        expect(screen.queryByText('Dictionary')).toBeTruthy();
    });

    test('make sure dictionary switch is not visible if no extra filter with 0 results', () => {
        defaultProps.filterGroup.config = {
            extraFilterDictionary: [filters[0].id],
        };

        render(<CheckboxFilter {...defaultProps} />);

        expect(screen.queryByText('Dictionary')).toBeNull();
    });

    test('make sure get mapped function returns a value from nameMapping', () => {
        const nameMapping = {
            [filters[0].id]: 'ID One Custom Name',
        };

        filterGroup.config = {
            nameMapping,
        };

        const mappedName = getMappedName({
            filter: filters[0],
            filterGroup,
        });

        expect(mappedName).toBe('ID One Custom Name');
    });

    test('make sure get mapped function returns a value from facetTranslate', () => {
        filterGroup.config = {
            facetTranslate: (value: string) => capitalize(value.replace('_', ' ')),
        };

        const mappedName = getMappedName({
            filter: filters[0],
            filterGroup,
        });

        expect(mappedName).toBe('Id one');
    });
});
