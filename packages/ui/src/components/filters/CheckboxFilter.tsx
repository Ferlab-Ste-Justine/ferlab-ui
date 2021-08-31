import React, { Fragment, useEffect, useState } from 'react';
import { AutoComplete, Button, Checkbox, Divider, Tag } from 'antd';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import StackLayout from '../../layout/StackLayout';
import { numberFormat } from '../../utils/numberUtils';

import { IDictionary, IFilter, IFilterCount, IFilterGroup, onChangeType } from './types';

import styles from '@ferlab/style/components/filters/CheckboxFilter.module.scss';

export type TermFilterProps = {
    dictionary?: IDictionary | Record<string, never>;
    filterGroup: IFilterGroup;
    onChange: onChangeType;
    selectedFilters?: IFilter[];
    maxShowing: number;
    hasSearchInput: boolean;
    filters: IFilter<IFilterCount>[];
};

const CheckboxFilter = ({
    dictionary,
    filterGroup,
    filters,
    hasSearchInput,
    maxShowing,
    onChange,
    selectedFilters = [],
}: TermFilterProps) => {
    const [isShowingMore, setShowingMore] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredFilters, setFilteredFilters] = useState(filters.filter((f) => !isEmpty(f.data)));

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
                            onClick={() => onChange(filterGroup, filters)}
                            type="text"
                        >
                            {get(dictionary, 'actions.all', 'Select All')}
                        </Button>

                        <Divider className={styles.separator} type="vertical" />
                        <Button
                            className={styles.checkboxFilterLinks}
                            onClick={() => onChange(filterGroup, [])}
                            type="text"
                        >
                            {get(dictionary, 'actions.none', 'None')}
                        </Button>
                    </StackLayout>
                    {filteredFilters.slice(0, isShowingMore ? Infinity : maxShowing).map((filter, i) => (
                        <StackLayout
                            className={styles.checkboxFilterItem}
                            horizontal
                            key={`${filterGroup.field}-${filter.id}-${filter.data.count}-${selectedFilters.length}-${i}`}
                        >
                            <Checkbox
                                checked={selectedFilters.some((f) => f.data.key === filter.data.key)}
                                className={styles.fuiMcItemCheckbox}
                                id={`input-${filter.data.key}`}
                                name={`input-${filter.id}`}
                                onChange={(e) => {
                                    const { checked } = e.target;
                                    let newFilter: IFilter[];
                                    if (checked) {
                                        newFilter = [...selectedFilters, filter];
                                    } else {
                                        newFilter = selectedFilters.filter((f) => f != filter);
                                    }
                                    onChange(filterGroup, newFilter);
                                }}
                                type="checkbox"
                            >
                                {filter.name}
                            </Checkbox>
                            <Tag className={styles.tag}>{numberFormat(filter.data.count)}</Tag>
                        </StackLayout>
                    ))}
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
        </Fragment>
    );
};

export default CheckboxFilter;
