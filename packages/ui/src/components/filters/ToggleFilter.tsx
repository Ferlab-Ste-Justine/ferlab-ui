import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Radio, Space, Tag } from 'antd';
import { isEmpty } from 'lodash';
import get from 'lodash/get';

import StackLayout from '../../layout/StackLayout';
import { numberFormat } from '../../utils/numberUtils';
import { removeUnderscoreAndCapitalize } from '../../utils/stringUtils';

import { IDictionary, IFilter, IFilterCount } from './types';
import { IFilterGroup, onChangeType } from './types';

import styles from './ToggleFilter.module.css';

export type BooleanFilterProps = {
    filters: IFilter<IFilterCount>[];
    filterGroup: IFilterGroup;
    onChange: onChangeType;
    selectedFilters?: IFilter[];
    dictionary?: IDictionary | Record<string, never>;
    isQuickFilter?: boolean;
};

const ToggleFilter = ({
    dictionary,
    filterGroup,
    filters,
    isQuickFilter = false,
    onChange,
    selectedFilters = [],
}: BooleanFilterProps): ReactElement => {
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
                    {typeof filter.name === 'string' ? removeUnderscoreAndCapitalize(filter.name) : filter.name}
                    <Tag className={styles.tag}>{numberFormat(count)}</Tag>
                </>
            ),
            value: filter.data.key,
        };
    });

    const showCategoryIcon = filterGroup.config?.categoryIcon;

    return isEmpty(options) ? (
        <Space className={styles.noResultsText} direction="vertical">
            {get(dictionary, 'messages.errorNoData', 'No values found for this request')}
        </Space>
    ) : (
        <>
            {showCategoryIcon && (
                <StackLayout className={styles.categoryIcon}>
                    <Space>{showCategoryIcon}</Space>
                </StackLayout>
            )}

            <Radio.Group
                className={styles.radioGroup}
                onChange={(e) => {
                    const newSelection = filters.filter((f) => f.data.key === e.target.value);
                    setSelected(e.target.value);
                    onChange(filterGroup, newSelection);
                }}
                options={options}
                size="small"
                value={selected}
            />

            {!isQuickFilter && selectedFilter?.length > 0 && (
                <div className={styles.actions}>
                    <Button
                        className={styles.clearButton}
                        onClick={() => onChange(filterGroup, [])}
                        onKeyPress={() => onChange(filterGroup, [])}
                        tabIndex={0}
                        type="text"
                    >
                        {get(dictionary, 'actions.clear', 'clear')}
                    </Button>
                </div>
            )}
        </>
    );
};

export default ToggleFilter;
