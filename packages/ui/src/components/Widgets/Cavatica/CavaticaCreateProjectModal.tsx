import React, { useEffect, useState } from 'react';
import { Form, Input, Modal, ModalFuncProps, Select, Typography } from 'antd';

import Empty from '../../Empty';
import ExternalLink from '../../ExternalLink';

import { IBillingGroups, ICavaticaProjects } from './type';
import { CAVATICA_API_ERROR_TYPE } from '.';

import styles from './CavaticaCreateProjectModal.module.css';

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
    error: {
        billingGroups: {
            subtitle: 'Unable to fetch your cavatica billing groups.',
            title: 'Error',
        },
        contactSupport:
            'We are currently unable to connect to this service. Please refresh the page and try again. If the problem persists, please contact support.',
        create: {
            subtitle: 'Unable to create your cavatica projects.',
            title: 'Error',
        },
        email: '',
    },
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
    error: {
        billingGroups: {
            title: string;
            subtitle: string;
        };
        create: {
            title: string;
            subtitle: string;
        };
        contactSupport: string;
        email: string;
    };
};

export interface ICavaticaCreateProjectModal extends ModalFuncProps {
    dictionary?: TCavaticaCreateProjectModalDictionary;
    handleSubmit: (value: any) => void;
    fetchBillingGroups: () => void;
    fetchProjects: () => void;
    handleErrorModalReset: () => void;
    handleCloseModal?: () => void;
    cavatica: {
        projects: ICavaticaProjects;
        billingGroups: IBillingGroups;
    };
}

const CavaticaCreateProjectModal = ({
    cavatica,
    dictionary = DEFAULT_CAVATICA_CREATE_PROJECT_MODAL_DICTIONARY,
    fetchBillingGroups,
    fetchProjects,
    handleCloseModal,
    handleErrorModalReset,
    handleSubmit,
    ...rest
}: ICavaticaCreateProjectModal): JSX.Element => {
    const [form] = Form.useForm();
    const [isValid, setIsValid] = useState<boolean>(false);
    const { billingGroups, projects } = cavatica;

    const billingGroupsData = billingGroups.data || [];

    useEffect(() => {
        if (projects.error === CAVATICA_API_ERROR_TYPE.create) {
            Modal.error({
                content: (
                    <>
                        <span className={styles.modalSubtitle}>{dictionary.error.create.subtitle}</span>
                        <ExternalLink href={`mailto:${dictionary.error.email}`}>
                            <Typography.Text>{dictionary.error.contactSupport}</Typography.Text>
                        </ExternalLink>
                    </>
                ),
                onOk: handleErrorModalReset,
                title: dictionary.error.create.title,
            });
            return;
        }

        if (!rest.open) {
            return;
        }

        if (billingGroups.error) {
            Modal.error({
                content: (
                    <>
                        <span className={styles.modalSubtitle}>{dictionary.error.billingGroups.subtitle}</span>
                        <ExternalLink href={`mailto:${dictionary.error.email}`}>
                            <Typography.Text>{dictionary.error.contactSupport}</Typography.Text>
                        </ExternalLink>
                    </>
                ),
                onOk: () => {
                    if (handleCloseModal) {
                        handleCloseModal();
                    }
                    handleErrorModalReset();
                },
                title: dictionary.error.billingGroups.title,
            });
            return;
        }

        fetchBillingGroups();
        fetchProjects();
    }, [rest.open, billingGroups.error, projects.error]);

    return (
        <Modal
            cancelText={dictionary.cancelText}
            destroyOnClose
            okButtonProps={{ disabled: !isValid }}
            okText={dictionary.okText}
            onCancel={() => {
                form.resetFields();
                setIsValid(false);
            }}
            onOk={() => {
                form.submit();
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

                    if (rest.onCancel && isValid) {
                        form.resetFields();
                        rest.onCancel();
                    }
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
