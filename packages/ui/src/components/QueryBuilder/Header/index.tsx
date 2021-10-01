import React, { useState } from 'react';
import { Typography, Modal, Input, Space, Button } from 'antd';
import cx from 'classnames';
import CaretRightIcon from '../icons/CaretRightIcon';
import CaretDownIcon from '../icons/CaretDownIcon';
import EditIcon from '../icons/EditIcon';
import StarIcon from '../icons/StarIcon';
import StackLayout from '../../../layout/StackLayout';
import QueryBuilderHeaderTools from './Tools';
import { IDictionary, IQueryBuilderHeaderConfig, ISavedFilter, TOnSavedFilterChange } from '../types';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilderHeader.module.scss';

interface IQueryBuilderHeaderProps {
    config: IQueryBuilderHeaderConfig;
    collapsed: boolean;
    dictionary: IDictionary;
    toggleQb: (toggle: boolean) => void;
    children: JSX.Element;
    selectedSavedFilter?: ISavedFilter;
    onSavedFilterChange: TOnSavedFilterChange;
}

const { Title, Text } = Typography;
const DEFAULT_TITLE_MAX_LENGTH = 50;

const QueryBuilderHeader = ({
    config,
    collapsed,
    dictionary = {},
    toggleQb,
    children,
    selectedSavedFilter,
    onSavedFilterChange,
}: IQueryBuilderHeaderProps) => {
    const [isEditModalVisible, setEditModalVisible] = useState(false);

    return (
        <div id="query-builder-header-tools">
            <StackLayout vertical className={styles.QBHContainer}>
                <StackLayout className={`${styles.QBToggler} ${collapsed && styles.togglerClosed}`}>
                    <StackLayout className={styles.QBTitleContainer}>
                        <div className={styles.QBHActionContainer} onClick={() => toggleQb(!collapsed)}>
                            <span className={styles.togglerIcon}>
                                {collapsed ? <CaretRightIcon /> : <CaretDownIcon />}
                            </span>
                            <Title level={1} className={styles.togglerTitle}>
                                {selectedSavedFilter?.title || config.defaultTitle || 'Untitled Query'}
                            </Title>
                        </div>
                        <div className={cx(styles.QBHActionContainer, styles.QBHOptionsActionsContainer)}>
                            {config.options?.enableEditTitle && (
                                <Button
                                    className={styles.iconAction}
                                    onClick={() => setEditModalVisible(true)}
                                    type="text"
                                >
                                    <EditIcon />
                                </Button>
                            )}
                            <Button className={styles.iconAction} onClick={() => console.log('star')} type="text">
                                <StarIcon />
                            </Button>
                        </div>
                    </StackLayout>
                    {config.showTools && (
                        <QueryBuilderHeaderTools
                            config={config}
                            savedFilters={config.savedFilters!}
                            selectedSavedFilter={selectedSavedFilter!}
                            onSavedFilterChange={onSavedFilterChange}
                            dictionary={dictionary}
                        />
                    )}
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
                        <Text className={styles.title}>
                            {dictionary.queryBuilderHeader?.modal?.edit?.input.label || 'Query name'}
                        </Text>
                        <Input
                            value={selectedSavedFilter?.title}
                            placeholder={
                                dictionary.queryBuilderHeader?.modal?.edit?.input.placeholder || 'Untitled query'
                            }
                            maxLength={config.titleMaxLength || DEFAULT_TITLE_MAX_LENGTH}
                        ></Input>
                    </Space>
                    <Text>{`${config.titleMaxLength || DEFAULT_TITLE_MAX_LENGTH} ${
                        dictionary.queryBuilderHeader?.modal?.edit?.input.maximumLength || 'characters maximum'
                    }`}</Text>
                </Space>
            </Modal>
        </div>
    );
};

export default QueryBuilderHeader;
