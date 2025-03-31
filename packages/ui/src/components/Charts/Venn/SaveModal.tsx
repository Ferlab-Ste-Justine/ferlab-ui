import React, { useState } from 'react';
import { InfoCircleOutlined, WarningFilled } from '@ant-design/icons';
import { Checkbox, Form, Input, Modal, Space, Tooltip } from 'antd';

import { IUserSetOutput } from '../../BiospecimenRequest/requestBiospecimen.utils';

import { ISetOperation, THandleSubmit, TVennChartSaveDictionary } from './utils';

import styles from './index.module.css';

export const MAX_TITLE_LENGTH = 200;
const FORM_NAME = 'save-set';
const SET_NAME_KEY = 'nameSet';
const PERSISTENT_KEY = 'persistent';

type SaveModalProps = {
    dictionary: TVennChartSaveDictionary;
    entity: string;
    handleClose?: () => void;
    handleSubmit: (props: THandleSubmit) => void;
    isOpen: boolean;
    savedSets: IUserSetOutput[];
    selectedSets: ISetOperation[];
    setOpen: (isOpen: boolean) => void;
    setSelectedSets: (sets: ISetOperation[]) => void;
    viewSetAnalytics: () => void;
};

const SaveModal = ({
    dictionary,
    entity,
    handleClose,
    handleSubmit,
    isOpen,
    savedSets,
    selectedSets,
    setOpen,
    setSelectedSets,
    viewSetAnalytics,
}: SaveModalProps): JSX.Element => {
    const [form] = Form.useForm();
    const [isSaving, setIsSaving] = useState<boolean>(false);

    return (
        <Modal
            afterClose={() => {
                form.resetFields();
                setIsSaving(false);
            }}
            cancelText={dictionary.cancel}
            destroyOnClose
            okButtonProps={{
                loading: isSaving,
            }}
            okText={dictionary.ok}
            onCancel={() => {
                setSelectedSets([]);
                setOpen(false);
            }}
            onOk={() => {
                form.submit();
            }}
            open={isOpen}
            style={{ top: 200 }}
            title={dictionary.title}
        >
            <Form
                className={styles.saveForm}
                disabled={isSaving}
                fields={[
                    {
                        name: [SET_NAME_KEY],
                        value: form.getFieldValue(SET_NAME_KEY) ?? dictionary.nameTemplate,
                    },
                ]}
                form={form}
                layout="vertical"
                name={FORM_NAME}
                onFinish={(values) => {
                    const existingTagNames = savedSets.filter((s) => !s.is_invisible).map((s) => s.tag);
                    if (values[PERSISTENT_KEY]) {
                        if (existingTagNames.includes(values[SET_NAME_KEY])) {
                            form.setFields([
                                {
                                    errors: [dictionary.alreadyExist],
                                    name: SET_NAME_KEY,
                                },
                            ]);
                            return;
                        }
                    }

                    viewSetAnalytics();
                    handleSubmit({
                        callback: handleClose || (() => undefined),
                        index: entity,
                        invisible: values[PERSISTENT_KEY] !== true,
                        name: values[SET_NAME_KEY],
                        sets: selectedSets,
                    });
                    setIsSaving(true);
                }}
            >
                <div className={styles.saveDescription}>
                    {dictionary.getEntityText(
                        entity,
                        selectedSets.reduce((count, set) => count + set.entityCount, 0),
                    )}
                </div>
                <Form.Item
                    className={styles.filterEditFormItem}
                    label={dictionary.label}
                    name={SET_NAME_KEY}
                    required={false}
                    rules={[
                        {
                            max: MAX_TITLE_LENGTH,
                            message: (
                                <span>
                                    <WarningFilled /> {MAX_TITLE_LENGTH} {dictionary.maximumLength}
                                </span>
                            ),
                            type: 'string',
                        },
                        {
                            message: dictionary.permittedCharacters,
                            pattern: new RegExp(/^[a-zA-Z0-9 ()[\]\-_:|.,]+$/i),
                            type: 'string',
                        },
                        {
                            message: dictionary.requiredField,
                            required: true,
                            type: 'string',
                            validateTrigger: 'onSubmit',
                        },
                    ]}
                >
                    <Input autoFocus placeholder={dictionary.nameTemplate} value={dictionary.nameTemplate} />
                </Form.Item>
                <Form.Item name={PERSISTENT_KEY} valuePropName="checked">
                    <Checkbox>
                        <Space size={8}>
                            {dictionary.checkbox.label}
                            <Tooltip title={dictionary.checkbox.tooltips}>
                                <InfoCircleOutlined />
                            </Tooltip>
                        </Space>
                    </Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default SaveModal;
