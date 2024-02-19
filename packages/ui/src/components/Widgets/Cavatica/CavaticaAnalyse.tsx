import React, { useEffect, useState } from 'react';
import { CloudUploadOutlined } from '@ant-design/icons';
import { Button, Modal, Tooltip } from 'antd';
import { BaseButtonProps } from 'antd/lib/button/button';

import CavaticaAnalyseModal, {
    DEFAULT_CAVATICA_ANALYSE_MODAL_DICTIONARY,
    ICavaticaTreeNode,
    TCavaticaAnalyseModalDictionary,
} from './CavaticaAnalyzeModal';
import {
    DEFAULT_CAVATICA_CREATE_PROJECT_MODAL_DICTIONARY,
    ICavaticaCreateProjectModal,
    TCavaticaCreateProjectModalDictionary,
} from './CavaticaCreateProjectModal';
import CavaticaCreateProjectModal from './CavaticaCreateProjectModal';
import {
    CAVATICA_ANALYSE_STATUS,
    IBillingGroups,
    ICavaticaAuthentification,
    ICavaticaBulkImportData,
    ICavaticaProjects,
    PASSPORT_AUTHENTIFICATION_STATUS,
} from './type';

enum ModalState {
    unknow = 'unknow',
    analyse = 'analyse',
    createProject = 'createProject',
    connection_needed = 'connection_needed',
    unauthorized_error = 'unauthorized',
    fetch_project_error = 'fetch_project_error',
    upload_limit_reached_error = 'upload_limit_reached_error',
    generic_error = 'generic_error',
}

export const DEFAULT_CAVATICA_ANALYSE_DICTIONARY: TCavaticaAnalyseDictionary = {
    analyseModal: DEFAULT_CAVATICA_ANALYSE_MODAL_DICTIONARY,
    buttonText: 'Analyze in Cavatica',
    connectionRequiredModal: {
        description:
            'In order to analyze your files you must first connect your Cavatica account. Once you are connected, you will be redirected back to this page.',
        okText: 'Connect',
        title: 'You are not connected to Cavatica',
    },
    createProjectModal: DEFAULT_CAVATICA_CREATE_PROJECT_MODAL_DICTIONARY,
    disabledButtonTooltip: 'You must select at least 1 item',
    fetchErrorModal: {
        description: 'Unable to fetch selected files',
        title: 'Error',
    },
    projectFetchErrorModal: {
        description: 'Unable to fetch your cavatica projects.',
        title: 'Error',
    },
    unauthorizedModal: {
        description: 'You are not authorized to analyze the files you have selected. Learn more about data access.',
        title: 'Unauthorized files',
    },
    uploadLimitReachedModalError: {
        description:
            'You can copy a maximum of <strong>{limit} files</strong> at a time. Please select fewer files and try again.',
        okText: 'OK',
        title: 'Maximum file count exceeded',
    },
};

export type TCavaticaAnalyseDictionary = {
    connectionRequiredModal: {
        title: string;
        description: string;
        okText: string;
    };
    disabledButtonTooltip: string;
    buttonText: string;
    analyseModal: TCavaticaAnalyseModalDictionary;
    createProjectModal: TCavaticaCreateProjectModalDictionary;
    unauthorizedModal: {
        title: string;
        description: string;
    };
    projectFetchErrorModal: {
        title: string;
        description: string;
    };
    fetchErrorModal: {
        title: string;
        description: string;
    };
    uploadLimitReachedModalError: {
        title: string;
        okText: string;
        description: string;
    };
};

export interface ICavaticaAnalyse extends BaseButtonProps {
    handleBeginAnalyse: () => void;
    handleFilesAndFolders: (parentId: string, isProject: boolean) => any;
    handleConnection: () => void;
    setCavaticaBulkImportDataStatus: (status: CAVATICA_ANALYSE_STATUS) => void;
    handleResetErrors: () => void;
    createProjectModalProps: ICavaticaCreateProjectModal;
    handleImportBulkData: (value: ICavaticaTreeNode) => void;
    cavatica: {
        authentification: ICavaticaAuthentification;
        bulkImportData: ICavaticaBulkImportData;
        projects: ICavaticaProjects;
        billingGroups: IBillingGroups;
    };
    dictionary?: TCavaticaAnalyseDictionary;
}

