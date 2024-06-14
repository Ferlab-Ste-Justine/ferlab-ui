import React from 'react';
import { Alert, Modal, Typography } from 'antd';

import styles from './requestBiospecimen.module.scss';
import { IRequestBiospecimenDictionary } from './requestBiospecimen.utils';

const { Text } = Typography;

type RequestBiospecimenLimitModalProps = {
    closeModal: () => void;
    dictionary: IRequestBiospecimenDictionary;
    isOpen: boolean;
};

const RequestBiospecimenLimitModal = ({ closeModal, dictionary, isOpen }: RequestBiospecimenLimitModalProps) => (
    <Modal
        cancelText={dictionary.modal.cancelText}
        okButtonProps={{
            disabled: true,
        }}
        okText={dictionary.modal.okText}
        onCancel={() => {
            closeModal();
        }}
        open={isOpen}
        title={dictionary.modal.title}
        width={680}
    >
        <div className={styles.modalWrapper}>
            <div className={styles.description}>
                <Text>{dictionary.modal.description}</Text>
            </div>
            <Alert
                description={dictionary.modal.alert.limitDescription}
                message={dictionary.modal.alert.limitMessage}
                type="error"
            />
        </div>
    </Modal>
);

export default RequestBiospecimenLimitModal;
