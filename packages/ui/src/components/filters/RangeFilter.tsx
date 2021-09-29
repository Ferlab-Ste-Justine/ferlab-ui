import React, { useEffect, useState } from 'react';
import { Button, InputNumber, Select } from 'antd';
import get from 'lodash/get';

import StackLayout from '../../layout/StackLayout';
import { RangeOperators } from '../../data/sqon/operators';
import BetweenOperatorIcon from './icons/BetweenOperatorIcon';
import LessThanOperatorIcon from './icons/LessThanOperatorIcon';
import LessThanOrEqualOperatorIcon from './icons/LessThanOrEqualOperatorIcon';
import GreaterThanOperatorIcon from './icons/GreaterThanOperatorIcon';
import GreaterThanOrEqualOperatorIcon from './icons/GreaterThanOrEqualOperatorIcon';

import {
    IDictionary,
    IFilter,
    IFilterGroup,
    IFilterRange,
    IFilterRangeConfig,
    IOperatorConfig,
    onChangeType,
} from './types';

import styles from '@ferlab/style/components/filters/RangeFilter.module.scss';

const { Option } = Select;

export type RangeFilterProps = {
    filters: IFilter<IFilterRange>[];
    filterGroup: IFilterGroup<IFilterRangeConfig>;
    onChange: onChangeType;
    selectedFilters?: IFilter[];
    dictionary?: IDictionary | Record<string, never>;
};

const DEFAULT_STEP = 1;

const getDefaultOperatorList = (dictionary: IDictionary | undefined): IOperatorConfig[] => {
    return [
        {
            operator: RangeOperators['<'],
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <LessThanOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.lessThan', 'Less than')}
                    </span>
                </span>
            ),
            disableMin: true,
        },
        {
            operator: RangeOperators['<='],
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <LessThanOrEqualOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.lessThanOfEqual', 'Less than or equal')}
                    </span>
                </span>
            ),
            disableMin: true,
        },
        {
            operator: RangeOperators['>'],
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <GreaterThanOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.greaterThan', 'Greater than')}
                    </span>
                </span>
            ),
            disableMax: true,
        },
        {
            operator: RangeOperators['>='],
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <GreaterThanOrEqualOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.greaterThanOrEqual', 'Greater than or equal')}
                    </span>
                </span>
            ),
            disableMax: true,
        },
        {
            operator: RangeOperators.between,
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <BetweenOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.between', 'Between (inclusive)')}
                    </span>
                </span>
            ),
        },
    ];
};

