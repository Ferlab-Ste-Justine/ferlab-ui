import React, { useCallback, useContext } from 'react';
import { WarningFilled } from '@ant-design/icons';
import { Form, Input, Modal, Spin, Typography } from 'antd';

import { QueryBuilderContext } from '../../context';
import { ISaveCustomPillResponse } from '../../types';

import styles from './QueryBuilderHeaderTools.module.scss';

interface OwnProps {
    initialTitleValue: string;
    isLoading: boolean;
    saveCustomPillResponse: ISaveCustomPillResponse;
    visible: boolean;
    onCancel: () => void;
    onSubmit: (title: string) => void;
}

const DEFAULT_TITLE_MAX_LENGTH = 50;

const SaveCustomPillModal = ({
    initialTitleValue,
    isLoading,
    onCancel,
    onSubmit,
    saveCustomPillResponse,
    visible,
}: OwnProps): JSX.Element => {
    const { customPillConfig, dictionary } = useContext(QueryBuilderContext);
    const [editForm] = Form.useForm();

    const callbackRef = useCallback(
        (inputElement) => {
            if (inputElement) {
                setTimeout(() => {
                    inputElement.focus();
                }, 10);
            }
        },
        [visible],
    );

    return (
        <Modal
            cancelText={dictionary.actions?.saveCustomPill?.modal?.cancelText || 'Cancel'}
            className={styles.saveCustomPillModal}
            okText={dictionary.actions?.saveCustomPill?.modal?.okText || 'Save'}
            onCancel={() => {
                editForm.resetFields();
                onCancel();
            }}
            onOk={() => editForm.submit()}
            open={visible}
            title={dictionary.actions?.saveCustomPill?.modal?.title || 'Save this query'}
        >
            <Spin spinning={isLoading}>
                <Form
                    className={styles.customPillForm}
                    fields={[
                        {
                            name: ['title'],
                            value: initialTitleValue,
                        },
                    ]}
                    form={editForm}
                    layout="vertical"
                    onFinish={(values) => onSubmit(values.title)}
                >
                    <Form.Item noStyle shouldUpdate>
                        {() => (
                            <Form.Item
                                help={
                                    saveCustomPillResponse.hasError && saveCustomPillResponse.message
                                        ? saveCustomPillResponse.message
                                        : undefined
                                }
                                label={dictionary.actions?.saveCustomPill?.input?.label || 'Query name'}
                                name="title"
                                required={false}
                                rules={[
                                    {
                                        message: (
                                            <span>
                                                {dictionary.actions?.saveCustomPill?.form?.error?.fieldRequired ||
                                                    'This field is required'}
                                            </span>
                                        ),
                                        required: true,
                                        type: 'string',
                                    },
                                    {
                                        max: customPillConfig.maxNameCapSavedQuery || DEFAULT_TITLE_MAX_LENGTH,
                                        message: (
                                            <span>
                                                <WarningFilled />{' '}
                                                {customPillConfig.maxNameCapSavedQuery || DEFAULT_TITLE_MAX_LENGTH}{' '}
                                                {dictionary.actions?.saveCustomPill?.input.maximumLength ||
                                                    'characters maximum'}
                                            </span>
                                        ),
                                        required: false,
                                        type: 'string',
                                    },
                                ]}
                                validateStatus={saveCustomPillResponse.hasError ? 'error' : undefined}
                            >
                                <Input
                                    placeholder={
                                        dictionary.actions?.saveCustomPill?.input.placeholder || 'Untitled query'
                                    }
                                    ref={callbackRef}
                                />
                            </Form.Item>
                        )}
                    </Form.Item>
                </Form>
                {dictionary.actions?.saveCustomPill?.modal?.message && (
                    <Typography.Text className={styles.message}>
                        {dictionary.actions.saveCustomPill.modal.message}
                    </Typography.Text>
                )}
            </Spin>
        </Modal>
    );
};

export default SaveCustomPillModal;
