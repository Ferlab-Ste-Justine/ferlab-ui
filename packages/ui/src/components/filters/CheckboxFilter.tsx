import React, { Fragment, useEffect, useState } from 'react';
import { Button, Checkbox, Divider, Dropdown, Input, Menu, Space, Switch, Tag, Typography } from 'antd';
import cx from 'classnames';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import { ArrangerValues } from '../../data/arranger/formatting';
import { TermOperators } from '../../data/sqon/operators';
import ScrollContent from '../../layout/ScrollContent';
import StackLayout from '../../layout/StackLayout';
import { numberFormat } from '../../utils/numberUtils';
import { removeUnderscoreAndCapitalize } from '../../utils/stringUtils';

import { IDictionary, IFilter, IFilterCheckboxConfig, IFilterCount, IFilterGroup, onChangeType } from './types';

import styles from './CheckboxFilter.module.scss';

export type TermFilterProps = {
    dictionary?: IDictionary | Record<string, never>;
    filterGroup: IFilterGroup<IFilterCheckboxConfig>;
    onChange: onChangeType;
    selectedFilters?: IFilter[];
    maxShowing: number;
    hasSearchInput: boolean;
    filters: IFilter<IFilterCount>[];
    noDataInputOption?: boolean;
};

type InternalCheckBoxProps = {
    filter: IFilter;
    filterGroup: IFilterGroup<IFilterCheckboxConfig>;
    getMappedName: (filter: IFilter) => string;
    handleOnChange: (newFilter: IFilter[]) => void;
    localSelectedFilters: IFilter[];
    setLocalSelectedFilters: (newFilter: IFilter[]) => void;
    index?: number;
};

const { Text } = Typography;

const InternalCheckBox = ({
    filter,
    filterGroup,
    getMappedName,
    handleOnChange,
    localSelectedFilters,
    setLocalSelectedFilters,
    index = -1,
}: InternalCheckBoxProps) => (
    <StackLayout
        className={styles.checkboxFilterItem}
        horizontal
        key={`${filterGroup.field}-${filter.id}-${filter.data.count}-${localSelectedFilters.length}-${index}`}
    >
        <Checkbox
            checked={localSelectedFilters.some((f) => f.data.key === filter.data.key)}
            className={styles.fuiMcItemCheckbox}
            id={`input-${filter.data.key}`}
            name={`input-${filter.id}`}
            onChange={(e) => {
                const { checked } = e.target;
                let newFilters: IFilter[];
                if (checked) {
                    newFilters = [...localSelectedFilters, filter];
                } else {
                    newFilters = localSelectedFilters.filter((f) => f.id !== filter.id);
                    setLocalSelectedFilters(newFilters);
                }

                handleOnChange(newFilters);
            }}
            type="checkbox"
        >
            <Text>{getMappedName(filter)}</Text>
        </Checkbox>
        <Tag className={styles.tag}>{numberFormat(filter.data.count)}</Tag>
    </StackLayout>
);

