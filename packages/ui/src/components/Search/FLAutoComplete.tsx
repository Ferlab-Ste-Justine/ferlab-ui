import React, { useCallback, useState } from 'react';
import { AutoComplete, Select } from 'antd';
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
    getResults: (term: string) => Promise<FLAutoCompleteOption[]>;
    onSelect: (option: FLAutoCompleteOption) => void;
    placeholder?: string;
    showIds?: boolean;
}

const FLAutoComplete: React.FC<FLAutoCompleteProps> = ({
    debounceInterval,
    getResults,
    onSelect,
    placeholder,
    showIds,
}) => {
    const [hits, setHits] = useState<FLAutoCompleteOption[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const search = useCallback(
        debounce(async (term = '') => {
            try {
                const resultHits = await getResults(term.toLowerCase().trim());
                setHits(resultHits);
            } catch (e: any) {
                setHits([]);
                throw new Error(`cannot search for highlights: ${e.message}`);
            }
        }, debounceInterval || DEFAULT_DEBOUNCE_INTERVAL),
        [],
    );

    return (
        <AutoComplete
            allowClear={true}
            className={styles['fl-auto-complete']}
            onClear={() => {
                setHits([]);
            }}
            onSearch={(term) => {
                search(term);
                setSearchTerm(term);
            }}
            onSelect={(optionId) => {
                onSelect(hits.find(({ id }) => id === optionId)!);
                setSearchTerm(''); // Set term to empty string to avoid displaying the id (because the select use the value of the option)
                setHits([]);
            }}
            placeholder={placeholder || 'Search'}
            value={searchTerm}
        >
            {hits.map(({ highlight = '', id }) => (
                <Select.Option key={id} value={id}>
                    <span
                        className={styles['fl-auto-complete_highlight']}
                        dangerouslySetInnerHTML={{ __html: highlight }}
                    />
                    {showIds && <em className={styles['fl-auto-complete_highlight_id']}>{id}</em>}
                </Select.Option>
            ))}
        </AutoComplete>
    );
};

export default FLAutoComplete;
