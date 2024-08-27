import React, { useCallback, useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { AutoComplete, Select } from 'antd';
import debounce from 'lodash/debounce';

import styles from './fl-auto-complete.module.css';

const DEFAULT_DEBOUNCE_INTERVAL = 250;

export interface FLAutoCompleteOption {
    id: string;
    highlight: string;
    data?: any;
}

export interface FLAutoCompleteProps {
    debounceInterval?: number;
    defaultValue?: string;
    minTermLength?: number;
    getResults: (term: string) => Promise<FLAutoCompleteOption[]>;
    onClear?: () => void;
    onSelect: (option: FLAutoCompleteOption) => void;
    placeholder?: string;
    showIds?: boolean;
    allowClear?: boolean;
    setSelectedValue?: (selectedOption: FLAutoCompleteOption) => string;
}

const FLAutoComplete: React.FC<FLAutoCompleteProps> = ({
    allowClear,
    debounceInterval,
    defaultValue = '',
    getResults,
    minTermLength = 3,
    onClear = () => null,
    onSelect,
    placeholder,
    setSelectedValue = (option) => option.id,
    showIds,
}) => {
    const [options, setOptions] = useState<FLAutoCompleteOption[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>(defaultValue);
    const [inputElement, setInputElement] = useState<HTMLInputElement>();

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

    // Get input dom element to allow text selection
    const elRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setInputElement(elRef.current?.getElementsByTagName('input')[0] as HTMLInputElement);
    }, [elRef.current]);

    return (
        <div className={styles['fl-auto-complete']} ref={elRef}>
            <AutoComplete
                allowClear={allowClear}
                defaultValue={defaultValue}
                onClear={() => {
                    setOptions([]);
                    onClear();
                }}
                onFocus={() => {
                    inputElement?.select();
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
