import React from 'react';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Modal, ModalFuncProps } from 'antd';

import styles from './ErrorModal.module.scss';

const ErrorModal = (props: ModalFuncProps): JSX.Element => (
    <Modal
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
        destroyOnClose
        okText="Close"
        {...props}
        title={
            <>
                <CloseCircleOutlined className={styles.icon} size={24} /> {props.title ?? 'Error'}
            </>
        }
    >
        {props.content}
    </Modal>
);

export default ErrorModal;
