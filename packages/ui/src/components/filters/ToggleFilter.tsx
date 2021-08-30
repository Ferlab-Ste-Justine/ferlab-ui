import React, { useEffect, useState } from 'react';
import { Button, Radio, Tag } from 'antd';
import cx from 'classnames';
import get from 'lodash/get';

import StackLayout from '../../layout/StackLayout';

import { IDictionary, IFilter, IFilterCount } from './types';
import { IFilterGroup, onChangeType } from './types';

import styles from '@ferlab/style/components/filters/ToggleFilter.module.scss';

export type BooleanFilterProps = {
    filters: IFilter<IFilterCount>[];
    filterGroup: IFilterGroup;
    onChange: onChangeType;
    selectedFilters?: IFilter[];
    dictionary?: IDictionary | Record<string, never>;
};

const ToggleFilter = ({
    filterGroup,
    filters,
    onChange,
    selectedFilters = [],
    dictionary,
}: BooleanFilterProps) => {
    const selectedFilter = selectedFilters.length > 0 ? selectedFilters[0].data.key : '';
    const [selected, setSelected] = useState(selectedFilter);

    useEffect(() => {
        setSelected(selectedFilter);
    }, [selectedFilters]);
    const options = filters.map((filter) => {
        const count = filter.data.count || 0;
        return {
            label: (
                <>
                    {filter.name}
                    <Tag className={styles.tag}>{count.toLocaleString()}</Tag>
                </>
            ),
            value: filter.data.key,
        };
    });
    const classNames = cx(styles['fui-filter-sc-button'], {
        [styles['fui-filter-sc-button-disabled']]: selectedFilter.length === 0,
    });

    return (
        <StackLayout className={styles['fui-filter-sc']} vertical>
            <Radio.Group
                className={styles.radio}
                onChange={(e) => {
                    const newSelection = filters.filter((f) => f.data.key === e.target.value);
                    onChange(filterGroup, newSelection);
                }}
                options={options}
                size="small"
                value={selected}
            />
            <Button
                className={classNames}
                onClick={() => onChange(filterGroup, [])}
                onKeyPress={() => onChange(filterGroup, [])}
                tabIndex={0}
                type="text"
            >
                {get(dictionary, 'actions.clear', 'clear')}
            </Button>
        </StackLayout>
    );
};

export default ToggleFilter;