const getErrorModalTileAndDescription = (modalState: ModalState, dictionary: TCavaticaAnalyseDictionary) => {
    switch (modalState) {
        case ModalState.fetch_project_error:
            return {
                content: dictionary.projectFetchErrorModal?.description,
                title: dictionary.projectFetchErrorModal?.title,
            };
        case ModalState.unauthorized_error:
            return {
                content: dictionary.unauthorizedModal?.description,
                title: dictionary.unauthorizedModal?.title,
            };
        case ModalState.upload_limit_reached_error:
            return {
                content: dictionary.uploadLimitReachedModalError?.description,
                title: dictionary.uploadLimitReachedModalError?.title,
            };
        default:
            return undefined;
    }
};

const CavaticaAnalyse = ({
    cavatica,
    createProjectModalProps,
    dictionary = DEFAULT_CAVATICA_ANALYSE_DICTIONARY,
    handleBeginAnalyse,
    handleConnection,
    handleFilesAndFolders,
    handleImportBulkData,
    handleResetErrors,
    setCavaticaBulkImportDataStatus,
    ...rest
}: ICavaticaAnalyse): JSX.Element => {
    const [modalState, setModalState] = useState<ModalState>(ModalState.unknow);

    const onResetModal = () => {
        setModalState(ModalState.unknow);
    };

    useEffect(() => {
        const errorProps = getErrorModalTileAndDescription(modalState, dictionary);
        if (!errorProps) {
            return;
        }
        Modal.error({
            ...errorProps,
            onOk: () => {
                onResetModal();
                handleResetErrors();
            },
        });
    }, [modalState]);

    useEffect(() => {
        if (modalState != ModalState.connection_needed) {
            return;
        }

        Modal.warning({
            content: dictionary?.connectionRequiredModal?.description,
            okText: dictionary.connectionRequiredModal?.okText,
            onCancel: onResetModal,
            onOk: () => handleConnection(),
            title: dictionary?.connectionRequiredModal?.title,
        });
    }, [modalState]);

    useEffect(() => {
        if (cavatica.authentification.status !== PASSPORT_AUTHENTIFICATION_STATUS.connected) {
            if (cavatica.bulkImportData.status === CAVATICA_ANALYSE_STATUS.pending_analyse) {
                setModalState(ModalState.analyse);
            }
            return;
        }

        if (modalState !== ModalState.unknow) {
            setModalState(ModalState.unknow);
            return;
        }
    }, [cavatica.authentification.status]);

    useEffect(() => {
        if (cavatica.bulkImportData.status === CAVATICA_ANALYSE_STATUS.unauthorize) {
            setModalState(ModalState.unauthorized_error);
            return;
        }

        if (cavatica.bulkImportData.status === CAVATICA_ANALYSE_STATUS.upload_limit_reached) {
            setModalState(ModalState.upload_limit_reached_error);
            return;
        }

        if (cavatica.bulkImportData.status === CAVATICA_ANALYSE_STATUS.analyzed) {
            setModalState(ModalState.analyse);
        }
    }, [cavatica.bulkImportData.status]);

    return (
        <>
            <Tooltip title={rest.disabled ? dictionary?.disabledButtonTooltip : undefined}>
                <Button
                    aria-label={dictionary.buttonText}
                    icon={<CloudUploadOutlined />}
                    onClick={() => {
                        if (cavatica.authentification.status === PASSPORT_AUTHENTIFICATION_STATUS.connected) {
                            handleBeginAnalyse();
                            return;
                        }

                        setCavaticaBulkImportDataStatus(CAVATICA_ANALYSE_STATUS.pending_analyse);
                        setModalState(ModalState.connection_needed);
                    }}
                    role="button"
                    {...rest}
                >
                    {dictionary?.buttonText}
                </Button>
            </Tooltip>

            <CavaticaAnalyseModal
                handleCreateProjectClick={() => {
                    setModalState(ModalState.createProject);
                }}
                handleFilesAndFolders={handleFilesAndFolders}
                handleSubmit={(value: ICavaticaTreeNode) => {
                    handleImportBulkData(value);
                    onResetModal();
                }}
                onCancel={onResetModal}
                open={modalState === ModalState.analyse}
                {...cavatica}
            />

            <CavaticaCreateProjectModal
                dictionary={dictionary.createProjectModal}
                handleCloseModal={onResetModal}
                onCancel={() => {
                    setModalState(ModalState.analyse);
                }}
                open={modalState === ModalState.createProject}
                {...createProjectModalProps}
            />
        </>
    );
};

export default CavaticaAnalyse;
