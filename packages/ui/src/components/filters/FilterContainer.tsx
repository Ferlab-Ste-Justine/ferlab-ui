import React, {useState} from 'react';
import {Collapse} from 'antd';
import {SearchOutlined} from '@ant-design/icons';

import {IFilter, IFilterGroup, onChangeType, VisualType} from './Filters';
import StackLayout from "../../layout/StackLayout";
import FilterSelector from "./FilterSelector";

import '@ferlab/style/components/filters/FilterContainer.scss'

const { Panel } = Collapse;

type FilterContainerProps = {
    filterGroup: IFilterGroup;
    filters: IFilter[];
    selectedFilters?: IFilter[];
    onChange: onChangeType;
    maxShowing?: number;
    isOpen?: boolean;
}

type FilterContainerHeaderProps = {
    searchEnabled?: boolean;
    onSearchClick: (v: boolean) => void;
    searchInputVisibled: boolean;
    title: string | React.ReactNode;
    isCollapsed: boolean;
}

const FilterContainerHeader: React.FC<FilterContainerHeaderProps> = ({
                                                                          searchEnabled = false,
                                                                          onSearchClick = (f) => f,
                                                                          searchInputVisibled,
                                                                          title,
                                                                          isCollapsed,
                                                                      }) => (
    <StackLayout className={'fui-filters-container-header'}>
        <span className={'title'}>{title}</span>
        {searchEnabled && !isCollapsed && (
            <div className={'fui-search-icon-wrapper'}>
                <SearchOutlined
                    className={'search-icon fui-search-icon'}
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
                                                              isOpen = true,
                                                          }) => {
    const [hasSearchInput, setSearchInputVisible] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(!isOpen);

    const defaultActiveKey = isCollapsed ? {} : { defaultActiveKey: '1' };
    return (
        <div className={'filter-container'}>
            <Collapse
                {...defaultActiveKey}
                onChange={(panels) => {
                    setIsCollapsed(panels.length === 0);
                }}
            >
                <Panel
                    className={'filter-container-content'}
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
