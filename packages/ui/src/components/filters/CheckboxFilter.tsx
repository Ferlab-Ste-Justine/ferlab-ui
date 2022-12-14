import React, { Fragment, useEffect, useState } from 'react';
import { Button, Checkbox, Divider, Dropdown, Input, Menu, Space, Tag, Typography } from 'antd';
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

import styles from '@ferlab/style/components/filters/CheckboxFilter.module.scss';

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

const { Text } = Typography;

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
    const [isShowingMore, setShowingMore] = useState(false);
    const [localselectedFilters, setLocalSelectedFilters] = useState<IFilter[]>(selectedFilters);
    const [filteredFilters, setFilteredFilters] = useState(filters.filter((f) => !isEmpty(f.data)));
    const withFooter = get(filterGroup.config, 'withFooter', false);
    const showMoreReadOnly = get(filterGroup.config, 'showMoreReadOnly', false);
    const showSelectAll = get(filterGroup.config, 'showSelectAll', true);

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

    const bumpCheckedFilterFirst = () => {
        if (search) {
            return filteredFilters;
        }

        const filterIdsToBump = selectedFilters.map((value: IFilter) => value.id);
        const cleanedFilteredFilters = filteredFilters.filter((value: IFilter) => !filterIdsToBump.includes(value.id));

        return [...selectedFilters, ...cleanedFilteredFilters];
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

    const renderCheckBox = (filter: IFilter, i = -1) => (
        <StackLayout
            className={styles.checkboxFilterItem}
            horizontal
            key={`${filterGroup.field}-${filter.id}-${filter.data.count}-${localselectedFilters.length}-${i}`}
        >
            <Checkbox
                checked={localselectedFilters.some((f) => f.data.key === filter.data.key)}
                className={styles.fuiMcItemCheckbox}
                id={`input-${filter.data.key}`}
                name={`input-${filter.id}`}
                onChange={(e) => {
                    const { checked } = e.target;
                    let newFilter: IFilter[];
                    if (checked) {
                        newFilter = [...localselectedFilters, filter];
                    } else {
                        newFilter = localselectedFilters.filter((f) => f.id != filter.id);
                        setLocalSelectedFilters(newFilter);
                    }

                    handleOnChange(newFilter);
                }}
                type="checkbox"
            >
                <Text>{getMappedName(filter)}</Text>
            </Checkbox>
            <Tag className={styles.tag}>{numberFormat(filter.data.count)}</Tag>
        </StackLayout>
    );

    const noDataFilter = noDataInputOption && filteredFilters.find((f) => f.id === ArrangerValues.missing);

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
                    {showSelectAll && (
                        <StackLayout className={styles.checkboxFilterActions}>
                            <Button
                                className={styles.checkboxFilterLinks}
                                onClick={() => {
                                    const selectedItem = [...bumpCheckedFilterFirst(), ...localselectedFilters];
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
                    <ScrollContent
                        className={`${styles.checkboxFiltersContent} ${
                            filteredFilters.length > maxShowing && styles.withMargin
                        }`}
                    >
                        {bumpCheckedFilterFirst()
                            .filter((f) => !noDataInputOption || f.id !== ArrangerValues.missing)
                            .slice(0, isShowingMore ? Infinity : maxShowing)
                            .map((filter, i) => renderCheckBox(filter, i))}
                    </ScrollContent>
                    {noDataFilter && renderCheckBox(noDataFilter)}
                    {showMoreReadOnly ? (
                        <span className={cx(styles.filtersTypesFooter, styles.readOnly)}>
                            <>{`${filteredFilters.length} `}</>
                            <>{get(dictionary, 'actions.terms', 'terms')}</>
                        </span>
                    ) : (
                        filteredFilters.length > maxShowing && (
                            <Button
                                className={styles.filtersTypesFooter}
                                onClick={() => setShowingMore(!isShowingMore)}
                                onKeyPress={() => setShowingMore(!isShowingMore)}
                                tabIndex={0}
                                type="link"
                            >
                                {isShowingMore
                                    ? get(dictionary, 'actions.less', 'Less')
                                    : filteredFilters.length - maxShowing && (
                                          <>
                                              <>{`${filteredFilters.length - maxShowing} `}</>
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
