import React, { useState } from 'react';
import { Button, Tooltip } from 'antd';
import { ColumnType } from 'antd/lib/table';

import { ISqonGroupFilter } from '../../data/sqon/types';

import RequestBiospecimenLimitModal from './RequestBiospecimenLimitModal';
import RequestBiospecimenModal, { IGetSamples, IGetSavedSets } from './RequestBiospecimenModal';
import {
    DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY,
    IRequestBiospecimenDictionary,
    IUserSetOutput,
    MAX_TITLE_LENGTH,
} from './requestBiospecimen.utils';

interface RequestBiospecimenButtonProps {
    additionalHandleClick?: () => void;
    additionalHandleFinish?: () => void;
    createAndFetchReport: (name: string) => void;
    dictionary: IRequestBiospecimenDictionary;
    disabled?: boolean;
    getDataTypeColumns: () => ColumnType<any>[];
    getSamples: () => IGetSamples;
    getSavedSets: () => IGetSavedSets;
    maxTitleLength?: number;
    nbBiospecimenSelected: number;
    sqon?: ISqonGroupFilter;
    type?: 'default' | 'primary';
}

const RequestBiospecimenButton = ({
    additionalHandleClick,
    additionalHandleFinish,
    createAndFetchReport,
    dictionary = DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY,
    disabled = false,
    getDataTypeColumns,
    getSamples,
    getSavedSets,
    maxTitleLength = MAX_TITLE_LENGTH,
    nbBiospecimenSelected,
    type = 'default',
    sqon,
}: RequestBiospecimenButtonProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLimitOpen, setIsLimitOpen] = useState<boolean>(false);

    const handleClick = () => {
        additionalHandleClick && additionalHandleClick();
        if (nbBiospecimenSelected <= 10000) {
            setIsOpen(true);
        } else {
            setIsLimitOpen(true);
        }
    };

    return (
        <>
            <Tooltip title={disabled ? dictionary.itemSelectionTooltip : undefined}>
                <Button disabled={disabled} onClick={handleClick} type={type}>
                    {dictionary.buttonLabel}
                </Button>
            </Tooltip>
            {isOpen && (
                <RequestBiospecimenModal
                    additionalHandleFinish={additionalHandleFinish}
                    closeModal={() => setIsOpen(false)}
                    createAndFetchReport={createAndFetchReport}
                    dictionary={dictionary}
                    getDataTypeColumns={getDataTypeColumns}
                    getSamples={getSamples}
                    getSavedSets={getSavedSets}
                    isOpen={isOpen}
                    sqon={sqon}
                    maxTitleLength={maxTitleLength}
                />
            )}
            {isLimitOpen && (
                <RequestBiospecimenLimitModal
                    closeModal={() => setIsLimitOpen(false)}
                    dictionary={dictionary}
                    isOpen={isLimitOpen}
                />
            )}
        </>
    );
};

export default RequestBiospecimenButton;
