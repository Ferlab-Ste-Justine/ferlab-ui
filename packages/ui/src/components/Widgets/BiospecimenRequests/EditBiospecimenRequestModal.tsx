import React, { useState } from 'react';
import { WarningFilled } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';
import { Store } from 'antd/lib/form/interface';

import { BIOSPECIMENT_REQUEST_MAX_TITLE_LENGTH, isNameExists } from './utils';
import { TBiospecimenRequests } from '.';

import styles from './EditBiospecimenRequestModal.module.scss';

export const DEFAULT_EDIT_BIOSPECIMENT_REQUEST_MODAL = {
    errors: {
        duplicateName: 'A biospecimen request with this name already exists.',
        maximumLength: 'characters maximum',
        required: 'You must provide a name for this request.',
    },
    inputLabel: 'Name',
    modal: {
        cancelText: 'Cancel',
        okText: 'Save',
        title: 'Save this bisopecimen request',
    },
    placeholder: 'Biospecimen request name',
};

export type TEditBiospecimenRequestModalDictionary = {
    inputLabel: string;
    modal: {
        okText: string;
        cancelText: string;
        title: string;
    };
    placeholder: string;
    errors: {
        duplicateName: string;
        required: string;
        maximumLength: string;
    };
};

type TBiospecimenRequestModal = {
    biospecimenRequest?: TBiospecimenRequests;
    handleSubmit: (id: string, name: string, callback: () => void) => void;
    handleClose: () => void;
    open: boolean;
    savedSets: TBiospecimenRequests[];
    dictionary?: TEditBiospecimenRequestModalDictionary;
};

const EditBiospecimenRequestModal = ({
    biospecimenRequest,
    dictionary = DEFAULT_EDIT_BIOSPECIMENT_REQUEST_MODAL,
    handleClose,
    handleSubmit,
    open,
    savedSets,
}: TBiospecimenRequestModal): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const [editForm] = Form.useForm();

    const onFinish = async (values: Store) => {
        const { name } = values;
        if (isNameExists(name, savedSets)) {
            editForm.setFields([
                {
                    errors: [dictionary.errors.duplicateName],
                    name: 'name',
                },
            ]);
            return;
        }

        setLoading(true);
        handleSubmit(biospecimenRequest?.id ?? '', name, () => {
            setLoading(false);
            handleClose();
        });
    };

    return (
        <Modal
            afterClose={() => {
                editForm.resetFields();
            }}
            {...dictionary.modal}
            okButtonProps={{
                loading: loading,
            }}
            onCancel={() => {
                handleClose();
            }}
            onOk={() => editForm.submit()}
            open={open}
        >
            <div className={styles.modalWrapper}>
                <Form
                    fields={[
                        {
                            name: ['name'],
                            value: biospecimenRequest?.tag,
                        },
                    ]}
                    form={editForm}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        className={styles.formItem}
                        label={dictionary.inputLabel}
                        name="name"
                        required={false}
                        rules={[
                            {
                                max: BIOSPECIMENT_REQUEST_MAX_TITLE_LENGTH,
                                message: (
                                    <span>
                                        <WarningFilled /> {BIOSPECIMENT_REQUEST_MAX_TITLE_LENGTH}{' '}
                                        {dictionary.errors.maximumLength}
                                    </span>
                                ),
                                type: 'string',
                                validateTrigger: 'onSubmit',
                            },
                            {
                                message: dictionary.errors.required,
                                required: true,
                                type: 'string',
                                validateTrigger: 'onSubmit',
                            },
                        ]}
                    >
                        <Input autoFocus placeholder={dictionary.placeholder} />
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default EditBiospecimenRequestModal;
