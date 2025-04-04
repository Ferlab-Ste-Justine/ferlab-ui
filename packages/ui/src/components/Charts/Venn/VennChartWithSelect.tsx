import React, { useState } from 'react';
import { ISyntheticSqon } from '@ferlab/ui/data/sqon/types';
import { Select } from 'antd';

import { IUserSetOutput } from '../../BiospecimenRequest/requestBiospecimen.utils';

import SaveModal, { MAX_TITLE_LENGTH } from './SaveModal';
import { ISetOperation, ISummaryData, THandleSubmit, TOption, TVennChartDictionary } from './utils';
import VennSekeleton from './VennSekeleton';
import VennChart from '.';

import styles from './index.module.css';

enum Index {
    participant = 'participant',
    biospecimen = 'biospecimen',
    file = 'file',
}

export const DEFAULT_VENN_CHART_DICTIONARY: TVennChartDictionary = {
    biospecimens: 'Biospecimens',
    count: 'Count :',
    files: 'Files',
    filters: {
        compareButton: 'Compare',
        compareDisabledTooltip: 'Available with 2 or 3 sets selected',
        optionDisabledTooltip: 'Not enought set to compare',
        resetTooltip: 'Reset',
        selectEntity: 'Select Entity',
        selectEntityPlaceholder: 'Select entity type',
        selectSet: 'Select sets',
        selectSetPlaceholder: 'Select sets',
    },
    participants: 'Participants',
    query: {
        column: 'Query definition',
        title: 'Selected queries',
    },
    save: {
        alreadyExist: 'A set with this name already exists',
        cancel: 'Cancel',
        checkbox: {
            label: 'Save this set for future reference',
            tooltips:
                'A saved set is a collection of one or more entity IDs which can be saved and revisited for later use.',
        },
        getEntityText: (index, entityCount) => {
            if (index === Index.biospecimen) {
                return `You have selected ${entityCount} biospecimens.`;
            } else if (index === Index.file) {
                return `You have selected ${entityCount} files.`;
            } else {
                return `You have selected ${entityCount} participants.`;
            }
        },
        label: 'Set name',
        maximumLength: `${MAX_TITLE_LENGTH}characters maximum`,
        nameTemplate: 'Combinet set',
        ok: 'View set',
        permittedCharacters: 'Permitted characters: A-Z a-z 0-9 ()[]-_:|.,',
        requiredField: 'This field is required',
        title: 'View in Data Exploration',
    },
    set: {
        column: 'Set definition',
        footer: 'Union of selected sets',
        max: 'Max 10,000 at a time',
        title: 'Set definitions',
        tooltips: 'View in exploration',
    },
};

export type TVennChartWithSelect = {
    savedSets: IUserSetOutput[];
    dictionary?: TVennChartDictionary;
    options: TOption[];
    loading?: boolean;
    handleIndexChange: (qbSqons: ISyntheticSqon[], index: string) => void;
    handleClose?: () => void;
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
};

const VennChartWithSelect = ({
    analytics,
    dictionary = DEFAULT_VENN_CHART_DICTIONARY,
    factor,
    handleClose,
    handleIndexChange,
    handleSubmit,
    loading,
    operations,
    options,
    outlineWidth,
    radius,
    savedSets,
    size,
    summary = [],
}: TVennChartWithSelect): JSX.Element => {
    const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
    const [entity, setEntity] = useState<string>(options[0].value);
    const [tableSelectedSets, setTableSelectedSets] = useState<ISetOperation[]>([]);
    const [selectedSets, setSelectedSets] = useState<ISetOperation[]>([]);

    if (loading) {
        return <VennSekeleton height={600} width={800} />;
    }

    return (
        <>
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
            <div className={styles.vennChart}>
                <div className={styles.selectWrapper}>
                    <label className={styles.selectLabel}>{dictionary.count}</label>
                    <Select
                        className={styles.select}
                        onChange={(value) => {
                            setEntity(value);
                            setSelectedSets([]);
                            setTableSelectedSets([]);
                            handleIndexChange(
                                summary.map((data) => data.qbSqon),
                                value,
                            );
                        }}
                        value={entity}
                    >
                        {options.map((option) => (
                            <option value={option.value}>
                                <span className={styles.optionIcon}>{option.icon}</span>
                                <span>{option.label}</span>
                            </option>
                        ))}
                    </Select>
                </div>
                <VennChart
                    analytics={analytics}
                    dictionary={dictionary}
                    entity={entity}
                    factor={factor}
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
            </div>
        </>
    );
};

export default VennChartWithSelect;
