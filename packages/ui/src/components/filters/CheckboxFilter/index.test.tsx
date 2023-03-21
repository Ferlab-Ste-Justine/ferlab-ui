import React from 'react';
import { IFilter, IFilterCheckboxConfig, IFilterCount, IFilterGroup, VisualType } from '../types';
import CheckboxFilter, { TermFilterProps } from './CheckboxFilter';
import { render, screen } from '@testing-library/react';
import { getMappedName } from './CheckboxFilter.utils';
import { capitalize } from 'lodash';

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

describe('CheckboxFilter', () => {
    test('make sure Checkbox Filter is correctly rendered', () => {
        const props: TermFilterProps = {
            filterGroup,
            filters,
            hasSearchInput: false,
            maxShowing: 5,
            onChange: () => null,
        };

        render(<CheckboxFilter {...props} />);

        expect(screen.getByText(filters[0].name as string)).toBeTruthy();
        expect(screen.getByText(filters[1].name as string)).toBeTruthy();
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
