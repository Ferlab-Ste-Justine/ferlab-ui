import React from 'react';
import { Alert, Button, Switch } from 'antd';
import Modal, { ModalFuncProps } from 'antd/lib/modal/Modal';

import { FENCE_AUTHENTIFICATION_STATUS, IFence, IFenceService } from '.';

import styles from './FencesAuthentificationModal.module.scss';

export const DEFAULT_FENCES_AUTHENTIFICATION_MODAL_DICTIONARY = {
    close: 'close',
    description:
        'Access select NCI and Kids First controlled access data by connecting your account using your NIH login credentials. Please remember that it is your responsibility to follow any data use limitations with controlled access data.',
    error: 'We were unable to establish a connection. Please try again later.',
    title: 'Manage Connections',
};

export type TFencesAuthentificationModalDictionary = {
    title: string;
    close: string;
    description: string;
    error: string;
};

interface IFencesAuthentificationModal extends ModalFuncProps {
    fences: IFence[];
    services: IFenceService[];
    dictionary?: TFencesAuthentificationModalDictionary;
}

const FencesAuthentificationModal = ({
    dictionary = DEFAULT_FENCES_AUTHENTIFICATION_MODAL_DICTIONARY,
    fences,
    onCancel,
    services,
    ...rest
}: IFencesAuthentificationModal): JSX.Element => (
    <Modal
        footer={[
            <Button key="close" onClick={onCancel} type="primary">
                {dictionary.close}
            </Button>,
        ]}
        onCancel={onCancel}
        title={dictionary.title}
        {...rest}
    >
        <>
            <p>{dictionary.description}</p>
            <>
                {services.map(({ fence, icon, name, onConnectToFence, onDisconnectFromFence }) => {
                    const fenceInfo = fences.find((f) => f.id === fence);

                    if (!fenceInfo) {
                        return;
                    }

                    return (
                        <div className={styles.item} key={fenceInfo.id}>
                            <div className={styles.switch}>
                                {icon}
                                <span>{name}</span>
                                <Switch
                                    checked={fenceInfo.status === FENCE_AUTHENTIFICATION_STATUS.connected}
                                    loading={fenceInfo.loading}
                                    onClick={() => {
                                        if (fenceInfo.status === FENCE_AUTHENTIFICATION_STATUS.connected) {
                                            onDisconnectFromFence();
                                            return;
                                        }
                                        onConnectToFence();
                                    }}
                                />
                            </div>
                            {fenceInfo.error && (
                                <Alert className={styles.alert} closable message={dictionary?.error} type="error" />
                            )}
                        </div>
                    );
                })}
            </>
        </>
    </Modal>
);

export default FencesAuthentificationModal;
