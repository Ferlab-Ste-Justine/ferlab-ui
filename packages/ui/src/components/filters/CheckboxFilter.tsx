import React, { Fragment, useEffect, useState } from 'react';
import { Button, Checkbox, Divider, Tag, Typography, Input, Dropdown, Menu, Space } from 'antd';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import cx from 'classnames';

import ScrollContent from '../../layout/ScrollContent';
import StackLayout from '../../layout/StackLayout';
import { numberFormat } from '../../utils/numberUtils';
import { removeUnderscoreAndCapitalize } from '../../utils/stringUtils';

import { IDictionary, IFilter, IFilterCheckboxConfig, IFilterCount, IFilterGroup, onChangeType } from './types';

import styles from '@ferlab/style/components/filters/CheckboxFilter.module.scss';
import { TermOperators } from '../../data/sqon/operators';

export type TermFilterProps = {
    dictionary?: IDictionary | Record<string, never>;
    filterGroup: IFilterGroup<IFilterCheckboxConfig>;
    onChange: onChangeType;
    selectedFilters?: IFilter[];
    maxShowing: number;
    hasSearchInput: boolean;
    filters: IFilter<IFilterCount>[];
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
}: TermFilterProps) => {
    const [search, setSearch] = useState('');
    const [isShowingMore, setShowingMore] = useState(false);
    const [localselectedFilters, setLocalSelectedFilters] = useState<IFilter[]>(selectedFilters);
    const [filteredFilters, setFilteredFilters] = useState(filters.filter((f) => !isEmpty(f.data)));
    const withFooter = get(filterGroup.config, 'withFooter', false);
    const showMoreReadOnly = get(filterGroup.config, 'showMoreReadOnly', false);
    const showSelectAll = get(filterGroup.config, 'showSelectAll', true);

    const getMappedName = (name: string) => {
        return removeUnderscoreAndCapitalize(filterGroup.config?.nameMapping[name] || name);
    };

    const hasChanged = () => {
        if (localselectedFilters.length != selectedFilters.length) return true;
        if (localselectedFilters.length + selectedFilters.length == 0) return false;

        return !localselectedFilters.every(
            (value: IFilter) => selectedFilters.find((sValue: IFilter) => sValue.id == value.id) != undefined,
        );
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
            .filter(({ data }) => data.key.toLowerCase().includes(search.toLowerCase()));
        setFilteredFilters(newFilters);
    }, [filters, search]);

    useEffect(() => {
        if (!isEqual(localselectedFilters, selectedFilters)) {
            setLocalSelectedFilters(selectedFilters);
        }
    }, [selectedFilters]);

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
                <Space direction="vertical" className={styles.noResultsText}>
                    {get(dictionary, 'messages.errorNoData', 'No values found for this request')}
                </Space>
            ) : (
                <StackLayout className={styles.checkboxFilter} vertical>
                    {showSelectAll && (
                        <StackLayout className={styles.checkboxFilterActions}>
                            <Button
                                className={styles.checkboxFilterLinks}
                                onClick={() => handleOnChange(filters)}
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
                            .slice(0, isShowingMore ? Infinity : maxShowing)
                            .map((filter, i) => (
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
                                        <Text>{getMappedName(filter.name)}</Text>
                                    </Checkbox>
                                    <Tag className={styles.tag}>{numberFormat(filter.data.count)}</Tag>
                                </StackLayout>
                            ))}
                    </ScrollContent>
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
                        disabled={selectedFilters.length == 0 && localselectedFilters.length == 0}
                        className={styles.fuiCbfActionsClear}
                        size="small"
                        onClick={() => setLocalSelectedFilters([])}
                        type="text"
                    >
                        {get(dictionary, 'actions.clear', 'Clear')}
                    </Button>
                    <Dropdown.Button
                        className={styles.fuiCbfActionsApply}
                        type="primary"
                        size="small"
                        overlay={
                            <Menu onClick={(e) => handleOnApply(e.key as TermOperators)}>
                                <Menu.Item key={TermOperators.in}>
                                    {get(dictionary, 'operators.anyOf', 'Any of')}
                                </Menu.Item>
                                <Menu.Item key={TermOperators.all}>
                                    {get(dictionary, 'operators.allOf', 'All of')}
                                </Menu.Item>
                                <Menu.Item key={TermOperators['not-in']}>
                                    {get(dictionary, 'operators.noneOf', 'None of')}
                                </Menu.Item>
                            </Menu>
                        }
                        onClick={() => handleOnApply(TermOperators.in)}
                    >
                        <span data-key="apply">{get(dictionary, 'actions.apply', 'Apply')}</span>
                    </Dropdown.Button>
                </StackLayout>
            )}
        </Fragment>
    );
};

export default CheckboxFilter;
