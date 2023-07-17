import React, { useCallback, useContext } from 'react';
import { WarningFilled } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';

import { QueryBuilderContext } from '../../context';

import styles from './QueryBuilderHeaderTools.module.scss';

interface OwnProps {
    visible: boolean;
    onSubmit: (title: string) => void;
    onCancel: () => void;
    okDisabled: boolean;
    initialTitleValue: string;
    isNewFilter: boolean;
}

const DEFAULT_TITLE_MAX_LENGTH = 50;

const EditFilterModal = ({
    initialTitleValue,
    isNewFilter,
    okDisabled,
    onCancel,
    onSubmit,
    visible,
}: OwnProps): JSX.Element => {
    const { dictionary, headerConfig } = useContext(QueryBuilderContext);
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
            cancelText={dictionary.queryBuilderHeader?.modal?.edit?.cancelText || 'Cancel'}
            // className={styles.QBHeditModal}
            okButtonProps={{ disabled: okDisabled }}
            okText={dictionary.queryBuilderHeader?.modal?.edit?.okText || 'Save'}
            onCancel={() => {
                editForm.resetFields();
                onCancel();
            }}
            onOk={() => editForm.submit()}
            open={visible}
            title={dictionary.actions?.saveCustomPill?.title || 'Save this query ABC'}
        >
            <Form
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
                            // className={styles.QBHfilterEditFormItem}
                            label={dictionary.actions?.saveCustomPill?.input?.label || 'Filter name'}
                            name="title"
                            required={false}
                            rules={[
                                {
                                    message: (
                                        <span>
                                            {dictionary.queryBuilderHeader?.form?.error?.fieldRequired ||
                                                'This field is required'}
                                        </span>
                                    ),
                                    required: true,
                                    type: 'string',
                                },
                                {
                                    max: headerConfig.maxNameCapSavedQuery || DEFAULT_TITLE_MAX_LENGTH,
                                    message: (
                                        <span>
                                            <WarningFilled />{' '}
                                            {headerConfig.maxNameCapSavedQuery || DEFAULT_TITLE_MAX_LENGTH}{' '}
                                            {dictionary.queryBuilderHeader?.modal?.edit?.input.maximumLength ||
                                                'characters maximum'}
                                        </span>
                                    ),
                                    required: false,
                                    type: 'string',
                                },
                            ]}
                        >
                            <Input
                                placeholder={
                                    dictionary.queryBuilderHeader?.modal?.edit?.input.placeholder || 'Untitled query'
                                }
                                ref={callbackRef}
                            />
                        </Form.Item>
                    )}
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditFilterModal;
