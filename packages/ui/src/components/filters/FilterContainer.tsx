import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import cx from 'classnames';
import StackLayout from '../../layout/StackLayout';
import FilterSelector from './FilterSelector';
import CheckedIcon from './icons/CheckedIcon';
import {
    IDictionary,
    IFilter,
    IFilterGroup,
    onChangeType,
    onIsOpenChange,
    onSearchVisibleChange,
    VisualType,
} from './types';
import Collapse, { CollapsePanel, TCollapseProps } from '../Collapse';

import styles from '@ferlab/style/components/filters/FilterContainer.module.scss';

type FilterContainerProps = {
    filterGroup: IFilterGroup;
    filters: IFilter[];
    selectedFilters?: IFilter[];
    maxShowing?: number;
    isOpen?: boolean;
    dictionary?: IDictionary;
    customContent?: React.ReactNode;
    className?: string;
    onChange: onChangeType;
    onIsOpenChange?: onIsOpenChange;
    onSearchVisibleChange?: onSearchVisibleChange;
    collapseProps?: Omit<TCollapseProps, 'defaultActiveKey' | 'onChange' | 'size'>;
};

type FilterContainerHeaderProps = {
    title: string | React.ReactNode;
    hasFilters?: boolean;
};

const FilterContainerHeader: React.FC<FilterContainerHeaderProps> = ({ title, hasFilters = false }) => (
    <StackLayout className={styles.filtersContainerHeader}>
        <div className={styles.titleContainer}>
            <span className={styles.title}>{title}</span>
            {hasFilters && <CheckedIcon className={styles.hasFilterIcon}></CheckedIcon>}
        </div>
    </StackLayout>
);

const FilterContainer = ({
    filterGroup,
    className = '',
    filters = [],
    maxShowing = 5,
    selectedFilters,
    isOpen = false,
    dictionary,
    customContent,
    onChange,
    onIsOpenChange,
    onSearchVisibleChange,
    collapseProps,
}: FilterContainerProps) => {
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [collapseOpen, setCollapseOpen] = useState(isOpen);

    useEffect(() => {
        if (isOpen !== collapseOpen) {
            setCollapseOpen(isOpen);
        }
    }, [isOpen]);

    const onSearchClick = (visible: boolean) => {
        if (onSearchVisibleChange) onSearchVisibleChange(visible);
        setIsSearchVisible(visible);
    };

    console.log(collapseOpen);

    const hasSearchEnabled = () => filterGroup.type === VisualType.Checkbox && filters.length > maxShowing;

    return (
        <div className={cx(styles.filterContainer, className)}>
            <Collapse
                {...collapseProps}
                defaultActiveKey={collapseOpen ? filterGroup.field : undefined}
                activeKey={collapseOpen ? filterGroup.field : undefined}
                className={cx(styles.filterContainerCollapse, collapseProps?.className)}
                onChange={(panels) => {
                    if (onIsOpenChange) onIsOpenChange(panels.length !== 0);
                    setCollapseOpen(panels.length !== 0);
                }}
                size="small"
            >
                <CollapsePanel
                    className={styles.filterContainerContent}
                    header={<FilterContainerHeader title={filterGroup.title} />}
                    key={filterGroup.field}
                    extra={
                        hasSearchEnabled() && collapseOpen
                            ? [
                                  <SearchOutlined
                                      className={`search-icon ${styles.fuiSearchIcon}`}
                                      key="search-icon"
                                      onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          onSearchClick(!isSearchVisible);
                                      }}
                                  />,
                              ]
                            : []
                    }
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
                </CollapsePanel>
            </Collapse>
        </div>
    );
};

export default FilterContainer;
