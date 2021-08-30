import React, { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { get, isEmpty } from 'lodash';

import StackLayout from '../../layout/StackLayout';

import { IDictionary, IFilter, IFilterGroup, IFilterText, IFilterTextInputConfig, onChangeType } from './types';

import styles from '@ferlab/style/components/filters/TextInputFilter.module.scss';

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
    const [textInputFilter, setTextInputFilter] = useState<IFilterText>(defaultStateValue);
    const { text } = textInputFilter;
    const buttonActionDisabled = isEmpty(text);

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
                <span className={styles.fuiTIfSectionTitle}>{config?.label}</span>
                <Input placeholder={config?.placeholder} onChange={onTextInputChanged}></Input>
            </StackLayout>
            <StackLayout className={styles.fuiTIfActions} horizontal>
                <Button disabled={buttonActionDisabled} onClick={() => onChange(filterGroup, [])} type="text">
                    {get(dictionary, 'actions.none', 'clear')}
                </Button>
                <Button
                    className={styles.fuiTIfActionsApply}
                    disabled={buttonActionDisabled}
                    onClick={() => {
                        onChange(filterGroup, [{ ...currentFilter, data: textInputFilter }]);
                    }}
                >
                    {get(dictionary, 'actions.apply', 'apply')}
                </Button>
            </StackLayout>
        </StackLayout>
    );
};

export default TextInputFilter;
