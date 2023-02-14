import { Button, Checkbox, InputNumber, Select, Space } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import cx from 'classnames';
import { isNull, isUndefined } from 'lodash';
import get from 'lodash/get';
import React, { useEffect, useState } from 'react';
import { RangeOperators } from '../../data/sqon/operators';
import StackLayout from '../../layout/StackLayout';
import BetweenOperatorIcon from './icons/BetweenOperatorIcon';
import GreaterThanOperatorIcon from './icons/GreaterThanOperatorIcon';
import GreaterThanOrEqualOperatorIcon from './icons/GreaterThanOrEqualOperatorIcon';
import LessThanOperatorIcon from './icons/LessThanOperatorIcon';
import LessThanOrEqualOperatorIcon from './icons/LessThanOrEqualOperatorIcon';
import {
    IDictionary,
    IFilter,
    IFilterGroup,
    IFilterRange,
    IFilterRangeConfig,
    IRangeOperatorConfig,
    onChangeType,
} from './types';

import styles from '@ferlab/style/components/filters/RangeFilter.module.scss';

const { Option } = Select;

export type RangeFilterProps = {
    filters: IFilter<IFilterRange>[];
    filterGroup: IFilterGroup<IFilterRangeConfig>;
    onChange: onChangeType<IFilterRange>;
    selectedFilters?: IFilter[];
    dictionary?: IDictionary | Record<string, never>;
    noDataInputOption?: boolean;
};

const DEFAULT_STEP = 1;

