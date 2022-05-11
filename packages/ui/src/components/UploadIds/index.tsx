import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, PopoverProps } from 'antd';
import { useEffect, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { difference } from 'lodash';
import UploadModal from './UploadModal';
import cx from 'classnames';
import { MatchTableItem, UnmatchTableItem, UploadIdDictionary } from './types';

import styles from '@ferlab/style/components/uploadids/UploadIds.module.scss';

export interface UploadIdsProps {
    className?: string;
    fetchMatch: (ids: string[]) => Promise<MatchTableItem[]>;
    popoverProps?: PopoverProps;
    dictionary: UploadIdDictionary;
    placeHolder: string;
    onUpload: (matchIds: string[]) => void;
    modalWidth?: number;
    mimeTypes?: string;
}

const UploadIds = ({
    className = '',
    fetchMatch,
    popoverProps,
    dictionary,
    placeHolder,
    onUpload,
    modalWidth,
    mimeTypes,
}: UploadIdsProps) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState('');
    const [match, setMatch] = useState<MatchTableItem[] | undefined>(undefined);
    const [unmatch, setUnmatch] = useState<UnmatchTableItem[] | undefined>(undefined);
    const debouncedValue = useDebounce(value, 500);

    const getValueList = () => value.split(/[\n,\r ]/).filter((val) => !!val);
    const getUnmatchList = (results: MatchTableItem[]) =>
        difference(
            getValueList(),
            results.map((item) => item.submittedId),
        ).map((id) => ({
            submittedId: id,
        }));

    useEffect(() => {
        if (debouncedValue) {
            (async () => {
                setIsLoading(true);
                const results = await fetchMatch(getValueList());
                setMatch(results);
                setUnmatch(getUnmatchList(results));
                setIsLoading(false);
            })();
        } else {
            // clear match/unmatch
            setValue('');
            setMatch(undefined);
            setUnmatch(undefined);
        }
        // eslint-disable-next-line
    }, [debouncedValue]);

    return (
        <>
            <Button
                type="primary"
                className={cx(styles.fuiUploadIdsButton, className)}
                icon={<UploadOutlined />}
                onClick={() => setModalVisible(true)}
            >
                {dictionary.uploadBtnText}
            </Button>
            <UploadModal
                width={modalWidth}
                visible={modalVisible}
                setVisible={setModalVisible}
                matchItems={match}
                unmatchItems={unmatch}
                dictionary={dictionary}
                popoverProps={popoverProps}
                placeHolder={placeHolder}
                inputValue={value}
                setInputValue={setValue}
                onUpload={onUpload}
                loading={isLoading}
                mimeTypes={mimeTypes}
            />
        </>
    );
};

export default UploadIds;
