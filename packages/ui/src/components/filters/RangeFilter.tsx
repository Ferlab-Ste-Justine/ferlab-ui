import React, { useEffect, useState } from 'react';
import { Button, Checkbox, InputNumber, Select, Space, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import cx from 'classnames';
import get from 'lodash/get';

import { RangeOperators } from '../../data/sqon/operators';
import StackLayout from '../../layout/StackLayout';

import BetweenOperatorIcon from './icons/BetweenOperatorIcon';
import GreaterThanOperatorIcon from './icons/GreaterThanOperatorIcon';
import GreaterThanOrEqualOperatorIcon from './icons/GreaterThanOrEqualOperatorIcon';
import LessThanOperatorIcon from './icons/LessThanOperatorIcon';
import LessThanOrEqualOperatorIcon from './icons/LessThanOrEqualOperatorIcon';
import { INTERVAL_DECIMAL } from './constants';
import {
    IDictionary,
    IFilter,
    IFilterGroup,
    IFilterRange,
    IFilterRangeConfig,
    IRangeOperatorConfig,
    onChangeType,
} from './types';

import styles from './RangeFilter.module.css';

const { Option } = Select;
const { Text } = Typography;

export type RangeFilterProps = {
    filters: IFilter<IFilterRange>[];
    filterGroup: IFilterGroup<IFilterRangeConfig>;
    onChange: onChangeType<IFilterRange>;
    selectedFilters?: IFilter[];
    dictionary?: IDictionary | Record<string, never>;
    noDataOption?: boolean;
    isQuickFilter?: boolean;
};

const DEFAULT_STEP = 1;

const getDefaultOperatorList = (
    dictionary: IDictionary | undefined,
    defaultOperator: RangeOperators,
): IRangeOperatorConfig[] => {
    const defaultOperatorList = [
        {
            disableMin: true,
            label: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <LessThanOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.lessThan', 'Less than')}
                    </span>
                </span>
            ),
            value: RangeOperators['<'],
        },
        {
            disableMin: true,
            label: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <LessThanOrEqualOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.lessThanOfEqual', 'Less than or equal')}
                    </span>
                </span>
            ),
            value: RangeOperators['<='],
        },
        {
            disableMax: true,
            label: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <GreaterThanOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.greaterThan', 'Greater than')}
                    </span>
                </span>
            ),
            value: RangeOperators['>'],
        },
        {
            disableMax: true,
            label: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <GreaterThanOrEqualOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.greaterThanOrEqual', 'Greater than or equal')}
                    </span>
                </span>
            ),
            value: RangeOperators['>='],
        },
        {
            label: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <BetweenOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.between', 'Between (inclusive)')}
                    </span>
                </span>
            ),
            value: RangeOperators.between,
        },
    ];

    return defaultOperator
        ? defaultOperatorList.sort((a, b) => (a.value == defaultOperator ? -1 : b.value == defaultOperator ? 1 : 0))
        : defaultOperatorList;
};

type config = {
    selectedMax?: number;
    selectedMin?: number;
    selectedOperator?: RangeOperators;
    selectedRangeType?: string;
    noDataSelected?: boolean;
};

const getConfig = (selectedFilters: IFilter[] | undefined): config => {
    if (!selectedFilters || selectedFilters?.length === 0) {
        return {
            noDataSelected: false,
        };
    }

    if (selectedFilters.length > 1) {
        selectedFilters.find((filter) => filter.data);
    }

    const selectedMax = get(selectedFilters, '[0].data.max');
    const selectedMin = get(selectedFilters, '[0].data.min');
    const selectedOperator = get(selectedFilters, '[0].data.operator');
    const selectedRangeType = get(selectedFilters, '[0].data.rangeType');
    const noDataSelected = get(selectedFilters, '[0].data.noDataSelected');

    return {
        noDataSelected,
        selectedMax,
        selectedMin,
        selectedOperator,
        selectedRangeType,
    };
};

