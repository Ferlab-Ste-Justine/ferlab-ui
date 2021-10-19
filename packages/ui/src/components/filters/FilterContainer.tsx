import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { isEmpty } from 'lodash';

import StackLayout from '../../layout/StackLayout';

import FilterSelector from './FilterSelector';
import CheckedIcon from './icons/CheckedIcon';
import {
    IDictionary,
    IFilter,
    IFilterGroup,
    IFilterRange,
    IFilterText,
    onChangeType,
    onIsOpenChange,
    onSearchVisibleChange,
    VisualType,
} from './types';

import styles from '@ferlab/style/components/filters/FilterContainer.module.scss';

const { Panel } = Collapse;

type FilterContainerProps = {
    filterGroup: IFilterGroup;
    filters: IFilter[];
    selectedFilters?: IFilter[];
    maxShowing?: number;
    isOpen?: boolean;
    dictionary?: IDictionary;
    customContent?: React.ReactNode;
    onChange: onChangeType;
    onIsOpenChange?: onIsOpenChange;
    onSearchVisibleChange?: onSearchVisibleChange;
};

type FilterContainerHeaderProps = {
    searchEnabled?: boolean;
    onSearchClick: (v: boolean) => void;
    searchInputVisibled: boolean;
    title: string | React.ReactNode;
    isCollapsed: boolean;
    hasFilters?: boolean;
};

const FilterContainerHeader: React.FC<FilterContainerHeaderProps> = ({
    searchEnabled = false,
    onSearchClick = (f) => f,
    searchInputVisibled,
    title,
    isCollapsed,
    hasFilters = false,
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
            return selectedFilters?.length > 0;
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
    selectedFilters,
    isOpen = true,
    dictionary,
    customContent,
    onChange,
    onIsOpenChange,
    onSearchVisibleChange,
}: FilterContainerProps) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(!isOpen);
    const defaultActiveKey = isCollapsed ? {} : { defaultActiveKey: '1' };

    return (
        <div className={styles.filterContainer}>
            <Collapse
                className={styles.filterContainerCollapse}
                {...defaultActiveKey}
                onChange={(panels) => {
                    if (onIsOpenChange) onIsOpenChange(panels.length !== 0);
                    setIsCollapsed(panels.length === 0);
                }}
            >
                <Panel
                    className={styles.filterContainerContent}
                    header={
                        <FilterContainerHeader
                            isCollapsed={isCollapsed}
                            onSearchClick={(visible) => {
                                if (onSearchVisibleChange) onSearchVisibleChange(visible);
                                setIsSearchVisible(visible);
                            }}
                            searchEnabled={filterGroup.type === VisualType.Checkbox && filters.length > maxShowing}
                            searchInputVisibled={isSearchVisible}
                            title={filterGroup.title}
                        />
                    }
                    key={`1`}
                >
                    {customContent ? (
                        customContent
                    ) : (
                        <FilterSelector
                            dictionary={dictionary}
                            filterGroup={filterGroup}
                            filters={filters}
                            maxShowing={maxShowing}
                            onChange={onChange}
                            searchInputVisible={isSearchVisible}
                            selectedFilters={selectedFilters}
                        />
                    )}
                </Panel>
            </Collapse>
        </div>
    );
};

export default FilterContainer;