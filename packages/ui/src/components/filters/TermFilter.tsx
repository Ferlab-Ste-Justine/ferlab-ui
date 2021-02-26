import React, { Fragment, useEffect, useState } from 'react';
import { AutoComplete, Button, Checkbox, Divider, Tag } from 'antd';

import {IFilter, IFilterCount, IFilterGroup, onChangeType} from "./Filters";
import StackLayout from "../../layout/StackLayout";

import './MultipleChoice.scss';
import '@ferlab/style/components/filters/TermFilter.scss'

export type TermFilterProps = {
    searchPlaceHolder?: string;
    selectAllText?: string;
    clearText?: string;
    moreText?: string;
    lessText?: string;
    noDataText?: string;
    field: string;
    filterGroup: IFilterGroup;
    onChange: onChangeType;
    selectedFilters?: IFilter[];
    maxShowing: number;
    hasSearchInput: boolean;
    filters: IFilter<IFilterCount>[];
}

const TermFilter: React.FC<TermFilterProps> = ({
                                                   searchPlaceHolder= 'search...',
                                                   selectAllText= 'select all',
                                                   clearText= 'none',
                                                   moreText= 'more',
                                                   lessText= 'less',
                                                   noDataText= 'No values found for this request',
                                                   field,
                                                   filterGroup,
                                                   filters,
                                                   hasSearchInput,
                                                   maxShowing,
                                                   onChange,
                                                   selectedFilters = [],
                                               }) => {

    const [isShowingMore, setShowingMore] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredFilters, setFilteredFilters] = useState(filters);

    useEffect(() => {
        const newFilters = filters.filter(({ data }) => data.key.toLowerCase().includes(search.toLowerCase()));

        setFilteredFilters(newFilters);
    }, [filters, search]);
    return (
        <Fragment>
            {hasSearchInput && (
                <div className="fui-search-wrapper">
                    <AutoComplete
                        allowClear
                        aria-label={searchPlaceHolder}
                        autoFocus
                        className="fui-search-input"
                        onChange={(value) => {
                            if (value) {
                                setSearch(value);
                            } else {
                                setSearch('');
                            }
                        }}
                        options={filteredFilters.map((filter) => ({ label: filter.name, value: filter.data.key }))}
                        placeholder={searchPlaceHolder}
                        value={search}
                    />
                </div>
            )}
            {filteredFilters.length > 0 && (
                <StackLayout className="fui-filters" vertical>
                    <StackLayout className="fui-filters-actions">
                        <Button
                            className="fui-filters-links"
                            onClick={() => onChange(filterGroup, filters)}
                            type="text"
                        >
                            {selectAllText}
                        </Button>

                        <Divider className="separator" type="vertical" />
                        <Button className="fui-filters-links" onClick={() => onChange(filterGroup, [])} type="text">
                            {clearText}
                        </Button>
                    </StackLayout>
                    {filteredFilters
                        .sort((a, b) => b.data.count - a.data.count)
                        .slice(0, isShowingMore ? Infinity : maxShowing)
                        .map((filter, i) => (
                            <StackLayout
                                className="fui-mc-item"
                                horizontal
                                key={`${field}-${filter.id}-${filter.data.count}-${selectedFilters.length}-${i}`}
                            >
                                <Checkbox
                                    className="fui-mc-item-checkbox"
                                    defaultChecked={selectedFilters.some((f) => f.data.key === filter.data.key)}
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
                                <Tag>{filter.data.count.toLocaleString()}</Tag>
                            </StackLayout>
                        ))}
                    {filteredFilters.length > maxShowing && (
                        <Button
                            className="fui-filters-types-mc-footer"
                            onClick={() => setShowingMore(!isShowingMore)}
                            onKeyPress={() => setShowingMore(!isShowingMore)}
                            tabIndex={0}
                            type="text"
                        >
                            {isShowingMore
                                ? lessText
                                : filteredFilters.length - 5 &&
                                `${filteredFilters.length - 5} ${moreText}...`}
                        </Button>
                    )}
                </StackLayout>
            )}
            {filteredFilters.length === 0 && (
                <StackLayout className="fui-no-filters" vertical>
                    <span className="no-results-text">
                        {noDataText}
                    </span>
                </StackLayout>
            )}
        </Fragment>
    );
};

export default TermFilter;
