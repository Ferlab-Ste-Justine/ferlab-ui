import React from 'react';
import { useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, PopoverProps } from 'antd';
import cx from 'classnames';

import { TFetchMatchFunc, TOnUpload, UploadIdDictionary } from './types';
import UploadModal from './UploadModal';

import styles from './index.module.scss';

export interface UploadIdsProps {
    className?: string;
    fetchMatch: TFetchMatchFunc;
    popoverProps?: PopoverProps;
    dictionary: UploadIdDictionary;
    placeHolder: string;
    onUpload: TOnUpload;
    modalWidth?: number;
    mimeTypes?: string;
    limitItem?: number;
}

const UploadIds = ({
    className = '',
    dictionary,
    fetchMatch,
    limitItem,
    mimeTypes,
    modalWidth,
    onUpload,
    placeHolder,
    popoverProps,
}: UploadIdsProps) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <>
            <Button
                className={cx(styles.fuiUploadIdsButton, className)}
                icon={<UploadOutlined />}
                onClick={() => setModalVisible(true)}
                type="primary"
            >
                {dictionary.uploadBtnText}
            </Button>
            <UploadModal
                dictionary={dictionary}
                fetchMatch={fetchMatch}
                limitItem={limitItem}
                mimeTypes={mimeTypes}
                onUpload={onUpload}
                placeHolder={placeHolder}
                popoverProps={popoverProps}
                setVisible={setModalVisible}
                visible={modalVisible}
                width={modalWidth}
            />
        </>
    );
};

export default UploadIds;
