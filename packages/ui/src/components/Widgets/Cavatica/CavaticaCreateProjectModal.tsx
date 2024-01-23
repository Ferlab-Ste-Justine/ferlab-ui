import React, { useState } from 'react';
import { Form, Input, Modal, ModalFuncProps, Select } from 'antd';

import Empty from '../../Empty';

import { ICavaticaBillingGroup } from './type';

import styles from './CavaticaCreateProjectModal.module.scss';

enum FORM_FIELDS {
    PROJECT_NAME = 'project_name',
    PROJECT_BILLING_GROUP = 'project_billing_group',
}

export const DEFAULT_CAVATICA_CREATE_PROJECT_MODAL_DICTIONARY: TCavaticaCreateProjectModalDictionary = {
    billingGroup: {
        empty: 'You have no project billing group',
        label: 'Project billing group',
    },
    cancelText: 'Cancel',
    okText: 'Create project',
    projectName: {
        label: 'Project name',
        placeholder: 'e.g. KF-NBL Neuroblastoma Aligned Reads',
    },
    requiredField: 'This field is required',
    title: 'Create project',
};

export type TCavaticaCreateProjectModalDictionary = {
    title: string;
    okText: string;
    cancelText: string;
    requiredField: string;
    projectName: {
        label: string;
        placeholder: string;
    };
    billingGroup: {
        label: string;
        empty: string;
    };
};

export interface ICavaticaCreateProjectModal extends ModalFuncProps {
    dictionary?: TCavaticaCreateProjectModalDictionary;
    handleSubmit: (value: any) => void;
    billingGroups?: {
        data?: ICavaticaBillingGroup[];
        loading: boolean;
    };
}

const CavaticaCreateProjectModal = ({
    dictionary = DEFAULT_CAVATICA_CREATE_PROJECT_MODAL_DICTIONARY,
    handleSubmit,
    billingGroups = {
        loading: true,
    },
    ...rest
}: ICavaticaCreateProjectModal): JSX.Element => {
    const [form] = Form.useForm();
    const [isValid, setIsValid] = useState<boolean>(false);

    const billingGroupsData = billingGroups.data || [];

    return (
        <Modal
            cancelText={dictionary.cancelText}
            destroyOnClose
            okText={dictionary.okText}
            onCancel={() => {
                form.resetFields();
                setIsValid(false);
            }}
            onOk={() => {
                form.submit();
                if (rest.onCancel && isValid) {
                    form.resetFields();
                    rest.onCancel();
                }
            }}
            title={dictionary.title}
            {...rest}
        >
            <Form
                fields={[
                    {
                        name: [FORM_FIELDS.PROJECT_BILLING_GROUP],
                        value: billingGroupsData.length === 1 ? billingGroupsData[0].id : undefined,
                    },
                ]}
                form={form}
                layout="vertical"
                onFieldsChange={(f) => setIsValid(!f.some((item) => item.errors && item.errors.length > 0))}
                onFinish={(values) => {
                    handleSubmit({
                        billing_group: values[FORM_FIELDS.PROJECT_BILLING_GROUP],
                        name: values[FORM_FIELDS.PROJECT_NAME],
                    });
                }}
                validateMessages={{
                    required: dictionary.requiredField,
                }}
            >
                <Form.Item
                    label={dictionary.projectName.label}
                    name={FORM_FIELDS.PROJECT_NAME}
                    required={false}
                    rules={[{ required: true, type: 'string' }]}
                >
                    <Input placeholder={dictionary.projectName.placeholder} />
                </Form.Item>
                <Form.Item
                    className={styles.billingGroupItem}
                    label={dictionary.billingGroup.label}
                    name={FORM_FIELDS.PROJECT_BILLING_GROUP}
                    required={false}
                    rules={[{ required: true, type: 'string' }]}
                >
                    <Select
                        loading={billingGroups.loading}
                        notFoundContent={<Empty description={dictionary.billingGroup.empty} showImage={false} />}
                        placeholder="Select"
                    >
                        {billingGroupsData.map((billingGroup) => (
                            <Select.Option key={billingGroup.id} value={billingGroup.id}>
                                {billingGroup.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CavaticaCreateProjectModal;
