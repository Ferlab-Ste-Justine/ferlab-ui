import React, { useEffect, useState } from 'react';
import { Typography, Modal, Input, Space, Button, Tooltip } from 'antd';
import cx from 'classnames';
import { v4 } from 'uuid';
import CaretRightIcon from '../icons/CaretRightIcon';
import CaretDownIcon from '../icons/CaretDownIcon';
import EditIcon from '../icons/EditIcon';
import StarIcon from '../icons/StarIcon';
import StarFilledIcon from '../icons/StarFilledIcon';
import StackLayout from '../../../layout/StackLayout';
import QueryBuilderHeaderTools from './Tools';
import { IDictionary, IQueriesState, IQueryBuilderHeaderConfig, ISavedFilter, TOnSavedFilterChange } from '../types';
import { getDefaultSyntheticSqon } from '../../../data/sqon/utils';

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
    resetQueriesState: (id: string) => void;
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
    resetQueriesState,
}: IQueryBuilderHeaderProps) => {
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [localSelectedSavedFilter, setLocalSelectedSavedFilter] = useState<ISavedFilter | null>(null);
    const [savedFilterTitle, setSavedFilterTitle] = useState('');

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
                            queriesState={queriesState}
                            onSavedFilterChange={onSavedFilterChange}
                            onNewSavedFilter={() => {
                                const defaultQueryId = v4();
                                resetQueriesState(defaultQueryId);
                                onSavedFilterChange({
                                    id: v4(),
                                    title: '',
                                    default: false,
                                    filters: [getDefaultSyntheticSqon(defaultQueryId)],
                                });
                            }}
                            onDuplicateSavedFilter={() => {
                                onSavedFilterChange({
                                    id: v4(),
                                    title: `${selectedSavedFilter?.title!} COPY`,
                                    default: false,
                                    filters: [...queriesState.queries],
                                });
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
