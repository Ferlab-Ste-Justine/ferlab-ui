import React, {useEffect, useState} from 'react';
import {Button, Radio} from 'antd';
import cx from 'classnames';

import StackLayout from "../../layout/StackLayout";

import {IFilter, IFilterCount} from "./Filters";

import {IFilterGroup, onChangeType} from "./Filters";

import '@ferlab/style/components/filters/BooleanFilter.scss'

export type BooleanFilterProps = {
    filters: IFilter<IFilterCount>[];
    filterGroup: IFilterGroup;
    onChange: onChangeType;
    selectedFilters?: IFilter[];
    textClear?: string
}

const BooleanFilter: React.FC<BooleanFilterProps> = ({

                                                         filterGroup,
                                                         filters,
                                                         onChange,
                                                         selectedFilters = [],
                                                         textClear = 'clear'
                                                     }) => {
    const selectedFilter = selectedFilters.length > 0 ? selectedFilters[0].data.key : '';
    const [selected, setSelected] = useState(selectedFilter);

    useEffect(() => {
        setSelected(selectedFilter);
    }, [selectedFilters]);
    const options = filters.map((filter) => ({
        label: filter.name,
        value: filter.data.key,
    }));
    const classNames = cx('fui-filter-sc-button',
        {'fui-filter-sc-button-disabled': selectedFilter && selectedFilter.length > 0}
    );

    return (
        <StackLayout className="fui-filter-sc" horizontal>
            <Radio.Group
                onChange={(e) => {
                    const newSelection = filters.filter((f) => f.data.key === e.target.value);
                    onChange(filterGroup, newSelection);
                }}
                optionType="button"
                options={options}
                value={selected}
            />
            <Button
                className={classNames}
                onClick={() => onChange(filterGroup, [])}
                onKeyPress={() => onChange(filterGroup, [])}
                tabIndex={0}
                type="text"
            >
                {textClear}
            </Button>
        </StackLayout>
    );
};

export default BooleanFilter;
