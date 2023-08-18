import React, { Fragment, useEffect, useState } from 'react';
import { Button, Checkbox, Divider, Dropdown, Input, Menu, Space, Switch, Tag, Typography } from 'antd';
import cx from 'classnames';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';

import { ArrangerValues } from '../../../data/arranger/formatting';
import { TermOperators } from '../../../data/sqon/operators';
import { formatExtraFilters, hasExtraFilterSelected } from '../../../data/sqon/utils';
import ScrollContent from '../../../layout/ScrollContent';
import StackLayout from '../../../layout/StackLayout';
import { numberFormat } from '../../../utils/numberUtils';
import { IDictionary, IFilter, IFilterCheckboxConfig, IFilterCount, IFilterGroup, onChangeType } from '../types';

import { getMappedName, TGetMappedNameParams } from './CheckboxFilter.utils';

import styles from './CheckboxFilter.module.scss';

export type TermFilterProps = {
    dictionary?: IDictionary | Record<string, never>;
    filterGroup: IFilterGroup<IFilterCheckboxConfig>;
    onChange: onChangeType;
    selectedFilters?: IFilter[];
    maxShowing: number;
    hasSearchInput: boolean;
    filters: IFilter<IFilterCount>[];
};

type InternalCheckBoxProps = {
    filter: IFilter;
    filterGroup: IFilterGroup<IFilterCheckboxConfig>;
    getMappedName: (params: TGetMappedNameParams) => string;
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
            <Text>
                {getMappedName({
                    filter,
                    filterGroup,
                })}
            </Text>
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
}: TermFilterProps): JSX.Element => {
    const [search, setSearch] = useState('');
    const [includeExtraValues, setIncludeExtraValues] = useState(false);
    const [isShowingMore, setShowingMore] = useState(false);
    const [localselectedFilters, setLocalSelectedFilters] = useState<IFilter[]>(selectedFilters);
    const [filteredFilters, setFilteredFilters] = useState(filters.filter((f) => !isEmpty(f.data)));
    const withFooter = get(filterGroup.config, 'withFooter', false);
    const showMoreReadOnly = get(filterGroup.config, 'showMoreReadOnly', false);
    const showSelectAll = get(filterGroup.config, 'showSelectAll', true);

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
        const cleanedFilteredFilters = filters.filter((value: IFilter) => !filterIdsToBump.includes(value.id));

        const currentFilterList = [...selectedFilters, ...cleanedFilteredFilters];

        if (includeExtraValues) {
            return [...currentFilterList, ...getSortedExtraFilters(currentFilterList)];
        }

        return currentFilterList;
    };

    const getSortedExtraFilters = (currentFilters: IFilter<any>[]) =>
        formatExtraFilters(currentFilters, filterGroup)
            .map((filter) => ({
                ...filter,
                name: getMappedName({
                    dictionary,
                    filter,
                    filterGroup,
                }),
            }))
            .sort((a, b) => {
                if (a.id === ArrangerValues.missing) {
                    return 1;
                } else if (b.id === ArrangerValues.missing) {
                    return -1;
                } else {
                    return a.name.localeCompare(b.name);
                }
            });

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
        const newFilters = bumpCheckedFilterFirst()
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

            if (hasExtraFilterSelected(selectedFilters, filterGroup)) {
                setIncludeExtraValues(true);
            }
        }
    }, [selectedFilters]);

    const bumpedFilters = bumpCheckedFilterFirst();
    const extraFilters = formatExtraFilters(filters, filterGroup);
    const showDictionaryOption = filterGroup.config?.extraFilterDictionary && extraFilters.length > 0;
    const showActionBar = isEmpty(bumpedFilters) ? showDictionaryOption : showSelectAll || showDictionaryOption;

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
                        {showDictionaryOption && (
                            <StackLayout className={styles.checkboxDictAction}>
                                <Space>
                                    <Text>{get(dictionary, 'actions.dictionary', 'Dictionary')}</Text>
                                    <Switch
                                        checked={includeExtraValues}
                                        onChange={(checked) => {
                                            setIncludeExtraValues(checked);
                                            setShowingMore(checked);
                                        }}
                                        size="small"
                                    />
                                </Space>
                            </StackLayout>
                        )}
                    </StackLayout>
                )}
                {isEmpty(bumpedFilters) ? (
                    <Space className={styles.noResultsText} direction="vertical">
                        {get(dictionary, 'messages.errorNoData', 'No values found for this request')}
                    </Space>
                ) : (
                    <>
                        <ScrollContent className={`${styles.checkboxFiltersContent} ${styles.withMargin}`}>
                            {bumpedFilters.slice(0, isShowingMore ? Infinity : maxShowing).map((filter, i) => (
                                <InternalCheckBox
                                    filter={filter}
                                    filterGroup={filterGroup}
                                    getMappedName={getMappedName}
                                    handleOnChange={handleOnChange}
                                    index={i}
                                    key={filter.id}
                                    localSelectedFilters={localselectedFilters}
                                    setLocalSelectedFilters={setLocalSelectedFilters}
                                />
                            ))}
                        </ScrollContent>
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
                    </>
                )}
            </StackLayout>
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
                        disabled={isEmpty(bumpedFilters)}
                        menu={{
                            items: [
                                {
                                    key: TermOperators.in,
                                    label: get(dictionary, 'operators.anyOf', 'Any of'),
                                },
                                {
                                    key: TermOperators.all,
                                    label: get(dictionary, 'operators.allOf', 'All of'),
                                },
                                {
                                    key: TermOperators['not-in'],
                                    label: get(dictionary, 'operators.noneOf', 'None of'),
                                },
                            ],
                            onClick: (e) => handleOnApply(e.key as TermOperators),
                        }}
                        onClick={() => handleOnApply(TermOperators.in)}
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
