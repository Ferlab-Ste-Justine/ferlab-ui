import React, { ReactElement } from 'react';
import { Alert, Modal } from 'antd';

import { DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY, IRequestBiospecimenDictionary } from './requestBiospecimen.utils';

import styles from './requestBiospecimen.module.scss';

type NoSampleModalProps = {
    closeModal: () => void;
    dictionary: IRequestBiospecimenDictionary;
    isOpen: boolean;
};

const NoSampleModal = ({
    closeModal,
    dictionary = DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY,
    isOpen,
}: NoSampleModalProps): ReactElement => (
    <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        okText={dictionary.modal.closeText}
        onCancel={() => {
            closeModal();
        }}
        onOk={() => {
            closeModal();
        }}
        open={isOpen}
        title={dictionary.modal.title}
        width={680}
    >
        <Alert
            description={dictionary.modal.alert.infoDescription}
            message={<span className={styles.alertTitle}>{dictionary.modal.alert.infoMessage}</span>}
            type="info"
        />
    </Modal>
);

export default NoSampleModal;
