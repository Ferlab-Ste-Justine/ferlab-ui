import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import {
    CopyOutlined,
    DeleteOutlined,
    DownOutlined,
    ExclamationCircleOutlined,
    FolderOutlined,
    PlusOutlined,
    SaveOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { Button, Modal, Space, Tooltip } from 'antd';
import cx from 'classnames';

import ConditionalWrapper from '../../../utils/ConditionalWrapper';
import { QueryBuilderContext, QueryCommonContext } from '../../context';
import { IQueryBuilderHeaderConfig, ISavedFilter, TOnSavedFilterChange } from '../../types';
import { hasQueries, hasUnsavedChanges, isNewUnsavedFilter } from '../utils';

import SavedFiltersMenu from './SavedFiltersMenu';
import { deleteFilterConfirm } from './utils';

import styles from './QueryBuilderHeaderTools.module.scss';

interface IQueryBuilderHeaderProps {
    config: IQueryBuilderHeaderConfig;
    savedFilters: ISavedFilter[];
    onSavedFilterChange: TOnSavedFilterChange;
    onNewSavedFilter: () => void;
    onDuplicateSavedFilter: () => void;
}

const tooltipAlign = { align: { offset: [0, 5] } };

const QueryBuilderHeaderTools = ({
    config,
    onDuplicateSavedFilter,
    onNewSavedFilter,
    onSavedFilterChange,
    savedFilters = [],
}: IQueryBuilderHeaderProps): JSX.Element => {
    const { queriesState, selectedSavedFilter } = useContext(QueryBuilderContext);
    const { dictionary } = useContext(QueryCommonContext);
    const [isDirty, setIsDirty] = useState(false);
    const [isNewFilter, setIsNewFilter] = useState(false);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

    const confirmUnsavedChangeForNewFilter = (onOkCallback: () => void) =>
        Modal.confirm({
            cancelText: dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.createNewFilter?.cancelText || 'Cancel',
            content:
                dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.createNewFilter?.content ||
                'You are about to create a new filter; all modifications will be lost.',
            icon: <ExclamationCircleOutlined />,
            okText: dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.createNewFilter?.okText || 'Create',
            onOk: () => onOkCallback(),
            title: dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.title || 'Unsaved changes',
        });

    useEffect(() => {
        const isDirty = hasUnsavedChanges(selectedSavedFilter!, config.savedFilters!, queriesState);
        const isNew = isNewUnsavedFilter(selectedSavedFilter!, config.savedFilters!);
        const hasQueriesBool = hasQueries(queriesState);

        if (isNew) {
            setIsDirty(false);
            setIsNewFilter(true);
            setIsSaveButtonDisabled(!hasQueriesBool);
        } else {
            setIsDirty(isDirty);
            setIsNewFilter(false);
            setIsSaveButtonDisabled(!isDirty);
        }
    }, [JSON.stringify(queriesState), JSON.stringify(selectedSavedFilter), JSON.stringify(config.savedFilters)]);

    return (
        <Space className={styles.queryBuilderHeaderTools} onClick={(e) => e.stopPropagation()} size={20}>
            <Space align="center" className={styles.toolsContainer}>
                <Tooltip
                    title={dictionary.queryBuilderHeader?.tooltips?.newQueryBuilder || 'New query builder'}
                    {...tooltipAlign}
                >
                    <Button
                        className={styles.queryBuilderHeaderActionIconBtn}
                        disabled={isNewFilter}
                        icon={<PlusOutlined />}
                        id="QBH_newFilter"
                        onClick={() => {
                            if (isDirty) {
                                confirmUnsavedChangeForNewFilter(onNewSavedFilter);
                            } else {
                                onNewSavedFilter();
                            }
                        }}
                        size="small"
                        type="text"
                    />
                </Tooltip>
                <Tooltip
                    title={
                        isDirty
                            ? dictionary.queryBuilderHeader?.tooltips?.saveChanges || 'Save changes'
                            : dictionary.queryBuilderHeader?.tooltips?.save || 'Save filter'
                    }
                    {...tooltipAlign}
                >
                    <Button
                        className={cx(styles.queryBuilderHeaderActionIconBtn, isDirty ? styles.dirty : '')}
                        disabled={isSaveButtonDisabled}
                        icon={<SaveOutlined />}
                        id="QBH_saveFilter"
                        onClick={() => {
                            if (isDirty) {
                                if (config.onUpdateFilter) {
                                    config.onUpdateFilter(selectedSavedFilter!);
                                }
                            } else if (config?.onSaveFilter) {
                                config.onSaveFilter(selectedSavedFilter!);
                            }
                        }}
                        size="small"
                        type="text"
                    />
                </Tooltip>
                {config.options?.enableDuplicate && (
                    <Tooltip
                        title={
                            dictionary.queryBuilderHeader?.tooltips?.duplicateQueryBuilder || 'Duplicate query builder'
                        }
                        {...tooltipAlign}
                    >
                        <Button
                            className={styles.queryBuilderHeaderActionIconBtn}
                            disabled={isNewFilter}
                            icon={<CopyOutlined />}
                            id="QBH_copyFilter"
                            onClick={() => {
                                if (isDirty) {
                                    confirmUnsavedChangeForNewFilter(onDuplicateSavedFilter);
                                } else {
                                    onDuplicateSavedFilter();
                                }
                            }}
                            size="small"
                            type="text"
                        />
                    </Tooltip>
                )}
                <Tooltip title={dictionary.queryBuilderHeader?.tooltips?.delete || 'Delete filter'} {...tooltipAlign}>
                    <Button
                        className={styles.queryBuilderHeaderActionIconBtn}
                        disabled={isNewFilter}
                        icon={<DeleteOutlined />}
                        id="QBH_deleteFilter"
                        onClick={() =>
                            deleteFilterConfirm({
                                dictionary,
                                onDeleteFilter: config.onDeleteFilter,
                                savedFilter: selectedSavedFilter!,
                            })
                        }
                        size="small"
                        type="text"
                    />
                </Tooltip>
                {config.options?.enableShare && (
                    <Tooltip
                        title={dictionary.queryBuilderHeader?.tooltips?.share || 'Share (Copy url)'}
                        {...tooltipAlign}
                    >
                        <Button
                            className={styles.queryBuilderHeaderActionIconBtn}
                            disabled={isNewFilter || isDirty}
                            icon={<ShareAltOutlined />}
                            id="QBH_shareFilter"
                            onClick={() => {
                                if (config.onShareFilter) {
                                    config.onShareFilter(selectedSavedFilter!);
                                }
                            }}
                            size="small"
                            type="text"
                        />
                    </Tooltip>
                )}
            </Space>
            <div className={styles.extra}>
                <ConditionalWrapper
                    condition={true}
                    wrapper={(children: JSX.Element) => {
                        if (savedFilters.length > 0) {
                            return (
                                <SavedFiltersMenu
                                    isDirty={isDirty}
                                    onDeleteFilter={config.onDeleteFilter}
                                    onSavedFilterChange={onSavedFilterChange}
                                    onUpdateFilter={config.onUpdateFilterModal}
                                    savedFilters={savedFilters}
                                    selectedKey={selectedSavedFilter ? selectedSavedFilter.id : ''}
                                >
                                    {children}
                                </SavedFiltersMenu>
                            );
                        }

                        return (
                            <Tooltip
                                title={
                                    dictionary.queryBuilderHeader?.tooltips?.noSavedFilters ||
                                    'You have no saved filters'
                                }
                            >
                                {children}
                            </Tooltip>
                        );
                    }}
                >
                    <Button
                        className={styles.queryBuilderHeaderDdb}
                        disabled={savedFilters.length == 0}
                        icon={<FolderOutlined />}
                        onClick={(e) => e.stopPropagation()}
                        size="small"
                    >
                        <span className={styles.bContent}>
                            {dictionary.queryBuilderHeader?.myFiltersDropdown?.title || 'My Filters'}
                            <DownOutlined className={styles.arrow} />
                        </span>
                    </Button>
                </ConditionalWrapper>
            </div>
        </Space>
    );
};

export default QueryBuilderHeaderTools;
