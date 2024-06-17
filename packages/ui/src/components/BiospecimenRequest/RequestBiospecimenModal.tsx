import React, { ReactElement } from 'react';
import { WarningFilled } from '@ant-design/icons';
import { Alert, Form, Input, Modal, Skeleton, Space, Typography } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ColumnType } from 'antd/lib/table';

import { ISqonGroupFilter } from '../../data/sqon/types';

import {
    BIOSPECIMENT_REQUEST_MAX_TITLE_LENGTH,
    DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY,
    IRequestBiospecimenDictionary,
    isNameExists,
    IUserSetOutput,
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
    columns: ColumnType<any>[];
    createAndFetchReport: (name: string) => void;
    dictionary: IRequestBiospecimenDictionary;
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
    columns,
    createAndFetchReport,
    dictionary = DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY,
    getSamples,
    getSavedSets,
    isOpen,
    maxTitleLength = BIOSPECIMENT_REQUEST_MAX_TITLE_LENGTH,
    sqon,
}: RequestBiospecimenModalProps): ReactElement => {
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
                    errors: [dictionary.modal.nameForm.existingNameError],
                    name: 'name',
                },
            ]);
            return;
        } else {
            // set creation and download zip
            createAndFetchReport(name);
            closeModal();
        }
    };

    return (
        <Modal
            cancelButtonProps={{ hidden: !samples.length }}
            cancelText={dictionary.modal.cancelText}
            okButtonProps={{ disabled: isLoading || loading || error, loading: isLoading }}
            okText={samples.length ? dictionary.modal.okText : dictionary.modal.closeText}
            onCancel={() => {
                editForm.resetFields();
                closeModal();
            }}
            onOk={() => {
                samples.length ? editForm.submit() : closeModal();
            }}
            open={isOpen}
            title={dictionary.modal.title}
            width={680}
        >
            {loading && <Skeleton active paragraph={{ rows: 2 }} />}
            {/* No Sample */}
            {!loading && !error && !samples.length && (
                <Alert
                    description={dictionary.modal.alert.infoDescription}
                    message={<span className={styles.alertTitle}>{dictionary.modal.alert.infoMessage}</span>}
                    type="info"
                />
            )}
            {/* Error */}
            {!loading && error && (
                <Alert
                    description={dictionary.modal.alert.errorDescription}
                    message={<span className={styles.alertTitle}>{dictionary.modal.alert.errorMessage}</span>}
                    type="error"
                />
            )}
            {/* Available sample */}
            {!loading && !error && samples.length > 0 && (
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
                                        max: maxTitleLength,
                                        message: (
                                            <span>
                                                <WarningFilled /> {maxTitleLength}{' '}
                                                {dictionary.modal.nameForm.maximumLength}
                                            </span>
                                        ),
                                        type: 'string',
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
                    <RequestBiospecimenTable columns={columns} data={samples} loading={loading} sqon={sqon} />
                </div>
            )}
        </Modal>
    );
};

export default RequestBiospecimenModal;