const RangeFilter = ({ dictionary, filterGroup, filters, onChange, selectedFilters }: RangeFilterProps) => {
    const { config: range } = filterGroup;
    const currentFilter: IFilter<IFilterRange> = filters[0];
    const maxPossibleValue = filterGroup.config?.max || 0;
    const minPossibleValue = filterGroup.config?.min || 0;
    const rangeTypes = filterGroup.config?.rangeTypes;
    const defaultOperators = getDefaultOperatorList(dictionary);
    const operatorsList = range?.operators?.length ? range?.operators : defaultOperators;
    const selectedMax = get(selectedFilters, '[0].data.max', undefined);
    const selectedMin = get(selectedFilters, '[0].data.min', undefined);
    const selectedOperator = get(selectedFilters, '[0].data.operator', operatorsList[0].operator);
    const selectedRangeType = get(
        selectedFilters,
        '[0].data.rangeType',
        rangeTypes?.length ? rangeTypes[0].key : undefined,
    );
    const defaultStateValue = {
        max: selectedMax,
        min: selectedMin,
        operator: selectedOperator,
        rangeType: selectedRangeType,
    };
    const [rangeFilter, setRangeFilter] = useState<IFilterRange>(defaultStateValue);
    const { max, min, operator, rangeType } = rangeFilter;
    const currentOperator = operatorsList.find((value) => value.operator == operator);
    const isMaxDisabled = currentOperator?.disableMax;
    const isMinDisabled = currentOperator?.disableMin;

    useEffect(() => {
        setRangeFilter(defaultStateValue);
    }, [selectedFilters]);

    const hasChanged = () =>
        validateSelectedValues() &&
        (selectedMax != rangeFilter.max ||
            selectedMin != rangeFilter.min ||
            selectedOperator != rangeFilter.operator ||
            selectedRangeType != rangeFilter.rangeType);

    const validateSelectedValues = () => {
        if (!currentOperator?.disableMax && !currentOperator?.disableMin) {
            return rangeFilter.max != undefined && rangeFilter.min != undefined;
        }
        return rangeFilter.max != undefined || rangeFilter.min != undefined;
    };

    const onRangeTypeChanged = (value: string) => {
        setRangeFilter((prevState) => ({
            ...prevState,
            rangeType: value,
        }));
    };

    const onOperatorChanged = (value: string) => {
        setRangeFilter((prevState) => ({
            ...prevState,
            operator: value,
        }));
    };

    const onMinChanged = (value: string | number | null | undefined) => {
        if (!value) return;
        let min = typeof value === 'string' ? parseFloat(value) : value;
        min = min > max! ? max! : min;

        if (!(min < minPossibleValue)) {
            setRangeFilter((prevState) => ({ ...prevState, min }));
        }
    };

    const onMaxChanged = (value: string | number | null | undefined) => {
        if (!value) return;
        let max = typeof value === 'string' ? parseFloat(value) : value;
        max = max < min! ? min! : max;

        if (max <= maxPossibleValue) {
            setRangeFilter((prevState) => ({ ...prevState, max }));
        }
    };

    if (!range) {
        return null;
    }

    const dotField = filterGroup.field;
    const buttonActionDisabled = typeof min !== 'number' && typeof max !== 'number';

    return (
        <StackLayout className={styles.fuiRfContainer} vertical>
            <StackLayout vertical className={styles.fuiRfRangeOperator}>
                <span className={styles.fuiRfSectionTitle}>{get(dictionary, 'range.is', 'Is')}</span>
                <Select className={styles.fuiRfRangeOperatorSelect} onChange={onOperatorChanged} value={operator}>
                    {(range.operators || getDefaultOperatorList(dictionary!)).map((opConfig) => (
                        <Option key={opConfig.operator} value={opConfig.operator}>
                            {opConfig.name}
                        </Option>
                    ))}
                </Select>
            </StackLayout>

            <StackLayout className={styles.fuiRfGroupedValues} horizontal>
                <StackLayout vertical className={styles.fuiRfRangeInputContainer}>
                    <span className={styles.fuiRfSectionTitle}>Min.</span>
                    <InputNumber
                        disabled={isMinDisabled}
                        step={range.step || DEFAULT_STEP}
                        className={styles.rangeInput}
                        id={`from-${dotField}`}
                        key={`from-${dotField}`}
                        max={range.max}
                        min={range.min}
                        onChange={onMinChanged}
                        placeholder={range.min?.toString()}
                        title={get(dictionary, 'range.min', 'min')}
                        type="number"
                        value={isMinDisabled ? range.min : min}
                    />
                </StackLayout>
                <StackLayout vertical className={styles.fuiRfRangeInputContainer}>
                    <span className={styles.fuiRfSectionTitle}>Max.</span>
                    <InputNumber
                        disabled={isMaxDisabled}
                        step={range.step || DEFAULT_STEP}
                        className={styles.rangeInput}
                        id={`to-${dotField}`}
                        key={`to-${dotField}`}
                        max={range.max}
                        min={range.min}
                        onChange={onMaxChanged}
                        placeholder={range.max?.toString()}
                        title={get(dictionary, 'range.max', 'max')}
                        type="number"
                        value={isMaxDisabled ? range.max : max}
                    />
                </StackLayout>
            </StackLayout>

            {range?.rangeTypes?.length! > 0 && (
                <StackLayout vertical className={styles.fuiRfRangeTarget}>
                    <span className={styles.fuiRfSectionTitle}>{get(dictionary, 'range.unit', 'Unit')}</span>
                    <Select className={styles.fuiRfRangeTargetSelect} onChange={onRangeTypeChanged} value={rangeType}>
                        {range?.rangeTypes!.map((u) => (
                            <Option key={u.key} value={u.key}>
                                {u.name}
                            </Option>
                        ))}
                    </Select>
                </StackLayout>
            )}

            <StackLayout className={styles.fuiRfActions} horizontal>
                <Button
                    className={styles.fuiRfActionsClear}
                    size="small"
                    disabled={buttonActionDisabled}
                    onClick={() => {
                        setRangeFilter((prevState) => ({
                            ...prevState,
                            operator: operatorsList[0].operator,
                            min: undefined,
                            max: undefined,
                        }));
                    }}
                    type="text"
                >
                    {get(dictionary, 'actions.none', 'Clear')}
                </Button>
                <Button
                    size="small"
                    className={styles.fuiRfActionsApply}
                    disabled={!hasChanged()}
                    onClick={() => {
                        onChange(filterGroup, [{ ...currentFilter, data: rangeFilter }]);
                    }}
                >
                    <span data-key="apply">{get(dictionary, 'actions.apply', 'Apply')}</span>
                </Button>
            </StackLayout>
        </StackLayout>
    );
};

export default RangeFilter;
