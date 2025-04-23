import React, { ReactNode, useState } from 'react';
import { UndoOutlined } from '@ant-design/icons';
import { Button, Select, Tag, Tooltip, Typography } from 'antd';
import cx from 'classnames';

import CardErrorPlaceholder from '../../../../view/v2/GridCard/GridCardErrorPlaceholder';
import { IUserSetOutput, SetType } from '../../../BiospecimenRequest/requestBiospecimen.utils';
import AndOrIcon from '../../../Icons/AndOrIcon';
import ProLabel from '../../../ProLabel';
import { QueryDictionaryContext } from '../../../QueryBuilder/context';
import { IDictionary } from '../../../QueryBuilder/types';
import SaveModal from '../SaveModal';
import { ISetOperation, ISummaryData, THandleSubmit, TOption, TVennChartDictionary } from '../utils';
import { DEFAULT_VENN_CHART_DICTIONARY } from '../VennChartWithSelect';
import VennChart from '..';

import VennWithFilterSkeleton from './VennWithFilterSkeleton';

import styles from './index.module.css';

export type TVennChartWithFilters = {
    savedSets: IUserSetOutput[];
    dictionary?: TVennChartDictionary;
    entitySelected: SetType;
    options: TOption[];
    loading?: boolean;
    handleClose?: () => void;
    handleCompare: (setIdsSelected: string[], entitySelected: string) => void;
    handleSubmit: (props: THandleSubmit) => void;
    outlineWidth?: number;
    radius?: number;
    factor?: number;
    summary?: ISummaryData[];
    operations?: ISetOperation[];
    size: {
        width: number;
        height: number;
    };
    analytics: {
        trackVennViewInExploration: () => void;
        trackVennClickOnSections: () => void;
        trackVennViewSet: () => void;
        trackVennViewEntityCounts: (type: string, entityCount: number) => void;
    };
    entityOptions: { value: string; label: string; icon: ReactNode; disabled: boolean }[];
    idsSelected: string[];
    error?: boolean;
    queryPillDictionary?: IDictionary;
    isSetsView?: boolean;
    chartClassname?: string;
};

const getDisabledOption = (option: IUserSetOutput, setIdsSelected: string[]): boolean => {
    if (setIdsSelected.length < 3) return false;
    return !setIdsSelected.includes(option.id);
};

