import React from 'react';
import { WarningFilled } from '@ant-design/icons';
import { ISqonGroupFilter } from '../../data/sqon/types';
import { Alert, Form, Input, Modal, Typography } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ColumnType } from 'antd/lib/table';

import NoSampleModal from './NoSampleModal';
import {
    DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY,
    IRequestBiospecimenDictionary,
    isNameExists,
    IUserSetOutput,
    MAX_TITLE_LENGTH,
} from './requestBiospecimen.utils';
import RequestBiospecimenTable, { IRequestBioDataRow } from './RequestBiospecimenTable';

import styles from './requestBiospecimen.module.scss';

export interface IGetSamples {
    error: any;
    loading: boolean;
    result?: IRequestBioDataRow[];
}

export interface IGetSavedSets {
    isLoading: boolean;
    savedSets: IUserSetOutput[];
}

type RequestBiospecimenModalProps = {
    additionalHandleFinish?: () => void;
    closeModal: () => void;
    createAndFetchReport: (name: string) => void;
    dictionary: IRequestBiospecimenDictionary;
    getDataTypeColumns: () => ColumnType<any>[];
    getSamples: () => IGetSamples;
    getSavedSets: () => IGetSavedSets;
    isOpen: boolean;
    maxTitleLength?: number;
    sqon?: ISqonGroupFilter;
};

const { Text } = Typography;

const RequestBiospecimenModal = ({
    additionalHandleFinish,
    closeModal,
    createAndFetchReport,
    dictionary = DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY,
    getDataTypeColumns,
    getSamples,
    getSavedSets,
    isOpen,
    maxTitleLength = MAX_TITLE_LENGTH,
    sqon,
}: RequestBiospecimenModalProps) => {
    const [editForm] = Form.useForm();
    const { isLoading, savedSets } = getSavedSets();
    const { error, loading, result } = getSamples();
    const samples = (result as IRequestBioDataRow[]) || [];

    const onFinish = async (values: Store) => {
        additionalHandleFinish && additionalHandleFinish();
        const { name } = values;

        if (isNameExists(name, savedSets)) {
            editForm.setFields([
                {
                    name: 'name',
                    errors: [dictionary.modal.nameForm.existingNameError],
                },
            ]);
        } else {
            // set creation and download zip
            createAndFetchReport(name);
            closeModal();
        }
    };

    if (loading) return <></>;

    if (!error && !samples.length)
        return <NoSampleModal closeModal={closeModal} dictionary={dictionary} isOpen={isOpen} />;

    return (
        <Modal
            cancelText={dictionary.modal.cancelText}
            title={dictionary.modal.title}
            open={isOpen}
            onCancel={() => {
                editForm.resetFields();
                closeModal();
            }}
            okButtonProps={{ disabled: isLoading || error, loading: isLoading }}
            okText={dictionary.modal.okText}
            onOk={() => editForm.submit()}
            width={680}
        >
            {error && (
                <Alert
                    type="error"
                    message={<span className={styles.alertTitle}>{dictionary.modal.alert.errorMessage}</span>}
                    description={dictionary.modal.alert.errorDescription}
                />
            )}
            {!error && (
                <div className={styles.modalWrapper}>
                    <div className={styles.description}>
                        <Text>{dictionary.modal.description}</Text>
                    </div>
                    <div className={styles.nameForm}>
                        <Text strong>{dictionary.modal.nameForm.title}</Text>
                        <p className={styles.note}>{dictionary.modal.nameForm.note}</p>
                        <Form
                            fields={[{ name: ['name'], value: '' }]}
                            form={editForm}
                            layout="vertical"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="name"
                                required={false}
                                rules={[
                                    {
                                        type: 'string',
                                        max: maxTitleLength,
                                        message: (
                                            <span>
                                                <WarningFilled /> {maxTitleLength}{' '}
                                                {dictionary.modal.nameForm.maximumLength}
                                            </span>
                                        ),
                                        validateTrigger: 'onSubmit',
                                    },
                                    {
                                        message: dictionary.modal.nameForm.requiredError,
                                        required: true,
                                        type: 'string',
                                        validateTrigger: 'onSubmit',
                                    },
                                ]}
                            >
                                <Input autoFocus placeholder={dictionary.modal.nameForm.placeholder} />
                            </Form.Item>
                        </Form>
                    </div>
                    <RequestBiospecimenTable
                        data={samples}
                        getDataTypeColumns={getDataTypeColumns}
                        loading={loading}
                        sqon={sqon}
                    />
                </div>
            )}
        </Modal>
    );
};

export default RequestBiospecimenModal;