const CheckboxFilter = ({
    dictionary,
    filterGroup,
    filters,
    hasSearchInput,
    maxShowing,
    onChange,
    selectedFilters = [],
    noDataInputOption = false,
}: TermFilterProps) => {
    const [search, setSearch] = useState('');
    const [includeExtraValues, setIncludeExtraValues] = useState(false);
    const [isShowingMore, setShowingMore] = useState(false);
    const [localselectedFilters, setLocalSelectedFilters] = useState<IFilter[]>(selectedFilters);
    const [filteredFilters, setFilteredFilters] = useState(filters.filter((f) => !isEmpty(f.data)));
    const withFooter = get(filterGroup.config, 'withFooter', false);
    const showMoreReadOnly = get(filterGroup.config, 'showMoreReadOnly', false);
    const showSelectAll = get(filterGroup.config, 'showSelectAll', true);
    const extraFilterDictionary = get(filterGroup.config, 'extraFilterDictionary', null);
    const showActionBar = showSelectAll || extraFilterDictionary;

    const getMappedName = (filter: IFilter) => {
        if (noDataInputOption && filter.id === ArrangerValues.missing) {
            return get(dictionary, 'checkBox.noData', 'No Data');
        }

        return typeof filter.name === 'string'
            ? removeUnderscoreAndCapitalize(
                  (filterGroup.config?.nameMapping && filterGroup.config?.nameMapping[filter.id]) || filter.name,
              )
            : filter.name;
    };

    const handleOnChange = (newFilter: IFilter[]) => {
        if (withFooter) {
            setLocalSelectedFilters(newFilter);
        } else {
            onChange(filterGroup, newFilter);
        }
    };

    const formatExtraFilters = (currentFilters: IFilter<IFilterCount>[]): IFilter<IFilterCount>[] =>
        (extraFilterDictionary || [])
            .filter((filterKey) => !currentFilters.some(({ id }) => id === filterKey))
            .map(
                (value): IFilter<IFilterCount> => ({
                    data: {
                        key: value,
                        count: 0,
                    },
                    name: value,
                    id: value,
                }),
            );

    const bumpCheckedFilterFirst = () => {
        if (search) {
            return filteredFilters;
        }

        const filterIdsToBump = selectedFilters.map((value: IFilter) => value.id);
        const cleanedFilteredFilters = filteredFilters.filter((value: IFilter) => !filterIdsToBump.includes(value.id));

        const currentFilterList = [...selectedFilters, ...cleanedFilteredFilters];

        if (includeExtraValues) {
            return [...currentFilterList, ...formatExtraFilters(currentFilterList)];
        }

        return currentFilterList;
    };

    const handleOnApply = (operator: TermOperators = TermOperators.in) => {
        onChange(
            filterGroup,
            localselectedFilters.map((filter) => ({
                ...filter,
                data: {
                    ...filter.data,
                    operator,
                },
            })),
        );
    };

    useEffect(() => {
        const newFilters = filters
            .filter((f) => !isEmpty(f.data))
            .filter(
                ({ data, name }) =>
                    data.key.toLowerCase().includes(search.toLowerCase()) ||
                    (typeof name === 'string' && name.toLowerCase().includes(search.toLowerCase())),
            );
        setFilteredFilters(newFilters);
    }, [filters, search]);

    useEffect(() => {
        if (!isEqual(localselectedFilters, selectedFilters)) {
            setLocalSelectedFilters(selectedFilters);
        }
    }, [selectedFilters]);

    const noDataFilter = noDataInputOption && filteredFilters.find((f) => f.id === ArrangerValues.missing);

    const bumpedFilters = bumpCheckedFilterFirst();

    return (
        <Fragment>
            {hasSearchInput && (
                <div className={styles.filterSearchWrapper}>
                    <Input
                        allowClear
                        aria-label={get(dictionary, 'checkBox.searchPlaceholder', 'Search...')}
                        autoFocus
                        className={styles.filterSearchInput}
                        onChange={(value) => setSearch(value.target.value || '')}
                        placeholder={get(dictionary, 'checkBox.searchPlaceholder', 'Search...')}
                        value={search}
                    />
                </div>
            )}

            {isEmpty(filteredFilters) ? (
                <Space className={styles.noResultsText} direction="vertical">
                    {get(dictionary, 'messages.errorNoData', 'No values found for this request')}
                </Space>
            ) : (
                <StackLayout className={styles.checkboxFilter} vertical>
                    {showActionBar && (
                        <StackLayout className={styles.actionBar}>
                            {showSelectAll && (
                                <StackLayout className={styles.checkboxSelectActions}>
                                    <Button
                                        className={styles.checkboxFilterLinks}
                                        onClick={() => {
                                            const selectedItem = [...bumpedFilters, ...localselectedFilters];
                                            const uniqueObjArray = [
                                                ...new Map(selectedItem.map((item) => [item['name'], item])).values(),
                                            ];
                                            handleOnChange(uniqueObjArray);
                                        }}
                                        type="text"
                                    >
                                        {get(dictionary, 'actions.all', 'Select All')}
                                    </Button>

                                    <Divider className={styles.separator} type="vertical" />
                                    <Button
                                        className={styles.checkboxFilterLinks}
                                        onClick={() => handleOnChange([])}
                                        type="text"
                                    >
                                        {get(dictionary, 'actions.none', 'None')}
                                    </Button>
                                </StackLayout>
                            )}
                            {extraFilterDictionary && (
                                <StackLayout className={styles.checkboxDictAction}>
                                    <Space>
                                        <Text>{get(dictionary, 'actions.dictionary', 'Dictionary')}</Text>
                                        <Switch
                                            size="small"
                                            onChange={(checked) => {
                                                setIncludeExtraValues(checked);
                                                setShowingMore(checked);
                                            }}
                                        />
                                    </Space>
                                </StackLayout>
                            )}
                        </StackLayout>
                    )}
                    <ScrollContent
                        id="lol"
                        className={`${styles.checkboxFiltersContent} ${
                            filteredFilters.length > maxShowing && styles.withMargin
                        }`}
                    >
                        {bumpedFilters
                            .filter((f) => !noDataInputOption || f.id !== ArrangerValues.missing)
                            .slice(0, isShowingMore ? Infinity : maxShowing)
                            .map((filter, i) => (
                                <InternalCheckBox
                                    filter={filter}
                                    filterGroup={filterGroup}
                                    getMappedName={getMappedName}
                                    handleOnChange={handleOnChange}
                                    index={i}
                                    localSelectedFilters={localselectedFilters}
                                    setLocalSelectedFilters={setLocalSelectedFilters}
                                />
                            ))}
                    </ScrollContent>
                    {noDataFilter && (
                        <InternalCheckBox
                            filter={noDataFilter}
                            filterGroup={filterGroup}
                            getMappedName={getMappedName}
                            handleOnChange={handleOnChange}
                            localSelectedFilters={localselectedFilters}
                            setLocalSelectedFilters={setLocalSelectedFilters}
                        />
                    )}
                    {showMoreReadOnly ? (
                        <span className={cx(styles.filtersTypesFooter, styles.readOnly)}>
                            <>{`${bumpedFilters.length} `}</>
                            <>{get(dictionary, 'actions.terms', 'terms')}</>
                        </span>
                    ) : (
                        bumpedFilters.length > maxShowing && (
                            <Button
                                className={styles.filtersTypesFooter}
                                onClick={() => setShowingMore(!isShowingMore)}
                                onKeyPress={() => setShowingMore(!isShowingMore)}
                                tabIndex={0}
                                type="link"
                            >
                                {isShowingMore
                                    ? get(dictionary, 'actions.less', 'Less')
                                    : bumpedFilters.length - maxShowing && (
                                          <>
                                              <>{`${bumpedFilters.length - maxShowing} `}</>
                                              <>{get(dictionary, 'actions.more', 'More')}</>
                                          </>
                                      )}
                            </Button>
                        )
                    )}
                </StackLayout>
            )}

            {withFooter && (
                <StackLayout className={styles.fuiCbfActions} horizontal>
                    <Button
                        className={styles.fuiCbfActionsClear}
                        disabled={selectedFilters.length == 0 && localselectedFilters.length == 0}
                        onClick={() => setLocalSelectedFilters([])}
                        size="small"
                        type="text"
                    >
                        {get(dictionary, 'actions.clear', 'Clear')}
                    </Button>
                    <Dropdown.Button
                        className={styles.fuiCbfActionsApply}
                        disabled={isEmpty(filteredFilters)}
                        onClick={() => handleOnApply(TermOperators.in)}
                        overlay={
                            <Menu
                                items={[
                                    {
                                        key: TermOperators.in,
                                        label: get(dictionary, 'operators.anyOf', 'Any of'),
                                    },
                                    {
                                        key: TermOperators.all,
                                        label: get(dictionary, 'operators.allOf', 'All of'),
                                    },
                                    {
                                        key: TermOperators['some-not-in'],
                                        label: get(dictionary, 'operators.noneOf', 'None of'),
                                    },
                                ]}
                                onClick={(e) => handleOnApply(e.key as TermOperators)}
                            />
                        }
                        size="small"
                        type="primary"
                    >
                        <span data-key="apply">{get(dictionary, 'actions.apply', 'Apply')}</span>
                    </Dropdown.Button>
                </StackLayout>
            )}
        </Fragment>
    );
};

export default CheckboxFilter;
