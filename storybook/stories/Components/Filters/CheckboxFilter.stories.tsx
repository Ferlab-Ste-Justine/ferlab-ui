import React from 'react';
import { Meta, Story } from '@storybook/react/types-6-0';
import { CheckboxFilter, TermFilterProps } from '@ferlab/ui/core/components/filters/CheckboxFilter';
import {
    IDictionary,
    IFilter,
    IFilterCount,
    IFilterGroup,
    onChangeType,
    VisualType,
    IFilterCheckboxConfig,
} from '@ferlab/ui/core/components/filters/types';
import { dictionaryFrench, filters, filtersWithBigCounts, filtersWithNoData } from './data';

export default {
    title: '@ferlab/Components/Filters/CheckboxFilter',
    component: CheckboxFilter,
    decorators: [
        (Story) => (
            <>
                <div className={'story_container'} style={{ display: 'inline-grid', minWidth: '260px' }}>
                    <Story />
                </div>
            </>
        ),
    ],
    argTypes: {
        className: {
            control: 'string',
        },
        children: {
            control: 'object',
        },
    },
} as Meta;

const TermFilterStory = ({
    title,
    maxShowing,
    filterGroup,
    onChange,
    ...props
}: {
    title: string;
    maxShowing: number;
    filterGroup: IFilterGroup;
    onChange: onChangeType;
    hasSearchInput: boolean;
    filters: IFilter<IFilterCount>[];
    dictionary: IDictionary;
    props: Story<TermFilterProps>;
}) => (
    <>
        <h3>{title}</h3>
        <CheckboxFilter maxShowing={maxShowing} filterGroup={filterGroup} onChange={onChange} {...props} />
    </>
);

const filterGroup: IFilterGroup<IFilterCheckboxConfig> = {
    type: VisualType.Checkbox,
    field: 'this.field',
    title: 'title_filter_group',
};

const onChangeTypeStory: onChangeType = () => null;

export const WithDictionary = TermFilterStory.bind({});
WithDictionary.args = {
    title: 'CheckboxFilter Dictionary',
    maxShowing: 6,
    filterGroup: {
        ...filterGroup,
        config: {
            extraFilterDictionary: ['extra_filter_1', 'extra_filter_2'],
        },
    },
    onChangeType: onChangeTypeStory(filterGroup, filters),
    hasSearchInput: true,
    filters: filtersWithNoData,
};

export const WithMore = TermFilterStory.bind({});
WithMore.args = {
    title: 'CheckboxFilter More',
    maxShowing: 6,
    filterGroup: filterGroup,
    onChangeType: onChangeTypeStory(filterGroup, filters),
    hasSearchInput: true,
    filters: filters,
};

export const WithFew = TermFilterStory.bind({});
WithFew.args = {
    title: 'CheckboxFilter Few',
    maxShowing: 6,
    filterGroup: filterGroup,
    onChangeType: onChangeTypeStory(filterGroup, filters),
    hasSearchInput: true,
    filters: filters.slice(0, 4),
};

export const WithNoData = TermFilterStory.bind({});
WithNoData.args = {
    title: 'CheckboxFilter No Data',
    maxShowing: 6,
    filterGroup: filterGroup,
    onChangeType: onChangeTypeStory(filterGroup, filters),
    hasSearchInput: true,
    filters: [],
};

export const WithNoDataCheckbox = TermFilterStory.bind({});
WithNoDataCheckbox.args = {
    title: 'CheckboxFilter No Data checkbox',
    maxShowing: 6,
    filterGroup: filterGroup,
    onChangeType: onChangeTypeStory(filterGroup, filters),
    hasSearchInput: true,
    filters: filtersWithNoData,
};

export const WithBigCount = TermFilterStory.bind({});
WithBigCount.args = {
    dictionary: dictionaryFrench,
    title: 'CheckboxFilter Big Count',
    maxShowing: 6,
    filterGroup: filterGroup,
    onChangeType: onChangeTypeStory(filterGroup, filtersWithBigCounts),
    hasSearchInput: true,
    filters: filtersWithBigCounts,
};

export const WithFrenchTranslation = TermFilterStory.bind({});
WithFrenchTranslation.args = {
    dictionary: dictionaryFrench,
    title: 'CheckboxFilter in French',
    maxShowing: 6,
    filterGroup: filterGroup,
    onChangeType: onChangeTypeStory(filterGroup, filters),
    hasSearchInput: true,
    filters: filters,
};

export const WithFooter = TermFilterStory.bind({});
WithFooter.args = {
    dictionary: dictionaryFrench,
    title: 'CheckboxFilter in French',
    maxShowing: 6,
    filterGroup: {
        ...filterGroup,
        config: {
            nameMapping: {},
            withFooter: true,
        },
    },
    onChangeType: onChangeTypeStory(filterGroup, filters),
    hasSearchInput: true,
    filters: filters,
};
