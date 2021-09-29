import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

import StackLayout from '../../layout/StackLayout';

import FilterSelector from './FilterSelector';
import CheckedIcon from './icons/CheckedIcon';
import { IDictionary, IFilter, IFilterGroup, onChangeType, VisualType } from './types';

import styles from '@ferlab/style/components/filters/FilterContainer.module.scss';

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
    hasFilters
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

    console.log(selectedFilters);

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
                            hasFilters={selectedFilters?.length! > 0}
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
