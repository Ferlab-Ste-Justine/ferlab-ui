import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { Button, Tooltip, Modal, Space } from 'antd';
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
import { IDictionary, IQueriesState, IQueryBuilderHeaderConfig, ISavedFilter, TOnSavedFilterChange } from '../../types';
import ConditionalWrapper from '../../../utils/ConditionalWrapper';
import SavedFilters from './SavedFilters';
import { hasQueries, hasUnsavedChanges, isNewUnsavedFilter } from '../utils';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilderHeaderTools.module.scss';

interface IQueryBuilderHeaderProps {
    config: IQueryBuilderHeaderConfig;
    dictionary?: IDictionary;
    savedFilters: ISavedFilter[];
    selectedSavedFilter?: ISavedFilter;
    queriesState: IQueriesState;
    onSavedFilterChange: TOnSavedFilterChange;
    onNewSavedFilter: () => void;
    onDuplicateSavedFilter: () => void;
}

const tooltipAlign = { align: { offset: [0, 5] } };

const QueryBuilderHeaderTools = ({
    config,
    dictionary = {},
    savedFilters = [],
    selectedSavedFilter,
    queriesState,
    onSavedFilterChange,
    onNewSavedFilter,
    onDuplicateSavedFilter,
}: IQueryBuilderHeaderProps) => {
    const [isDirty, setIsDirty] = useState(false);
    const [isNewFilter, setIsNewFilter] = useState(false);
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(false);

    const confirmUnsavedChangeForNewFilter = (onOkCallback: Function) =>
        Modal.confirm({
            title: dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.title || 'Unsaved changes',
            icon: <ExclamationCircleOutlined />,
            content:
                dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.createNewFilter?.content ||
                'You are about to create a new filter; all modifications will be lost.',
            okText: dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.createNewFilter?.okText || 'Create',
            cancelText: dictionary.queryBuilderHeader?.modal?.confirmUnsaved?.createNewFilter?.cancelText || 'Cancel',
            onOk: () => onOkCallback(),
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
        <Space className={styles.queryBuilderHeaderTools} size={20} onClick={(e) => e.stopPropagation()}>
            <Space className={styles.toolsContainer} align="center">
                <Tooltip
                    title={dictionary.queryBuilderHeader?.tooltips?.newQueryBuilder || 'New query builder'}
                    {...tooltipAlign}
                >
                    <Button
                        className={styles.queryBuilderHeaderActionIconBtn}
                        onClick={() => {
                            if (isDirty) {
                                confirmUnsavedChangeForNewFilter(onNewSavedFilter);
                            } else {
                                onNewSavedFilter();
                            }
                        }}
                        type="text"
                        disabled={isNewFilter}
                        size="small"
                        icon={<PlusOutlined />}
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
                        onClick={() => {
                            if (isDirty) {
                                if (config.onUpdateFilter) {
                                    config.onUpdateFilter(selectedSavedFilter!);
                                }
                            } else if (config?.onSaveFilter) {
                                config.onSaveFilter(selectedSavedFilter!);
                            }
                        }}
                        type="text"
                        disabled={isSaveButtonDisabled}
                        size="small"
                        icon={<SaveOutlined />}
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
                            onClick={() => {
                                if (isDirty) {
                                    confirmUnsavedChangeForNewFilter(onDuplicateSavedFilter);
                                } else {
                                    onDuplicateSavedFilter();
                                }
                            }}
                            type="text"
                            disabled={isNewFilter}
                            size="small"
                            icon={<CopyOutlined />}
                        />
                    </Tooltip>
                )}
                <Tooltip title={dictionary.queryBuilderHeader?.tooltips?.delete || 'Delete'} {...tooltipAlign}>
                    <Button
                        className={styles.queryBuilderHeaderActionIconBtn}
                        type="text"
                        disabled={isNewFilter}
                        onClick={() => {
                            Modal.confirm({
                                title:
                                    dictionary.queryBuilderHeader?.popupConfirm?.delete.title ||
                                    'Permanently delete this filter?',
                                icon: <ExclamationCircleOutlined />,
                                content:
                                    dictionary.queryBuilderHeader?.popupConfirm?.delete.content ||
                                    'You are about to permanently delete this filter and all of its queries.',
                                okText: dictionary.queryBuilderHeader?.popupConfirm?.delete.okText || 'Delete filter',
                                cancelText: dictionary.queryBuilderHeader?.popupConfirm?.delete.cancelText || 'Cancel',
                                okButtonProps: { danger: true },
                                onOk: () => {
                                    if (config?.onDeleteFilter) {
                                        config.onDeleteFilter(selectedSavedFilter!.id);
                                    }
                                },
                            });
                        }}
                        size="small"
                        icon={<DeleteOutlined />}
                    />
                </Tooltip>
                {config.options?.enableShare && (
                    <Tooltip
                        title={dictionary.queryBuilderHeader?.tooltips?.share || 'Share (Copy url)'}
                        {...tooltipAlign}
                    >
                        <Button
                            className={styles.queryBuilderHeaderActionIconBtn}
                            onClick={() => {
                                if (config.onShareFilter) {
                                    config.onShareFilter(selectedSavedFilter!);
                                }
                            }}
                            type="text"
                            size="small"
                            disabled={isNewFilter || isDirty}
                            icon={<ShareAltOutlined />}
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
                                <SavedFilters
                                    selectedKey={selectedSavedFilter ? selectedSavedFilter.id : ''}
                                    dictionary={dictionary}
                                    isDirty={isDirty}
                                    savedFilters={savedFilters}
                                    onSavedFilterChange={onSavedFilterChange}
                                >
                                    {children}
                                </SavedFilters>
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
                        size="small"
                        icon={<FolderOutlined />}
                        onClick={(e) => e.stopPropagation()}
                        disabled={savedFilters.length == 0}
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
