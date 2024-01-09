import React from 'react';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, ModalFuncProps } from 'antd';

import styles from './WarningModal.module.scss';

const WarningModal = (props: ModalFuncProps): JSX.Element => (
    <Modal
        closable={false}
        destroyOnClose
        {...props}
        title={
            <>
                <ExclamationCircleOutlined className={styles.icon} size={24} /> {props.title ?? 'Error'}
            </>
        }
    >
        {props.content}
    </Modal>
);

export default WarningModal;
