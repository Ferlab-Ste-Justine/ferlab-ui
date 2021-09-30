import React, { useState } from 'react';
import { Typography, Modal, Input, Space } from 'antd';
import CaretRightIcon from '../icons/CaretRightIcon';
import CaretDownIcon from '../icons/CaretDownIcon';
import EditIcon from '../icons/EditIcon';
import StackLayout from '../../../layout/StackLayout';
import QueryBuilderHeaderTools from './Tools';
import { IDictionary, IQueryBuilderHeaderConfig, ISavedFilter } from '../types';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilderHeader.module.scss';

interface IQueryBuilderHeaderProps {
    config: IQueryBuilderHeaderConfig;
    collapsed: boolean;
    dictionary: IDictionary;
    toggleQb: (toggle: boolean) => void;
    children: JSX.Element;
    savedFilters: ISavedFilter[];
}

const { Title } = Typography;
const DEFAULT_TITLE_MAX_LENGTH = 50;

const QueryBuilderHeader = ({
    config,
    collapsed,
    dictionary = {},
    toggleQb,
    children,
    savedFilters,
}: IQueryBuilderHeaderProps) => {
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [savedFiltersLocal, setSavedFiltersLocal] = useState(savedFilters);

    return (
        <div id="query-builder-header-tools">
            <StackLayout vertical className={styles.queryBuilderHeaderContainer}>
                <StackLayout className={`${styles.queryBuilderToggler} ${collapsed && styles.togglerClosed}`}>
                    <StackLayout className={styles.queryBuilderTitleContainer}>
                        <div className={styles.queryBuilderHeaderAction} onClick={() => toggleQb(!collapsed)}>
                            <span className={styles.togglerIcon}>
                                {collapsed ? <CaretRightIcon /> : <CaretDownIcon />}
                            </span>
                            <Title level={1} className={styles.togglerTitle}>
                                {config.defaultTitle || 'Untitled Query'}
                            </Title>
                        </div>

                        {config.options?.enableEditTitle && (
                            <div
                                className={`${styles.queryBuilderHeaderAction} ${styles.editTitleAction}`}
                                onClick={() => setEditModalVisible(true)}
                            >
                                <EditIcon />
                            </div>
                        )}
                    </StackLayout>
                    {config.showTools && <QueryBuilderHeaderTools config={config} dictionary={dictionary} />}
                </StackLayout>
                {!collapsed && children}
            </StackLayout>
            <Modal
                className={styles.editModal}
                visible={isEditModalVisible}
                title={dictionary.queryBuilderHeader?.modal?.edit?.title || 'Save this query'}
                okText={dictionary.queryBuilderHeader?.modal?.edit?.okText || 'Save'}
                cancelText={dictionary.queryBuilderHeader?.modal?.edit?.cancelText || 'Cancel'}
                onOk={() => {}}
                onCancel={() => setEditModalVisible(false)}
            >
                <Space className={styles.editModalContent} direction="vertical" size={2}>
                    <Space className={styles.labelInput} direction="vertical" size={8}>
                        <span className={styles.title}>
                            {dictionary.queryBuilderHeader?.modal?.edit?.input.label || 'Query name'}
                        </span>
                        <Input
                            placeholder={
                                dictionary.queryBuilderHeader?.modal?.edit?.input.placeholder || 'Untitled query'
                            }
                            maxLength={config.titleMaxLength || DEFAULT_TITLE_MAX_LENGTH}
                        ></Input>
                    </Space>
                    <span className={styles.subtitle}>{`${config.titleMaxLength || DEFAULT_TITLE_MAX_LENGTH} ${
                        dictionary.queryBuilderHeader?.modal?.edit?.input.maximumLength || 'characters maximum'
                    }`}</span>
                </Space>
            </Modal>
        </div>
    );
};

export default QueryBuilderHeader;
