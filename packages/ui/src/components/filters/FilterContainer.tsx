import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';

import StackLayout from '../../layout/StackLayout';

import FilterSelector from './FilterSelector';
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
};

const FilterContainerHeader: React.FC<FilterContainerHeaderProps> = ({
    searchEnabled = false,
    onSearchClick = (f) => f,
    searchInputVisibled,
    title,
    isCollapsed,
}) => (
    <StackLayout className={styles.filtersContainerHeader}>
        <span className={styles.title}>{title}</span>
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

const FilterContainer: React.FC<FilterContainerProps> = ({
    filterGroup,
    filters = [],
    maxShowing = 5,
    onChange,
    selectedFilters,
    isOpen = false,
    dictionary,
}) => {
    const [hasSearchInput, setSearchInputVisible] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(!isOpen);

    const defaultActiveKey = isCollapsed ? {} : { defaultActiveKey: '1' };
    return (
        <div className={styles.filterContainer}>
            <Collapse
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
