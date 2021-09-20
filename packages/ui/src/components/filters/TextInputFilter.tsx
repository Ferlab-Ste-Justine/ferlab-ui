import React, { useState } from 'react';
import { Button, Input, Tooltip } from 'antd';
import { get, isEmpty } from 'lodash';
import { InfoCircleOutlined } from '@ant-design/icons';

import StackLayout from '../../layout/StackLayout';

import { IDictionary, IFilter, IFilterGroup, IFilterText, IFilterTextInputConfig, onChangeType } from './types';

import styles from '@ferlab/style/components/filters/TextInputFilter.module.scss';
import { useEffect } from 'react';

export type TextInputFilterProps = {
    filters: IFilter<IFilterText>[];
    filterGroup: IFilterGroup<IFilterTextInputConfig>;
    onChange: onChangeType;
    selectedFilters?: IFilter[];
    dictionary?: IDictionary | Record<string, never>;
};

const TextInputFilter = ({ dictionary, filterGroup, filters, onChange, selectedFilters }: TextInputFilterProps) => {
    const currentFilter: IFilter<IFilterText> = filters[0];
    const { config } = filterGroup;
    const defaultStateValue = {
        text: get(selectedFilters, '[0].data.text', ''),
    };
    const [inputValid, setInputValid] = useState<boolean>(true);
    const [textInputFilter, setTextInputFilter] = useState<IFilterText>(defaultStateValue);
    const { text } = textInputFilter;
    const buttonActionDisabled = isEmpty(text);

    useEffect(() => {
        validateInputIfNeeded(textInputFilter.text);
    }, [textInputFilter]);

    const validateInputIfNeeded = (text: string) => {
        const isInputValid = !(config?.validateInput && !config.validateInput(text));
        setInputValid(isInputValid);
        return isInputValid;
    };

    const onTextInputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target) {
            setTextInputFilter({
                text: e.target.value,
            });
        }
    };

    return (
        <StackLayout className={styles.fuiTIfContainer} vertical>
            <StackLayout vertical>
                {config?.label && (
                    <StackLayout horizontal className={styles.fuiTIfLabelContainer}>
                        <span className={styles.fuiTIfSectionTitle}>{config.label}</span>
                        {config.tooltip && (
                            <Tooltip title={config.tooltip.text} align={{ offset: [0, 5] }}>
                                <InfoCircleOutlined className={styles.fuiTIfLabelTooltipIcon} />
                            </Tooltip>
                        )}
                    </StackLayout>
                )}
                <Input
                    placeholder={config?.placeholder}
                    className={`${!inputValid && styles.inputError}`}
                    onChange={onTextInputChanged}
                    value={text}
                ></Input>
            </StackLayout>
            <StackLayout className={styles.fuiTIfActions} horizontal>
                <Button
                  className={styles.fuiTIfActionsClear}
                    disabled={buttonActionDisabled}
                    onClick={() => {
                        onChange(filterGroup, []);
                        setTextInputFilter({ text: '' });
                    }}
                    type="text"
                >
                    {get(dictionary, 'actions.none', 'Clear')}
                </Button>
                <Button
                    className={styles.fuiTIfActionsApply}
                    disabled={buttonActionDisabled || !inputValid}
                    onClick={() => {
                        onChange(filterGroup, [{ ...currentFilter, data: textInputFilter }]);
                    }}
                >
                    {get(dictionary, 'actions.apply', 'Apply')}
                </Button>
            </StackLayout>
        </StackLayout>
    );
};

export default TextInputFilter;
