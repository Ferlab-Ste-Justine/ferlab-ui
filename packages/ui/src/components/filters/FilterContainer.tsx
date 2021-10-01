import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

import StackLayout from '../../layout/StackLayout';

import FilterSelector from './FilterSelector';
import CheckedIcon from './icons/CheckedIcon';
import {
    IDictionary,
    IFilter,
    IFilterGroup,
    IFilterRange,
    IFilterText,
    IRange,
    onChangeType,
    VisualType,
} from './types';

import styles from '@ferlab/style/components/filters/FilterContainer.module.scss';
import { isEmpty } from 'lodash';

const { Panel } = Collapse;

type FilterContainerProps = {
    filterGroup: IFilterGroup;
    filters: IFilter[];
    selectedFilters?: IFilter[];
    onChange: onChangeType;
    maxShowing?: number;
    isOpen?: boolean;
    dictionary?: IDictionary;
};

type FilterContainerHeaderProps = {
    searchEnabled?: boolean;
    onSearchClick: (v: boolean) => void;
    searchInputVisibled: boolean;
    title: string | React.ReactNode;
    isCollapsed: boolean;
    hasFilters: boolean;
};

const FilterContainerHeader: React.FC<FilterContainerHeaderProps> = ({
    searchEnabled = false,
    onSearchClick = (f) => f,
    searchInputVisibled,
    title,
    isCollapsed,
    hasFilters,
}) => (
    <StackLayout className={styles.filtersContainerHeader}>
        <div className={styles.titleContainer}>
            <span className={styles.title}>{title}</span>
            {hasFilters && <CheckedIcon className={styles.hasFilterIcon}></CheckedIcon>}
        </div>
        {searchEnabled && !isCollapsed && (
            <div className={styles.searchIconWrapper}>
                <SearchOutlined
                    className={`search-icon ${styles.fuiSearchIcon}`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onSearchClick(!searchInputVisibled);
                    }}
                />
            </div>
        )}
    </StackLayout>
);

const hasFilters = (filterGroup: IFilterGroup, selectedFilters: IFilter[]) => {
    switch (filterGroup.type) {
        case VisualType.Checkbox:
        case VisualType.Toggle:
            return selectedFilters.length > 0;
        case VisualType.Range:
            const rangeFilters = selectedFilters as IFilter<IFilterRange>[];
            return rangeFilters.length ? rangeFilters[0].data.max! > 0 || rangeFilters[0].data.min! > 0 : false;
        case VisualType.Text:
            const textFilters = selectedFilters as IFilter<IFilterText>[];
            return textFilters.length ? !isEmpty(textFilters[0].data.text) : false;
        default:
            return false;
    }
};

const FilterContainer = ({
    filterGroup,
    filters = [],
    maxShowing = 5,
    onChange,
    selectedFilters,
    isOpen = true,
    dictionary,
}: FilterContainerProps) => {
    const [hasSearchInput, setSearchInputVisible] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(!isOpen);
    const defaultActiveKey = isCollapsed ? {} : { defaultActiveKey: '1' };

    return (
        <div className={styles.filterContainer}>
            <Collapse
                className={styles.filterContainerCollapse}
                {...defaultActiveKey}
                onChange={(panels) => {
                    setIsCollapsed(panels.length === 0);
                }}
            >
                <Panel
                    className={styles.filterContainerContent}
                    header={
                        <FilterContainerHeader
                            isCollapsed={isCollapsed}
                            onSearchClick={setSearchInputVisible}
                            searchEnabled={filterGroup.type === VisualType.Checkbox && filters.length > maxShowing}
                            searchInputVisibled={hasSearchInput}
                            title={filterGroup.title}
                            hasFilters={hasFilters(filterGroup, selectedFilters!)}
                        />
                    }
                    key={`1`}
                >
                    <FilterSelector
                        dictionary={dictionary}
                        filterGroup={filterGroup}
                        filters={filters}
                        maxShowing={maxShowing}
                        onChange={onChange}
                        searchInputVisible={hasSearchInput}
                        selectedFilters={selectedFilters}
                    />
                </Panel>
            </Collapse>
        </div>
    );
};

export default FilterContainer;
