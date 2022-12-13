import React, { useEffect, useState } from 'react';
import { InfoCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import cx from 'classnames';

import StackLayout from '../../layout/StackLayout';
import Collapse, { CollapsePanel, TCollapseProps } from '../Collapse';

import CheckedIcon from './icons/CheckedIcon';
import FilterSelector from './FilterSelector';
import {
    IDictionary,
    IFilter,
    IFilterGroup,
    onChangeType,
    onIsOpenChange,
    onSearchVisibleChange,
    VisualType,
} from './types';

import styles from '@ferlab/style/components/filters/FilterContainer.module.scss';

type FilterContainerHeaderProps = {
    title: string | React.ReactNode;
    tooltip?: string;
    hasFilters?: boolean;
};

const FilterContainerHeader: React.FC<FilterContainerHeaderProps> = ({ hasFilters = false, title, tooltip }) => (
    <StackLayout className={styles.filtersContainerHeader}>
        <div className={styles.titleContainer}>
            {tooltip ? (
                <Tooltip title={tooltip}>
                    <span
                        className={styles.title}
                        style={{
                            borderBottom: '1px dotted',
                        }}
                    >
                        {title}
                    </span>
                </Tooltip>
            ) : (
                <span className={styles.title}>{title}</span>
            )}
            {hasFilters && <CheckedIcon className={styles.hasFilterIcon}></CheckedIcon>}
        </div>
    </StackLayout>
);

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
    searchInputVisible?: boolean;
    withNoData?: boolean;
};

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
    searchInputVisible = false,
    withNoData = false,
}: FilterContainerProps) => {
    const [isSearchVisible, setIsSearchVisible] = useState(searchInputVisible);
    const [collapseOpen, setCollapseOpen] = useState(isOpen);

    useEffect(() => {
        if (isOpen !== collapseOpen) {
            setCollapseOpen(isOpen);
        }
    }, [isOpen]);

    useEffect(() => {
        setIsSearchVisible(searchInputVisible);
    }, [searchInputVisible]);

    const onSearchClick = (visible: boolean) => {
        if (onSearchVisibleChange) onSearchVisibleChange(visible);
        setIsSearchVisible(visible);
    };

    const hasSearchEnabled = () => filterGroup.type === VisualType.Checkbox && filters.length > maxShowing;

    return (
        <div className={cx(styles.filterContainer, className)}>
            <Collapse
                {...collapseProps}
                activeKey={collapseOpen ? filterGroup.field : undefined}
                className={cx(styles.filterContainerCollapse, collapseProps?.className)}
                defaultActiveKey={collapseOpen ? filterGroup.field : undefined}
                onChange={(panels) => {
                    if (onIsOpenChange) onIsOpenChange(panels.length !== 0);
                    setCollapseOpen(panels.length !== 0);
                }}
                size="small"
            >
                <CollapsePanel
                    className={styles.filterContainerContent}
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
                    header={<FilterContainerHeader title={filterGroup.title} tooltip={filterGroup.headerTooltip} />}
                    key={filterGroup.field}
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
                            withNoData={withNoData}
                        />
                    )}
                </CollapsePanel>
            </Collapse>
        </div>
    );
};

export default FilterContainer;
