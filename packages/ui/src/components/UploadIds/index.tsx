import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, PopoverProps } from 'antd';
import { useState } from 'react';
import UploadModal from './UploadModal';
import cx from 'classnames';
import { TFetchMatchFunc, TOnUpload, UploadIdDictionary } from './types';

import styles from '@ferlab/style/components/uploadids/UploadIds.module.scss';

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
    fetchMatch,
    popoverProps,
    dictionary,
    placeHolder,
    onUpload,
    modalWidth,
    mimeTypes,
    limitItem,
}: UploadIdsProps) => {
    const [modalVisible, setModalVisible] = useState(false);

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
                dictionary={dictionary}
                popoverProps={popoverProps}
                placeHolder={placeHolder}
                onUpload={onUpload}
                mimeTypes={mimeTypes}
                fetchMatch={fetchMatch}
                limitItem={limitItem}
            />
        </>
    );
};

export default UploadIds;
