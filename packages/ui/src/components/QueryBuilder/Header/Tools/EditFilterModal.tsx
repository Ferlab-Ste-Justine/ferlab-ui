import React, { useCallback, useContext } from 'react';
import { WarningFilled } from '@ant-design/icons';
import { Form, Input, Modal } from 'antd';
import type { Rule } from 'rc-field-form/lib/interface';

import { QueryBuilderContext, QueryCommonContext } from '../../context';

import styles from './QueryBuilderHeaderTools.module.css';

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
    const { headerConfig } = useContext(QueryBuilderContext);
    const { dictionary } = useContext(QueryCommonContext);
    const [editForm] = Form.useForm();

    const callbackRef = useCallback(
        (inputElement: any) => {
            if (inputElement) {
                setTimeout(() => {
                    inputElement.focus();
                }, 10);
            }
        },
        [visible],
    );

    const defaultFormRules: Rule[] = [
        {
            message: (
                <span>{dictionary.queryBuilderHeader?.form?.error?.fieldRequired || 'This field is required'}</span>
            ),
            required: true,
            type: 'string',
        },
        {
            max: headerConfig.maxNameCapSavedQuery || DEFAULT_TITLE_MAX_LENGTH,
            message: (
                <span>
                    <WarningFilled /> {headerConfig.maxNameCapSavedQuery || DEFAULT_TITLE_MAX_LENGTH}{' '}
                    {dictionary.queryBuilderHeader?.modal?.edit?.input.maximumLength || 'characters maximum'}
                </span>
            ),
            required: false,
            type: 'string',
        },
    ];

    const patternFormRule: Rule = {
        message: dictionary.queryBuilderHeader?.form?.pattern?.message || 'Unauthorized characters',
        pattern: new RegExp(dictionary.queryBuilderHeader?.form?.pattern?.regex || '', 'ui'),
        type: 'string',
        validateTrigger: 'onSubmit',
    };

    return (
        <Modal
            cancelText={dictionary.queryBuilderHeader?.modal?.edit?.cancelText || 'Cancel'}
            className={styles.QBHeditModal}
            okButtonProps={{ disabled: okDisabled }}
            okText={dictionary.queryBuilderHeader?.modal?.edit?.okText || 'Save'}
            onCancel={() => {
                editForm.resetFields();
                onCancel();
            }}
            onOk={() => editForm.submit()}
            open={visible}
            title={
                isNewFilter
                    ? dictionary.queryBuilderHeader?.modal?.saveThisFilter || 'Save this filter'
                    : dictionary.queryBuilderHeader?.modal?.edit?.title || 'Edit filter'
            }
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
                            className={styles.QBHfilterEditFormItem}
                            label={dictionary.queryBuilderHeader?.modal?.edit?.input.label || 'Filter name'}
                            name="title"
                            required={false}
                            rules={
                                dictionary.queryBuilderHeader?.form?.pattern
                                    ? [...defaultFormRules, patternFormRule]
                                    : defaultFormRules
                            }
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
