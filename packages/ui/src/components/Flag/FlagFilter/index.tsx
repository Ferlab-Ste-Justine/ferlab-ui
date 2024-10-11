import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Checkbox, Space } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';

import StackLayout from '../../../layout/StackLayout';
import { FlagOption, getOptionIcon } from '../FlagDropdown';
import { IFlagDictionary } from '../types';

import styles from './index.module.css';

export type TFlagFilter = {
    dictionary?: IFlagDictionary | Record<string, never>;
    confirm?: (param?: FilterConfirmProps) => void;
    selectedKeys: React.Key[];
    setSelectedKeys: (selectedKeys: React.Key[]) => void;
    selectedFilter?: string[];
    isClear: boolean;
};

const FlagFilter = ({
    confirm,
    dictionary,
    isClear,
    selectedFilter,
    selectedKeys,
    setSelectedKeys,
}: TFlagFilter): ReactElement => {
    const [selectedOption, setSelectedOption] = useState<React.Key[]>(selectedFilter ? selectedFilter : []);
    useEffect(() => {
        setSelectedOption(selectedFilter ? selectedFilter : []);
    }, [selectedFilter]);

    useEffect(() => {
        if (selectedKeys && setSelectedKeys) {
            setSelectedKeys(selectedOption);
        }
    }, [selectedOption]);
    useEffect(() => {
        if (isClear) {
            setSelectedKeys && setSelectedKeys([]);
            confirm && confirm();
        }
    }, [isClear]);

    const handleSelect = (value: string) => {
        if (selectedOption?.includes(value)) {
            setSelectedOption(selectedOption.filter((item: React.Key) => item !== value));
        } else {
            setSelectedOption([value, ...selectedOption]);
        }
    };
    return (
        <>
            <div className={styles.flagContainer}>
                <StackLayout vertical>
                    <Space direction="vertical" size={8}>
                        <Checkbox
                            checked={selectedOption.includes(FlagOption.FLAG) ? true : false}
                            key={FlagOption.FLAG}
                            onChange={(e) => {
                                handleSelect(e.target.value);
                            }}
                            type="checkbox"
                            value={FlagOption.FLAG}
                        >
                            <Space className={styles.optionFlag} size={8}>
                                {getOptionIcon(FlagOption.FLAG)}
                                {dictionary?.options?.flag || 'Flag'}
                            </Space>
                        </Checkbox>
                        <Checkbox
                            checked={selectedOption.includes(FlagOption.PIN) ? true : false}
                            key={FlagOption.PIN}
                            onChange={(e) => {
                                handleSelect(e.target.value);
                            }}
                            type="checkbox"
                            value={FlagOption.PIN}
                        >
                            <Space className={styles.optionFlag} size={8}>
                                {getOptionIcon(FlagOption.PIN)}
                                {dictionary?.options?.pin || 'Pin'}
                            </Space>
                        </Checkbox>
                        <Checkbox
                            checked={selectedOption.includes(FlagOption.STAR) ? true : false}
                            key={FlagOption.STAR}
                            onChange={(e) => {
                                handleSelect(e.target.value);
                            }}
                            type="checkbox"
                            value={FlagOption.STAR}
                        >
                            <Space className={styles.optionFlag} size={8}>
                                {getOptionIcon(FlagOption.STAR)}
                                {dictionary?.options?.star || 'Star'}
                            </Space>
                        </Checkbox>
                        <Checkbox
                            checked={selectedOption.includes(FlagOption.NONE) ? true : false}
                            key={FlagOption.NONE}
                            onChange={(e) => {
                                handleSelect(e.target.value);
                            }}
                            type="checkbox"
                            value={FlagOption.NONE}
                        >
                            <Space className={styles.optionFlag} size={8}>
                                {getOptionIcon(FlagOption.NONE)}
                                {dictionary?.options?.none || 'None'}
                            </Space>
                        </Checkbox>
                    </Space>
                </StackLayout>
            </div>

            <StackLayout className={styles.filterFooter} horizontal>
                <Button
                    className={styles.resetButton}
                    disabled={selectedOption?.length === 0 ? true : false}
                    onClick={() => {
                        setSelectedOption([]);
                    }}
                    size="small"
                    type="link"
                >
                    {dictionary?.filter?.actions?.reset || 'Reset'}
                </Button>
                <Button
                    onClick={() => {
                        confirm && confirm();
                    }}
                    size="small"
                    type="primary"
                >
                    {dictionary?.filter?.actions?.filter || 'Filter'}
                </Button>
            </StackLayout>
        </>
    );
};

export default FlagFilter;
