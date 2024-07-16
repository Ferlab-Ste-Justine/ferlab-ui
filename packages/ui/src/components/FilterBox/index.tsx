import { useEffect, useState } from 'react';
import React from 'react';
import { CaretDownFilled, CaretUpFilled } from '@ant-design/icons';
import { Button, Input, Select, Space, Tag, Typography } from 'antd';
import { debounce } from 'lodash';

import { ISearchParams } from '../../pages/CommunityPage';
import ProLabel from '../ProLabel';

import Sorter, { DEFAULT_SORTER_DICTIONARY, TSorterDictionary } from './Sorter';

import styles from './index.module.css';

export const DEFAULT_FILTER_BOX_DICTIONARY = {
    barPlaceholder: 'Placeholder',
    clearFilters: 'Clear filters',
    dataUse: 'Data Use',
    filter: 'Filters',
    interest: 'Area of interest',
    role: 'Role',
    select: {
        other: 'Other',
        placeholder: 'Select',
    },
    sorter: DEFAULT_SORTER_DICTIONARY,
};

export type TFilterBoxDictionary = {
    barPlaceholder: string;
    filter: string;
    role: string;
    select: {
        placeholder: string;
        other: string;
    };
    dataUse?: string;
    interest?: string;
    clearFilters: string;
    sorter: TSorterDictionary;
};

export type TFilterBoxListOptions = {
    label: string;
    value: string;
};

export type TFilterBoxOptions = {
    roles: TFilterBoxListOptions[];
    usages?: TFilterBoxListOptions[];
    interests?: TFilterBoxListOptions[];
};

interface IFiltersBox {
    handleActiveFilter: (searchParams: ISearchParams) => void;
    options: TFilterBoxOptions;
    dictionary: TFilterBoxDictionary;
    hasFilters: boolean;
}

const FiltersBox = ({
    dictionary = DEFAULT_FILTER_BOX_DICTIONARY,
    handleActiveFilter,
    hasFilters = false,
    options,
}: IFiltersBox): JSX.Element => {
    const [filtersVisible, setFiltersVisible] = useState(false);
    const [roleFilter, setRoleFilter] = useState<string[]>([]);
    const [usageFilter, setUsageFilter] = useState<string[]>([]);
    const [interestFilter, setInterestFilter] = useState<string[]>([]);

    const onMatchFilterChange = debounce((match) => handleActiveFilter({ match }), 300);

    useEffect(() => {
        handleActiveFilter({
            dataUses: usageFilter.join(','),
            interests: interestFilter.join(','),
            roles: roleFilter.join(','),
        });
    }, [roleFilter, usageFilter, interestFilter]);

    return (
        <Space className={styles.filtersContainer} direction="vertical" size={16}>
            <Space className={styles.searchBarContainer} direction="vertical">
                <ProLabel title={dictionary.barPlaceholder} />
                <div className={styles.filterContentWrapper}>
                    <Input
                        onChange={(e) => onMatchFilterChange(e.currentTarget.value)}
                        placeholder="e.g. Watson, Linda Crnic Institute"
                    />
                    <Button onClick={() => setFiltersVisible(!filtersVisible)}>
                        {dictionary.filter} {filtersVisible ? <CaretUpFilled /> : <CaretDownFilled />}
                    </Button>
                    <Sorter
                        dictionary={dictionary.sorter}
                        onSortChange={(value: string) => handleActiveFilter({ sort: value })}
                    />
                </div>
            </Space>
            {filtersVisible && (
                <Space align="end" className={styles.filterContentWrapper} size={16}>
                    <Space direction="vertical">
                        <ProLabel title={dictionary.role} />
                        <Select
                            allowClear
                            className={styles.filterMultiSelect}
                            maxTagCount={1}
                            mode="multiple"
                            onClear={() => setRoleFilter([])}
                            onDeselect={(value: string) => setRoleFilter((prev) => prev.filter((val) => val !== value))}
                            onSelect={(value: string) => setRoleFilter([...roleFilter, value])}
                            options={[
                                ...options.roles.map((option) => ({
                                    label: option.label,
                                    value: option.value,
                                })),
                                {
                                    label: dictionary.select.other,
                                    value: 'other',
                                },
                            ]}
                            placeholder={dictionary.select.placeholder}
                            tagRender={({ label, onClose }) => (
                                <Tag className={styles.filterTag} closable onClose={onClose} style={{ marginRight: 3 }}>
                                    <Typography.Text className={styles.filterTagText}>{label}</Typography.Text>
                                </Tag>
                            )}
                            value={roleFilter}
                        />
                    </Space>
                    {options.usages && (
                        <Space direction="vertical">
                            <ProLabel title={dictionary.dataUse ?? DEFAULT_FILTER_BOX_DICTIONARY.dataUse} />
                            <Select
                                allowClear
                                className={styles.filterMultiSelect}
                                maxTagCount={1}
                                mode="multiple"
                                onClear={() => setUsageFilter([])}
                                onDeselect={(value: string) =>
                                    setUsageFilter((prev) => prev.filter((val) => val !== value))
                                }
                                onSelect={(value: string) => setUsageFilter([...usageFilter, value])}
                                options={[
                                    ...options.usages.map((option) => ({
                                        label: option.label,
                                        value: option.value,
                                    })),
                                    {
                                        label: dictionary.select.other,
                                        value: 'other',
                                    },
                                ]}
                                placeholder={dictionary.select.placeholder}
                                tagRender={({ label, onClose }) => (
                                    <Tag
                                        className={styles.filterTag}
                                        closable
                                        onClose={onClose}
                                        style={{ marginRight: 3 }}
                                    >
                                        <Typography.Text className={styles.filterTagText}>{label}</Typography.Text>
                                    </Tag>
                                )}
                                value={usageFilter}
                            />
                        </Space>
                    )}

                    {options.interests && (
                        <Space direction="vertical">
                            <ProLabel title={dictionary.interest ?? DEFAULT_FILTER_BOX_DICTIONARY.interest} />
                            <Select
                                allowClear
                                className={styles.filterMultiSelect}
                                maxTagCount="responsive"
                                mode="multiple"
                                onClear={() => setInterestFilter([])}
                                onDeselect={(value: string) =>
                                    setInterestFilter((previousInterestsFilter) =>
                                        previousInterestsFilter.filter((val) => val !== value),
                                    )
                                }
                                onSelect={(value: string) => setInterestFilter([...interestFilter, value])}
                                options={[
                                    ...options.interests.map((option) => ({
                                        label: option.label,
                                        value: option.value,
                                    })),
                                ]}
                                placeholder={dictionary.select.placeholder}
                                tagRender={({ label, onClose }) => (
                                    <Tag
                                        className={styles.filterTag}
                                        closable
                                        onClose={onClose}
                                        style={{ marginRight: 3 }}
                                    >
                                        <Typography.Text className={styles.filterTagText}>{label}</Typography.Text>
                                    </Tag>
                                )}
                                value={interestFilter}
                            />
                        </Space>
                    )}
                    <Button
                        disabled={!hasFilters}
                        onClick={() => {
                            setRoleFilter([]);
                            setUsageFilter([]);
                            setInterestFilter([]);
                        }}
                    >
                        {dictionary.clearFilters}
                    </Button>
                </Space>
            )}
        </Space>
    );
};

export default FiltersBox;
