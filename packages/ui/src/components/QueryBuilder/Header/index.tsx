import React, { useEffect, useRef, useState } from 'react';
import { Typography, Modal, Input, Space, Button, Tooltip } from 'antd';
import cx from 'classnames';
import isEqual from 'lodash/isEqual';
import CaretRightIcon from '../icons/CaretRightIcon';
import CaretDownIcon from '../icons/CaretDownIcon';
import EditIcon from '../icons/EditIcon';
import StarIcon from '../icons/StarIcon';
import StarFilledIcon from '../icons/StarFilledIcon';
import StackLayout from '../../../layout/StackLayout';
import QueryBuilderHeaderTools from './Tools';
import { IDictionary, IQueryBuilderHeaderConfig, ISavedFilter, TOnSavedFilterChange } from '../types';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilderHeader.module.scss';
import { ISyntheticSqon } from '../../../data/sqon/types';
import { isEmpty } from 'lodash';
import { isNotEmptySqon } from '../../../data/sqon/utils';

interface IQueryBuilderHeaderProps {
    config: IQueryBuilderHeaderConfig;
    collapsed: boolean;
    dictionary: IDictionary;
    toggleQb: (toggle: boolean) => void;
    children: JSX.Element;
    currentQuery: ISyntheticSqon | Record<string, never>;
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
    currentQuery,
    selectedSavedFilter,
    onSavedFilterChange,
}: IQueryBuilderHeaderProps) => {
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [localSelectedSavedFilter, setLocalSelectedSavedFilter] = useState<ISavedFilter | null>(null);
    const [savedFilterTitle, setSavedFilterTitle] = useState('');

    const isNewUnsavedFilter = () => {
        // Newly created filter that was not saved yet (doesn't exist in the list of savedFilters)
        return !selectedSavedFilter && isNotEmptySqon(currentQuery);
    };

    const hasUnsavedChanges = () => {
        // Existing filter that has unsaved changes
        if (selectedSavedFilter && !isEmpty(currentQuery)) {
            const savedFilterSelectedQueries = selectedSavedFilter.filters.filter(
                (filter) => filter.id == currentQuery.id,
            );

            if (savedFilterSelectedQueries.length) {
                const savedFilterSelectedQuery = savedFilterSelectedQueries[0];
                return !isEqual(
                    {
                        op: savedFilterSelectedQuery.op,
                        content: savedFilterSelectedQuery.content,
                        id: savedFilterSelectedQuery.id,
                    },
                    {
                        op: currentQuery.op,
                        content: currentQuery.content,
                        id: currentQuery.id,
                    },
                );
            } else {
                return true;
            }
        }
        return false;
    };

    console.log("Is new : " + isNewUnsavedFilter()) 
    console.log("Has unsaved changes: " + hasUnsavedChanges())

    useEffect(() => {
        setLocalSelectedSavedFilter(selectedSavedFilter!);
        setSavedFilterTitle(selectedSavedFilter?.title!);
    }, [selectedSavedFilter]);

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
                                {localSelectedSavedFilter?.title || config.defaultTitle || 'Untitled Query'}
                            </Title>
                        </div>
                        <div className={cx(styles.QBHActionContainer, styles.QBHOptionsActionsContainer)}>
                            {config.options?.enableEditTitle && (
                                <Button
                                    className={styles.iconBtnAction}
                                    onClick={() => setEditModalVisible(true)}
                                    type="text"
                                >
                                    <EditIcon />
                                </Button>
                            )}
                            <Tooltip
                                title={
                                    localSelectedSavedFilter?.default
                                        ? dictionary.queryBuilderHeader?.tooltips?.setAsDefaultFilter ||
                                          'Set as default filter'
                                        : dictionary.queryBuilderHeader?.tooltips?.usetDefaultFilter ||
                                          'Unset default filter'
                                }
                            >
                                <Button
                                    className={styles.iconBtnAction}
                                    onClick={() => console.log('star')}
                                    type="text"
                                >
                                    {localSelectedSavedFilter?.default ? <StarFilledIcon /> : <StarIcon />}
                                </Button>
                            </Tooltip>
                        </div>
                    </StackLayout>
                    {config.showTools && (
                        <QueryBuilderHeaderTools
                            config={config}
                            dictionary={dictionary}
                            savedFilters={config.savedFilters!}
                            selectedSavedFilter={selectedSavedFilter!}
                            onSavedFilterChange={onSavedFilterChange}
                            isNewUnsavedFilter={isNewUnsavedFilter}
                            hasUnsavedChanges={hasUnsavedChanges}
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
                onOk={(e) => {
                    const newSavedFilter = {
                        ...localSelectedSavedFilter!,
                        title: savedFilterTitle!,
                    };
                    setLocalSelectedSavedFilter(newSavedFilter);
                    setEditModalVisible(false);
                    config.onSaveFilter(newSavedFilter);
                }}
                onCancel={() => setEditModalVisible(false)}
            >
                <Space className={styles.editModalContent} direction="vertical" size={2}>
                    <Space className={styles.labelInput} direction="vertical" size={8}>
                        <Text className={styles.title}>
                            {dictionary.queryBuilderHeader?.modal?.edit?.input.label || 'Query name'}
                        </Text>
                        <Input
                            value={savedFilterTitle}
                            onChange={(e) => {
                                setSavedFilterTitle(e.target.value);
                            }}
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
