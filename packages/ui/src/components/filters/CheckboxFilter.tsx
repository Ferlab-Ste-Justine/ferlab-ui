import React, { Fragment, useEffect, useState } from 'react';
import { AutoComplete, Button, Checkbox, Divider, Tag, Dropdown, Menu, Typography } from 'antd';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import StackLayout from '../../layout/StackLayout';
import { numberFormat } from '../../utils/numberUtils';

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

    const getMappedName = (name: string) => {
        return filterGroup.config?.nameMapping[name] || name;
    };

    const hasChanged = () => {
        if (localselectedFilters.length != selectedFilters.length) return true;
        if (localselectedFilters.length + selectedFilters.length == 0) return false;

        let changed: boolean = true;
        localselectedFilters.map((value: IFilter) => {
            changed &&= selectedFilters.find((sValue: IFilter) => sValue.id == value.id) == undefined;
        });
        return changed;
    };

    useEffect(() => {
        setLocalSelectedFilters(selectedFilters);
    }, [selectedFilters]);

    useEffect(() => {
        const filtersWithData = filters.filter((f) => !isEmpty(f.data));
        const newFilters = filtersWithData.filter(({ data }) => data.key.toLowerCase().includes(search.toLowerCase()));

        setFilteredFilters(newFilters);
    }, [filters, search]);

    return (
        <Fragment>
            {hasSearchInput && (
                <div className={styles.filterSearchWrapper}>
                    <AutoComplete
                        allowClear
                        aria-label={get(dictionary, 'checkBox.searchPlaceholder', 'Search...')}
                        autoFocus
                        className={styles.filterSearchInput}
                        onChange={(value) => {
                            if (value) {
                                setSearch(value);
                            } else {
                                setSearch('');
                            }
                        }}
                        options={filteredFilters.map((filter) => ({ label: filter.name, value: filter.data.key }))}
                        placeholder={get(dictionary, 'checkBox.searchPlaceholder', 'Search...')}
                        value={search}
                    />
                </div>
            )}
            {filteredFilters.length > 0 && (
                <StackLayout className={styles.checkboxFilter} vertical>
                    <StackLayout className={styles.checkboxFilterActions}>
                        <Button
                            className={styles.checkboxFilterLinks}
                            onClick={() => setLocalSelectedFilters(filters)}
                            type="text"
                        >
                            {get(dictionary, 'actions.all', 'Select All')}
                        </Button>

                        <Divider className={styles.separator} type="vertical" />
                        <Button
                            className={styles.checkboxFilterLinks}
                            onClick={() => setLocalSelectedFilters([])}
                            type="text"
                        >
                            {get(dictionary, 'actions.none', 'None')}
                        </Button>
                    </StackLayout>
                    <div
                        className={`${styles.checkboxFiltersContent} ${
                            filteredFilters.length > maxShowing && styles.withMargin
                        }`}
                    >
                        {filteredFilters.slice(0, isShowingMore ? Infinity : maxShowing).map((filter, i) => (
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
                                            newFilter = localselectedFilters.filter((f) => f != filter);
                                        }
                                        setLocalSelectedFilters(newFilter);
                                    }}
                                    type="checkbox"
                                >
                                    <Text>{getMappedName(filter.name)}</Text>
                                </Checkbox>
                                <Tag className={styles.tag}>{numberFormat(filter.data.count)}</Tag>
                            </StackLayout>
                        ))}
                    </div>
                    {filteredFilters.length > maxShowing && (
                        <Button
                            className={styles.filtersTypesFooter}
                            onClick={() => setShowingMore(!isShowingMore)}
                            onKeyPress={() => setShowingMore(!isShowingMore)}
                            tabIndex={0}
                            type="text"
                        >
                            {isShowingMore
                                ? get(dictionary, 'actions.less', 'Less')
                                : filteredFilters.length - 5 && (
                                      <>
                                          <>{`${filteredFilters.length - 5} `}</>
                                          <>{get(dictionary, 'actions.more', 'More')}</>
                                      </>
                                  )}
                        </Button>
                    )}
                </StackLayout>
            )}
            {filteredFilters.length === 0 && (
                <StackLayout className="fui-no-filters" vertical>
                    <span className={styles.noResultsText}>
                        {get(dictionary, 'messages.errorNoData', 'No values found for this request')}
                    </span>
                </StackLayout>
            )}

            <StackLayout className={styles.fuiCbfActions} horizontal>
                <Button
                    disabled={selectedFilters.length == 0 && localselectedFilters.length == 0}
                    className={styles.fuiCbfActionsClear}
                    size="small"
                    onClick={() => setLocalSelectedFilters([])}
                    type="text"
                >
                    {get(dictionary, 'actions.none', 'Clear')}
                </Button>
                <Button
                    className={styles.fuiCbfActionsApply}
                    disabled={!hasChanged()}
                    type="primary"
                    size="small"
                    onClick={() => onChange(filterGroup, localselectedFilters)}
                >
                    {get(dictionary, 'actions.apply', 'Apply')}
                </Button>
            </StackLayout>
        </Fragment>
    );
};

export default CheckboxFilter;