const getDefaultOperatorList = (
    dictionary: IDictionary | undefined,
    defaultOperator: RangeOperators,
): IRangeOperatorConfig[] => {
    const defaultOperatorList = [
        {
            disableMin: true,
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <LessThanOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.lessThan', 'Less than')}
                    </span>
                </span>
            ),
            operator: RangeOperators['<'],
        },
        {
            disableMin: true,
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <LessThanOrEqualOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.lessThanOfEqual', 'Less than or equal')}
                    </span>
                </span>
            ),
            operator: RangeOperators['<='],
        },
        {
            disableMax: true,
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <GreaterThanOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.greaterThan', 'Greater than')}
                    </span>
                </span>
            ),
            operator: RangeOperators['>'],
        },
        {
            disableMax: true,
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <GreaterThanOrEqualOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.greaterThanOrEqual', 'Greater than or equal')}
                    </span>
                </span>
            ),
            operator: RangeOperators['>='],
        },
        {
            name: (
                <span className={styles.fuiRfSelectOptionContent}>
                    <BetweenOperatorIcon className={styles.operatorIcon} />
                    <span className={styles.fuiRfSelectOptionContentTitle}>
                        {get(dictionary, 'operators.between', 'Between (inclusive)')}
                    </span>
                </span>
            ),
            operator: RangeOperators.between,
        },
    ];

    return defaultOperator
        ? defaultOperatorList.sort((a, b) =>
              a.operator == defaultOperator ? -1 : b.operator == defaultOperator ? 1 : 0,
          )
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
    noDataInputOption = true,
    onChange,
    selectedFilters,
}: RangeFilterProps): React.ReactElement | null => {
    const { config: range } = filterGroup;
    const currentFilter: IFilter<IFilterRange> = filters[0];
    const rangeTypes = filterGroup.config?.rangeTypes;
    const defaultOperators = getDefaultOperatorList(dictionary, filterGroup.config?.defaultOperator!);
    const operatorsList = range?.operators?.length ? range?.operators : defaultOperators;

    const {
        selectedMax = undefined,
        selectedMin = undefined,
        selectedOperator = operatorsList[0].operator,
        selectedRangeType = rangeTypes?.length ? rangeTypes[0].key : undefined,
        noDataSelected = false,
    } = getConfig(selectedFilters);

    const defaultStateValue = {
        max: selectedMax,
        min: selectedMin,
        operator: selectedOperator,
        rangeType: selectedRangeType,
        noDataSelected,
    };

    const getValidOperator = (operator: RangeOperators) =>
        operator === RangeOperators.in ? operatorsList[0].operator : operator;

    const [rangeFilter, setRangeFilter] = useState<IFilterRange>(defaultStateValue);
    const [checkNoData, setCheckNoData] = useState(noDataSelected);
    const [userCleared, setUserCleared] = useState(false);
    const { max, min, operator, rangeType } = {
        ...rangeFilter,
        operator: getValidOperator(rangeFilter.operator),
    };

    const currentOperator = operatorsList.find((value) => value.operator == operator);
    const isMaxDisabled = currentOperator?.disableMax;
    const isMinDisabled = currentOperator?.disableMin;

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
            return !isUndefined(max) && !isUndefined(min);
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
    };

    const onMinChanged = (value: string | number | undefined) => {
        const min = typeof value === 'string' ? parseFloat(value) : value;
        setRangeFilter((prevState) => ({ ...prevState, min: isUndefined(min) ? min : undefined }));
    };

    const onMaxChanged = (value: string | number | undefined) => {
        const max = typeof value === 'string' ? parseFloat(value) : value;
        setRangeFilter((prevState) => ({ ...prevState, max: isUndefined(max) ? max : undefined }));
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

    return (
        <StackLayout className={styles.fuiRfContainer} vertical>
            {isNull(filterGroup.config?.min) && isNull(filterGroup.config?.min) ? (
                <Space className={styles.noResultsText} direction="vertical">
                    {get(dictionary, 'messages.errorNoData', 'No values found for this request')}
                </Space>
            ) : (
                <>
                    <StackLayout className={styles.fuiRfRangeOperator} vertical>
                        <Select
                            className={styles.fuiRfRangeOperatorSelect}
                            onChange={onOperatorChanged}
                            value={operator}
                        >
                            {(range.operators || defaultOperators).map((opConfig) => (
                                <Option key={opConfig.operator} value={opConfig.operator}>
                                    {opConfig.name}
                                </Option>
                            ))}
                        </Select>
                    </StackLayout>

                    <StackLayout className={cx(styles.fuiRfGroupedValues, styles.fuiRfRangeOperator)} horizontal>
                        <StackLayout className={styles.fuiRfRangeInputContainer} vertical>
                            <span className={styles.fuiRfSectionTitle}>Min.</span>
                            <InputNumber
                                className={styles.rangeInput}
                                disabled={isMinDisabled}
                                id={`from-${dotField}`}
                                key={`from-${dotField}`}
                                max={range.max}
                                min={range.min}
                                onChange={onMinChanged}
                                placeholder={range.min?.toString()}
                                step={range.step || DEFAULT_STEP}
                                title={get(dictionary, 'range.min', 'min')}
                                type="number"
                                value={isMinDisabled ? range.min : min}
                            />
                        </StackLayout>
                        <StackLayout className={styles.fuiRfRangeInputContainer} vertical>
                            <span className={styles.fuiRfSectionTitle}>Max.</span>
                            <InputNumber
                                className={styles.rangeInput}
                                disabled={isMaxDisabled}
                                id={`to-${dotField}`}
                                key={`to-${dotField}`}
                                max={range.max}
                                min={range.min}
                                onChange={onMaxChanged}
                                placeholder={range.max?.toString()}
                                step={range.step || DEFAULT_STEP}
                                title={get(dictionary, 'range.max', 'max')}
                                type="number"
                                value={isMaxDisabled ? range.max : max}
                            />
                        </StackLayout>
                    </StackLayout>

                    {range?.rangeTypes?.length! > 0 && (
                        <StackLayout className={styles.fuiRfRangeTarget} vertical>
                            <span className={styles.fuiRfSectionTitle}>{get(dictionary, 'range.unit', 'Unit')}</span>
                            <Select
                                className={styles.fuiRfRangeTargetSelect}
                                onChange={onRangeTypeChanged}
                                value={rangeType}
                            >
                                {range?.rangeTypes!.map((u) => (
                                    <Option key={u.key} value={u.key}>
                                        {u.name}
                                    </Option>
                                ))}
                            </Select>
                        </StackLayout>
                    )}

                    {noDataInputOption && (
                        <StackLayout vertical>
                            <Checkbox checked={checkNoData} onChange={onNoDataChanged}>
                                {get(dictionary, 'range.noData', 'No Data')}
                            </Checkbox>
                        </StackLayout>
                    )}
                </>
            )}

            <StackLayout className={styles.fuiRfActions} horizontal>
                <Button
                    className={styles.fuiRfActionsClear}
                    disabled={buttonActionDisabled}
                    onClick={() => {
                        setRangeFilter((prevState) => ({
                            ...prevState,
                            max: undefined,
                            min: undefined,
                            operator: operatorsList[0].operator,
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
                    disabled={userCleared ? !userCleared : !hasChanged()}
                    onClick={() => {
                        onChange(filterGroup, [
                            {
                                ...currentFilter,
                                data: {
                                    ...rangeFilter,
                                    operator: getValidOperator(rangeFilter.operator),
                                    noDataSelected: checkNoData,
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
        </StackLayout>
    );
};

export default RangeFilter;
