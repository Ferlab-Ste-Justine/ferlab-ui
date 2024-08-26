import React, { useCallback, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Input, Select, Typography } from 'antd';
import { debounce } from 'lodash';

import styles from './fl-auto-complete.module.css';

const DEFAULT_DEBOUNCE_INTERVAL = 250;

export interface FLAutoCompleteOption {
    id: string;
    highlight: string;
    data?: any;
}

export interface FLAutoCompleteProps {
    debounceInterval?: number;
    minTermLength?: number;
    getResults: (term: string) => Promise<FLAutoCompleteOption[]>;
    onSelect: (option: FLAutoCompleteOption) => void;
    placeholder?: string;
    showIds?: boolean;
    allowClear?: boolean;
    setSelectedValue?: (selectedOption: FLAutoCompleteOption) => string;
}

const FLAutoComplete: React.FC<FLAutoCompleteProps> = ({
    allowClear,
    debounceInterval,
    getResults,
    minTermLength = 3,
    onSelect,
    placeholder,
    setSelectedValue = (option) => option.id,
    showIds,
}) => {
    const [options, setOptions] = useState<FLAutoCompleteOption[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const search = useCallback(async (term = '') => {
        try {
            const resultHits = await getResults(term.toLowerCase().trim());
            setOptions(resultHits);
        } catch (e: any) {
            setOptions([]);
            throw new Error(`cannot search for highlights: ${e.message}`);
        }
    }, []);

    const debounceSearch = useCallback(debounce(search, debounceInterval || DEFAULT_DEBOUNCE_INTERVAL), []);

    return (
        <div className={styles['fl-auto-complete']}>
            <AutoComplete
                allowClear={allowClear}
                onClear={() => {
                    setOptions([]);
                }}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && searchTerm.length >= minTermLength) search(searchTerm);
                }}
                onSearch={(term) => {
                    if (term.length >= minTermLength) debounceSearch(term);
                    else setOptions([]);
                    setSearchTerm(term);
                }}
                onSelect={(optionId) => {
                    const selectedOption = options.find(({ id }) => id === optionId)!;
                    onSelect(selectedOption);
                    setSearchTerm(setSelectedValue(selectedOption)); // Set term to empty string to avoid displaying the id (because the select use the value of the option)
                    setOptions([]);
                }}
                placeholder={placeholder || 'Search'}
                value={searchTerm}
            >
                {options.map(({ highlight = '', id }) => (
                    <Select.Option className={styles['fl-auto-complete_highlight']} key={id} value={id}>
                        <span dangerouslySetInnerHTML={{ __html: highlight }} />
                        {showIds && <span className="fl-auto-complete_highlight_id">( {id} )</span>}
                    </Select.Option>
                ))}
            </AutoComplete>
            {!searchTerm && <SearchOutlined />}
        </div>
    );
};

export default FLAutoComplete;
