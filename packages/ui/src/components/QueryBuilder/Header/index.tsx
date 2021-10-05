import React, { useEffect, useState } from 'react';
import { Typography, Modal, Input, Space, Button, Tooltip } from 'antd';
import cx from 'classnames';
import { v4 } from 'uuid';
import isEqual from 'lodash/isEqual';
import CaretRightIcon from '../icons/CaretRightIcon';
import CaretDownIcon from '../icons/CaretDownIcon';
import EditIcon from '../icons/EditIcon';
import StarIcon from '../icons/StarIcon';
import StarFilledIcon from '../icons/StarFilledIcon';
import StackLayout from '../../../layout/StackLayout';
import QueryBuilderHeaderTools from './Tools';
import { IDictionary, IQueriesState, IQueryBuilderHeaderConfig, ISavedFilter, TOnSavedFilterChange } from '../types';
import { isNotEmptySqon } from '../../../data/sqon/utils';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilderHeader.module.scss';

interface IQueryBuilderHeaderProps {
    config: IQueryBuilderHeaderConfig;
    collapsed: boolean;
    dictionary: IDictionary;
    toggleQb: (toggle: boolean) => void;
    children: JSX.Element;
    selectedSavedFilter?: ISavedFilter;
    onSavedFilterChange: TOnSavedFilterChange;
    queriesState: IQueriesState;
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
    queriesState,
}: IQueryBuilderHeaderProps) => {
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [localSelectedSavedFilter, setLocalSelectedSavedFilter] = useState<ISavedFilter | null>(null);
    const [savedFilterTitle, setSavedFilterTitle] = useState('');

    const isNewUnsavedFilter = () => {
        // Newly created filter that was not saved yet (doesn't exist in the list of savedFilters)
        return !selectedSavedFilter && queriesState.queries.filter((sqon) => isNotEmptySqon(sqon)).length > 0;
    };

    const hasUnsavedChanges = () => {
        // Existing filter that has unsaved changes
        if (selectedSavedFilter) {
            if (selectedSavedFilter.filters.length != queriesState.queries.length) return true;

            let areEqual = true;
            for (let savedFilterQuery of selectedSavedFilter.filters) {
                const foundQuery = queriesState.queries.find(
                    (queryStateQuery) => queryStateQuery.id == savedFilterQuery.id,
                );

                if (!foundQuery) {
                    areEqual = false;
                    break;
                }

                areEqual &&= isEqual(
                    {
                        id: foundQuery?.id,
                        op: foundQuery?.op,
                        content: foundQuery?.content,
                    },
                    {
                        id: savedFilterQuery?.id,
                        op: savedFilterQuery?.op,
                        content: savedFilterQuery?.content,
                    },
                );
            }

            return !areEqual;
        }

        return false;
    };

    const onSaveFilter = () => {
        const newSavedFilter = {
            id: selectedSavedFilter?.id || v4(),
            title: savedFilterTitle || selectedSavedFilter?.title!,
            default: selectedSavedFilter?.default || false,
            filters: queriesState.queries,
        };
        setLocalSelectedSavedFilter(newSavedFilter);
        config.onSaveFilter(newSavedFilter);
    };

    useEffect(() => {
        setLocalSelectedSavedFilter(selectedSavedFilter!);
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
                            config={{
                                ...config,
                                onSaveFilter: onSaveFilter,
                            }}
                            dictionary={dictionary}
                            savedFilters={config.savedFilters!}
                            selectedSavedFilter={selectedSavedFilter!}
                            onSavedFilterChange={onSavedFilterChange}
                            isNewUnsavedFilter={isNewUnsavedFilter}
                            hasUnsavedChanges={hasUnsavedChanges}
                            onNewSavedFilter={() => {
                                console.log('TODO: Create new saved filter');
                            }}
                            onDuplicateSavedFilter={() => {
                                console.log('TODO: Duplicate saved filter');
                            }}
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
                    setEditModalVisible(false);
                    onSaveFilter();
                }}
                onCancel={() => setEditModalVisible(false)}
            >
                <Space className={styles.editModalContent} direction="vertical" size={2}>
                    <Space className={styles.labelInput} direction="vertical" size={8}>
                        <Text className={styles.title}>
                            {dictionary.queryBuilderHeader?.modal?.edit?.input.label || 'Query name'}
                        </Text>
                        <Input
                            value={savedFilterTitle || selectedSavedFilter?.title!}
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