const VennChartWithFilters = ({
    analytics,
    chartClassname = '',
    dictionary = DEFAULT_VENN_CHART_DICTIONARY,
    entityOptions,
    entitySelected,
    error = false,
    factor,
    handleClose,
    handleCompare,
    handleSubmit,
    idsSelected,
    isSetsView = false,
    loading,
    operations,
    options,
    outlineWidth,
    queryPillDictionary = {},
    radius,
    savedSets,
    size,
    summary = [],
}: TVennChartWithFilters): JSX.Element => {
    const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
    const [entity, setEntity] = useState<string>(entitySelected);
    const [setIdsSelected, setSetIdsSelected] = useState<string[]>(idsSelected);
    const [tableSelectedSets, setTableSelectedSets] = useState<ISetOperation[]>([]);
    const [selectedSets, setSelectedSets] = useState<ISetOperation[]>([]);
    const [entityCompared, setEntityCompared] = useState<string>(entitySelected);
    const [setIdsCompared, setSetIdsCompared] = useState<string[]>(idsSelected);
    const [openSetsDropdown, setOpenSetsDropdown] = useState<boolean>(false);

    if (loading) {
        return <VennWithFilterSkeleton />;
    }

    return (
        <QueryDictionaryContext.Provider value={{ dictionary: queryPillDictionary }}>
            <div className={styles.vennChart}>
                <div className={styles.filtersWrapper}>
                    <div className={styles.selectEntityWrapper}>
                        <ProLabel
                            className={styles.inputLabel}
                            title={dictionary.filters?.selectEntity || 'Select entity'}
                        />
                        <Select
                            className={styles.select}
                            onChange={(value) => {
                                setEntity(value);
                                setSetIdsSelected([]);
                                setOpenSetsDropdown(true);
                            }}
                            placeholder={dictionary.filters?.selectEntityPlaceholder}
                            value={entity}
                        >
                            {entityOptions.map((option) => (
                                <Select.Option
                                    className={cx(styles.labelOption, option.disabled && styles.disabledOption)}
                                    disabled={option.disabled}
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.disabled ? (
                                        <Tooltip title={dictionary.filters?.optionDisabledTooltip}>
                                            <span
                                                className={cx(
                                                    styles.iconOption,
                                                    option.disabled && styles.disabledOption,
                                                )}
                                            >
                                                {option.icon}
                                            </span>
                                            {option.label}
                                        </Tooltip>
                                    ) : (
                                        <>
                                            <span
                                                className={cx(
                                                    styles.iconOption,
                                                    option.disabled && styles.disabledOption,
                                                )}
                                            >
                                                {option.icon}
                                            </span>
                                            {option.label}
                                        </>
                                    )}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div className={styles.selectSetWrapper}>
                        <ProLabel className={styles.inputLabel} title={dictionary.filters?.selectSet || 'Select set'} />
                        <Select
                            allowClear
                            className={styles.select}
                            dropdownStyle={{ maxHeight: 250, overflow: 'auto' }}
                            maxTagCount="responsive"
                            mode="multiple"
                            onClear={() => setSetIdsSelected([])}
                            onDeselect={(value: string) => {
                                const ids = setIdsSelected.filter((val) => val !== value);
                                setSetIdsSelected(ids);
                            }}
                            onDropdownVisibleChange={(open) => setOpenSetsDropdown(open)}
                            onSelect={(value: string) => {
                                setSetIdsSelected([...setIdsSelected, value]);
                            }}
                            open={openSetsDropdown}
                            placeholder={dictionary.filters?.selectSetPlaceholder}
                            tagRender={({ label, onClose }) => (
                                <Tag className={styles.filterTag} closable onClose={onClose}>
                                    <Typography.Text className={styles.filterTagText}>{label}</Typography.Text>
                                </Tag>
                            )}
                            value={setIdsSelected}
                        >
                            {savedSets
                                .filter((set) => set.setType === entity && !set.is_invisible)
                                .map((option) => {
                                    const isDisabled = getDisabledOption(option, setIdsSelected);
                                    return (
                                        <Select.Option
                                            className={cx(styles.labelOption, isDisabled && styles.disabledOption)}
                                            disabled={isDisabled}
                                            key={option.id}
                                            value={option.id}
                                        >
                                            {`${option.tag} (${option.size})`}
                                        </Select.Option>
                                    );
                                })}
                        </Select>
                    </div>
                    <div className={styles.resetWrapper}>
                        <Tooltip title={dictionary.filters?.resetTooltip}>
                            <Button
                                disabled={
                                    entityCompared === entity &&
                                    JSON.stringify(setIdsCompared.slice().sort()) ===
                                        JSON.stringify(setIdsSelected.slice().sort())
                                }
                                onClick={() => {
                                    setSetIdsSelected(setIdsCompared);
                                    setEntity(entityCompared);
                                }}
                            >
                                <UndoOutlined size={16} />
                            </Button>
                        </Tooltip>
                    </div>
                    <Tooltip title={setIdsSelected.length < 2 && dictionary.filters?.compareDisabledTooltip}>
                        <Button
                            disabled={setIdsSelected.length < 2}
                            onClick={() => {
                                handleCompare(setIdsSelected, entity);
                                setSetIdsCompared(setIdsSelected);
                                setEntityCompared(entity);
                            }}
                            type="primary"
                        >
                            <AndOrIcon />
                            {dictionary.filters?.compareButton}
                        </Button>
                    </Tooltip>
                </div>
                <div className={styles.vennWrapper}>
                    {error && <CardErrorPlaceholder />}
                    {!error && (
                        <VennChart
                            analytics={analytics}
                            chartClassname={chartClassname}
                            dictionary={dictionary}
                            entity={entityCompared}
                            factor={factor}
                            isSetsView={isSetsView}
                            loading={loading}
                            operations={operations}
                            options={options}
                            outlineWidth={outlineWidth}
                            radius={radius}
                            setSaveModalOpen={(isOpen: boolean) => setSaveModalOpen(isOpen)}
                            setSelectedSets={(sets: ISetOperation[]) => setSelectedSets(sets)}
                            setTableSelectedSets={(sets: ISetOperation[]) => setTableSelectedSets(sets)}
                            size={size}
                            summary={summary}
                            tableSelectedSets={tableSelectedSets}
                        />
                    )}
                </div>
            </div>
            {saveModalOpen && (
                <SaveModal
                    dictionary={dictionary.save}
                    entity={entity}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                    isOpen={saveModalOpen}
                    savedSets={savedSets}
                    selectedSets={selectedSets}
                    setOpen={(isOpen: boolean) => setSaveModalOpen(isOpen)}
                    setSelectedSets={(sets: ISetOperation[]) => setSelectedSets(sets)}
                    viewSetAnalytics={analytics.trackVennViewSet}
                />
            )}
        </QueryDictionaryContext.Provider>
    );
};

export default VennChartWithFilters;
