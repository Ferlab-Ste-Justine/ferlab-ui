import React, {useEffect, useState} from 'react';
import {Button, Divider, InputNumber, Select} from 'antd';
import StackLayout from "../../layout/StackLayout";

import {IFilter, IFilterGroup, IFilterRange, onChangeType} from "./types";

import styles from '@ferlab/style/components/filters/RangeFilter.module.scss';

const { Option } = Select;

export type RangeFilterProps = {
    filters: IFilter<IFilterRange>[];
    filterGroup: IFilterGroup;
    onChange: onChangeType;
    selectedFilters?: IFilter[];
    textMin?: string;
    textMax?: string;
    textClear?: string;
    textApply?: string;
}

const RangeFilter: React.FC<RangeFilterProps> = ({
                                                      filterGroup,
                                                      filters,
                                                      onChange,
                                                      selectedFilters,
                                                      textMin= 'min',
                                                      textMax= 'max',
                                                      textClear= 'clear',
                                                      textApply= 'apply',
}) => {
    const defaultStateValue = {
        max: selectedFilters && selectedFilters[0].data.max ,
        min: selectedFilters && selectedFilters[0].data.min,
        rangeType: selectedFilters && selectedFilters[0] ?
            selectedFilters[0].data.rangeType : filterGroup.config!.rangeTypes[0].key,
    };

    const currentFilter: IFilter<IFilterRange> = filters[0];
    const maxPossibleValue = filterGroup.config?.max || 0;
    const minPossibleValue = filterGroup.config?.min || 0;

    const [rangeFilter, setRangeFilter] = useState<IFilterRange>(defaultStateValue);

    useEffect(() => {
        setRangeFilter(defaultStateValue);
    }, [selectedFilters]);

    const onRangeTypeChanged = (value: string) => {
        setRangeFilter((prevState) => ({
            ...prevState,
            rangeType: value,
        }));
    };

    const onMinChanged = (value: string | number | null | undefined) => {
        if (!value) return;
        const min = typeof value === 'string' ? parseInt(value, 10) : value;

        if (!(min < minPossibleValue)) {
            setRangeFilter((prevState) => ({ ...prevState, min }));
        }
    };

    const onMaxChanged = (value: string | number | null | undefined) => {
        if (!value) return;
        const max = typeof value === 'string' ? parseInt(value, 10) : value;

        if (!(max < maxPossibleValue)) {
            setRangeFilter((prevState) => ({ ...prevState, max }));
        }
    };

    const { max, min, rangeType } = rangeFilter;
    const { config: range } = filterGroup;

    if (!range) {
        return null;
    }
    const dotField = filterGroup.field;
    const buttonActionDisabled = typeof min !== 'number' && typeof max !== 'number';
    return (
        <StackLayout className={styles.fuiRfContainer} vertical>
            <StackLayout className={styles.fuiRfGrouped} horizontal>
                {range.rangeTypes.length > 0 && (
                    <div className= {styles.fuiRfRangeTarget}>
                        <Select className={styles.fuiRfRangeTargetSelect} onChange={onRangeTypeChanged} value={rangeType}>
                            {range.rangeTypes.map((u) => (
                                <Option key={u.key} value={u.key}>
                                    {u.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                )}
                <StackLayout className={styles.fuiRfGroupedInputs}>
                    <InputNumber
                        className={styles.rangeInput}
                        id={`from-${dotField}`}
                        key={`from-${dotField}`}
                        max={range.max}
                        min={range.min}
                        onChange={onMinChanged}
                        placeholder={textMin}
                        title={textMin}
                        type="number"
                        value={min}
                    />
                    <Divider className={styles.fuiRfGroupedInputsSpacer} type="vertical" />
                    <InputNumber
                        className={styles.rangeInput}
                        id={`to-${dotField}`}
                        key={`to-${dotField}`}
                        max={range.max}
                        min={range.min}
                        onChange={onMaxChanged}
                        placeholder={textMax}
                        title={textMax}
                        type="number"
                        value={max}
                    />
                </StackLayout>
            </StackLayout>

            <StackLayout className={styles.fuiRfActions} horizontal>
                <Button disabled={buttonActionDisabled} onClick={() => onChange(filterGroup, [])} type="text">
                    {textClear}
                </Button>
                <Button
                    className={styles.fuiRfActionsApply}
                    disabled={buttonActionDisabled}
                    onClick={() => {
                        onChange(filterGroup, [{ ...currentFilter, data: rangeFilter }]);
                    }}
                >
                    {textApply}
                </Button>
            </StackLayout>
        </StackLayout>
    );
};

export default RangeFilter;
