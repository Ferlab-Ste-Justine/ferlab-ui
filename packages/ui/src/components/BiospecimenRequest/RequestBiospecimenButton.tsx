import React, { ReactElement, useState } from 'react';
import { Button, Tooltip } from 'antd';
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { ColumnType } from 'antd/lib/table';

import { ISqonGroupFilter } from '../../data/sqon/types';

import {
    BIOSPECIMENT_REQUEST_MAX_TITLE_LENGTH,
    DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY,
    IRequestBiospecimenDictionary,
} from './requestBiospecimen.utils';
import RequestBiospecimenLimitModal from './RequestBiospecimenLimitModal';
import RequestBiospecimenModal, { IGetSamples, IGetSavedSets } from './RequestBiospecimenModal';

interface RequestBiospecimenButtonProps {
    additionalHandleClick?: () => void;
    additionalHandleFinish?: () => void;
    columns: ColumnType<any>[];
    createAndFetchReport: (name: string) => void;
    dictionary: IRequestBiospecimenDictionary;
    disabled?: boolean;
    getSamples: () => IGetSamples;
    getSavedSets: () => IGetSavedSets;
    maxTitleLength?: number;
    nbBiospecimenSelected: number;
    size?: SizeType;
    sqon?: ISqonGroupFilter;
    type?: 'default' | 'primary';
}

const RequestBiospecimenButton = ({
    additionalHandleClick,
    additionalHandleFinish,
    columns,
    createAndFetchReport,
    dictionary = DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY,
    disabled = false,
    getSamples,
    getSavedSets,
    maxTitleLength = BIOSPECIMENT_REQUEST_MAX_TITLE_LENGTH,
    nbBiospecimenSelected,
    size = undefined,
    sqon,
    type = 'default',
}: RequestBiospecimenButtonProps): ReactElement => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isLimitOpen, setIsLimitOpen] = useState<boolean>(false);

    const handleClick = () => {
        additionalHandleClick && additionalHandleClick();
        if (nbBiospecimenSelected <= 10000) {
            setIsOpen(true);
            return;
        } else {
            setIsLimitOpen(true);
        }
    };

    return (
        <>
            <Tooltip title={disabled ? dictionary.itemSelectionTooltip : undefined}>
                <Button disabled={disabled} onClick={handleClick} size={size} type={type}>
                    {dictionary.buttonLabel}
                </Button>
            </Tooltip>
            {isOpen && (
                <RequestBiospecimenModal
                    additionalHandleFinish={additionalHandleFinish}
                    closeModal={() => setIsOpen(false)}
                    columns={columns}
                    createAndFetchReport={createAndFetchReport}
                    dictionary={dictionary}
                    getSamples={getSamples}
                    getSavedSets={getSavedSets}
                    isOpen={isOpen}
                    maxTitleLength={maxTitleLength}
                    sqon={sqon}
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
