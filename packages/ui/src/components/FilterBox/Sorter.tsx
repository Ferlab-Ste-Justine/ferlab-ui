import { useState } from 'react';
import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

import styles from './Sorter.module.css';

export const SortItems = [
    {
        key: 'newest',
        sort: 'creation_date:desc',
    },
    {
        key: 'oldest',
        sort: 'creation_date:asc',
    },
    {
        key: 'lastnameAlpha',
        sort: 'last_name:asc',
    },
];

export const DEFAULT_SORTER_DICTIONARY = {
    lastnameAlpha: 'Last Name',
    newest: 'Newest',
    oldest: 'Oldest',
};

export type TSorterDictionary = {
    newest: string;
    oldest: string;
    lastnameAlpha: string;
};

interface ISorter {
    onSortChange: (value: string) => void;
    dictionary?: TSorterDictionary;
}

const Sorter = ({ dictionary = DEFAULT_SORTER_DICTIONARY, onSortChange }: ISorter): JSX.Element => {
    const [selectedSortIndex, setSelectedSortIndex] = useState(0);

    return (
        <Dropdown
            menu={{
                items: SortItems.map((item, index) => ({
                    key: index,
                    label: dictionary[item.key as keyof TSorterDictionary],
                    onClick: () => {
                        setSelectedSortIndex(index);
                        onSortChange(item.sort);
                    },
                })),
                selectedKeys: [selectedSortIndex.toString()],
            }}
        >
            <a onClick={(e) => e.preventDefault()}>
                <Space className={styles.sortTrigger}>
                    {dictionary[SortItems[selectedSortIndex].key as keyof TSorterDictionary]}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    );
};

export default Sorter;