const RangeFilter = ({
    dictionary,
    filterGroup,
    filters,
    isQuickFilter = false,
    noDataOption,
    onChange,
    selectedFilters,
}: RangeFilterProps): React.ReactElement | null => {
    const { config: range } = filterGroup;
    const currentFilter: IFilter<IFilterRange> = filters[0];
    const rangeTypes = filterGroup.config?.rangeTypes;
    const noDataInputOption = noDataOption != undefined ? noDataOption : filterGroup.config?.noDataInputOption ?? true;
    const defaultOperators = getDefaultOperatorList(
        dictionary,
        filterGroup.config?.defaultOperator || RangeOperators['<'],
    );
    const operatorsList = range?.operators?.length ? range?.operators : defaultOperators;
    const intervalDecimal =
        filterGroup.config?.intervalDecimal || filterGroup.config?.intervalDecimal === 0
            ? filterGroup.config.intervalDecimal
            : INTERVAL_DECIMAL;

    const {
        noDataSelected = false,
        selectedMax = undefined,
        selectedMin = undefined,
        selectedOperator = operatorsList[0].value,
        selectedRangeType = rangeTypes?.length ? rangeTypes[0].key : undefined,
    } = getConfig(selectedFilters);

    const defaultStateValue = {
        max: selectedMax,
        min: selectedMin,
        noDataSelected,
        operator: selectedOperator,
        rangeType: selectedRangeType,
    };

    const getValidOperator = (operator: RangeOperators) =>
        operator === RangeOperators.in ? operatorsList[0].value : operator;

    const [rangeFilter, setRangeFilter] = useState<IFilterRange>(defaultStateValue);
    const [checkNoData, setCheckNoData] = useState(noDataSelected);
    const [userCleared, setUserCleared] = useState(false);
    const { max, min, operator, rangeType } = {
        ...rangeFilter,
        operator: getValidOperator(rangeFilter.operator),
    };

    const currentOperator = operatorsList.find((value) => value.value == operator);
    const isBetweenOperator = currentOperator?.value === RangeOperators.between;
    const isMaxEnabled = !currentOperator?.disableMax;
    const isMinEnabled = !currentOperator?.disableMin;

    useEffect(() => {
        setRangeFilter(defaultStateValue);
        setCheckNoData(defaultStateValue.noDataSelected);
    }, [selectedFilters]);

    const hasChanged = () =>
        checkNoData != rangeFilter.noDataSelected ||
        (validateSelectedValues() &&
            (selectedMax != max ||
                selectedMin != min ||
                selectedOperator != operator ||
                selectedRangeType != rangeType));

    const validateSelectedValues = () => {
        if (!currentOperator?.disableMax && !currentOperator?.disableMin) {
            return !!max || (max === 0 && !!min) || min === 0;
        }

        return true;
    };

    const onRangeTypeChanged = (value: string) => {
        setRangeFilter((prevState) => ({
            ...prevState,
            rangeType: value,
        }));
    };

    const onOperatorChanged = (value: RangeOperators) => {
        setRangeFilter((prevState) => ({
            ...prevState,
            operator: value,
        }));
        if (isQuickFilter)
            onChange(filterGroup, [
                {
                    ...currentFilter,
                    data: {
                        ...rangeFilter,
                        noDataSelected: checkNoData,
                        operator: getValidOperator(value),
                    },
                },
            ]);
    };

    const onMinChanged = (min: number | null) => {
        const newMinValue = !!min || min === 0 ? min : undefined;
        setRangeFilter((prevState) => ({ ...prevState, min: newMinValue }));
        if (isQuickFilter)
            onChange(filterGroup, [
                {
                    ...currentFilter,
                    data: {
                        ...rangeFilter,
                        min: newMinValue,
                        noDataSelected: checkNoData,
                        operator: getValidOperator(rangeFilter.operator),
                    },
                },
            ]);
    };

    const onMaxChanged = (max: number | null) => {
        const newMaxValue = !!max || max === 0 ? max : undefined;
        setRangeFilter((prevState) => ({ ...prevState, max: newMaxValue }));
        if (isQuickFilter)
            onChange(filterGroup, [
                {
                    ...currentFilter,
                    data: {
                        ...rangeFilter,
                        max: newMaxValue,
                        noDataSelected: checkNoData,
                        operator: getValidOperator(rangeFilter.operator),
                    },
                },
            ]);
    };

    const onNoDataChanged = (value: CheckboxChangeEvent) => {
        const noDataSelected = value.target.checked;
        setCheckNoData(noDataSelected);
    };

    if (!range) {
        return null;
    }

    const dotField = filterGroup.field;
    const buttonActionDisabled = typeof min !== 'number' && typeof max !== 'number';
    const rangeMinTitle = (dictionary?.range?.min as string) || 'min';
    const rangeMaxTitle = (dictionary?.range?.max as string) || 'max';

    return (
        <StackLayout className={styles.fuiRfContainer} vertical>
            <Space direction="vertical" size="small">
                <StackLayout className={styles.fuiRfRangeOperator} vertical>
                    <Select
                        className={styles.fuiRfRangeOperatorSelect}
                        onChange={onOperatorChanged}
                        options={range.operators || defaultOperators}
                        value={operator}
                    />
                </StackLayout>
                <StackLayout className={cx(styles.fuiRfGroupedValues, styles.fuiRfRangeOperator)} horizontal>
                    {isMinEnabled && (
                        <StackLayout className={styles.fuiRfRangeInputContainer} vertical>
                            {isBetweenOperator && (
                                <span className={styles.fuiRfSectionTitle}>
                                    {get(dictionary, 'range.from', 'From')}
                                </span>
                            )}
                            <InputNumber
                                className={styles.rangeInput}
                                data-cy={`InputNumber_Min_${filterGroup.title}`}
                                id={`from-${dotField}`}
                                key={`from-${dotField}`}
                                onChange={onMinChanged}
                                step={range.step || DEFAULT_STEP}
                                title={rangeMinTitle}
                                value={min}
                            />
                        </StackLayout>
                    )}
                    {isMaxEnabled && (
                        <StackLayout className={styles.fuiRfRangeInputContainer} vertical>
                            {isBetweenOperator && (
                                <span className={styles.fuiRfSectionTitle}>{get(dictionary, 'range.to', 'To')}</span>
                            )}
                            <InputNumber
                                className={styles.rangeInput}
                                data-cy={`InputNumber_Max_${filterGroup.title}`}
                                id={`to-${dotField}`}
                                key={`to-${dotField}`}
                                onChange={onMaxChanged}
                                step={range.step || DEFAULT_STEP}
                                title={rangeMaxTitle}
                                value={max}
                            />
                        </StackLayout>
                    )}
                </StackLayout>
                {hasConfigStep(filterGroup) && (
                    <Text className={styles.fuiRfRangeInterval} type="secondary">
                        {get(dictionary, 'range.actualInterval', 'Actual interval')} :{' '}
                        {range.min?.toFixed(intervalDecimal)} - {range.max?.toFixed(intervalDecimal)}
                    </Text>
                )}
                {!!range?.rangeTypes?.length && (
                    <StackLayout className={styles.fuiRfRangeTarget} vertical>
                        <span className={styles.fuiRfSectionTitle}>{get(dictionary, 'range.unit', 'Unit')}</span>
                        <Select
                            className={styles.fuiRfRangeTargetSelect}
                            onChange={onRangeTypeChanged}
                            value={rangeType}
                        >
                            {range?.rangeTypes.map((u) => (
                                <Option key={u.key} value={u.key}>
                                    {u.name}
                                </Option>
                            ))}
                        </Select>
                    </StackLayout>
                )}
                {noDataInputOption && (
                    <StackLayout vertical>
                        <Checkbox
                            checked={checkNoData}
                            data-cy={`Checkbox_NoData_${filterGroup.title}`}
                            onChange={onNoDataChanged}
                        >
                            {get(dictionary, 'range.noData', 'No Data')}
                        </Checkbox>
                    </StackLayout>
                )}
            </Space>
            {!isQuickFilter && (
                <StackLayout className={styles.fuiRfActions} horizontal>
                    <Button
                        className={styles.fuiRfActionsClear}
                        disabled={buttonActionDisabled}
                        onClick={() => {
                            setRangeFilter((prevState) => ({
                                ...prevState,
                                max: undefined,
                                min: undefined,
                                operator: operatorsList[0].value,
                            }));
                            setUserCleared(true);
                        }}
                        size="small"
                        type="text"
                    >
                        {get(dictionary, 'actions.none', 'Clear')}
                    </Button>
                    <Button
                        className={styles.fuiRfActionsApply}
                        data-cy={`Button_Apply_${filterGroup.title}`}
                        disabled={userCleared ? !userCleared : !hasChanged()}
                        onClick={() => {
                            onChange(filterGroup, [
                                {
                                    ...currentFilter,
                                    data: {
                                        ...rangeFilter,
                                        noDataSelected: checkNoData,
                                        operator: getValidOperator(rangeFilter.operator),
                                    },
                                },
                            ]);
                            setUserCleared(false);
                        }}
                        size="small"
                        type="primary"
                    >
                        <span data-key="apply">{get(dictionary, 'actions.apply', 'Apply')}</span>
                    </Button>
                </StackLayout>
            )}
        </StackLayout>
    );
};

const hasConfigStep = (filterGroup: IFilterGroup<IFilterRangeConfig>) =>
    (filterGroup.config?.min === 0 || filterGroup.config?.min) &&
    (filterGroup.config?.max === 0 || filterGroup.config?.max);

export default RangeFilter;
