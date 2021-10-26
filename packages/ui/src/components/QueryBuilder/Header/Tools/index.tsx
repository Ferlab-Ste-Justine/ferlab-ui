import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import isEqual from 'lodash/isEqual';
import { Dropdown, Button, Tooltip, Modal, Popconfirm } from 'antd';
import { DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import StackLayout from '../../../../layout/StackLayout';
import { IDictionary, IQueriesState, IQueryBuilderHeaderConfig, ISavedFilter, TOnSavedFilterChange } from '../../types';
import PlusIcon from '../../icons/PlusIcon';
import SaveIcon from '../../icons/SaveIcon';
import CopyIcon from '../../icons/CopyIcon';
import DeleteIcon from '../../icons/DeleteIcon';
import ShareIcon from '../../icons/ShareIcon';
import FolderIcon from '../../icons/FolderIcon';
import ConditionalWrapper from '../../../utils/ConditionalWrapper';
import { isNotEmptySqon } from '../../../../data/sqon/utils';
import SavedFilters from './SavedFilters';

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

        setIsDirty(isDirty);
        setIsNewFilter(isNew);
        setIsSaveButtonDisabled(hasQueries(queriesState) ? !isDirty : isNew);
    }, [queriesState, selectedSavedFilter]);

    return (
        <StackLayout className={styles.queryBuilderHeaderTools}>
            <StackLayout className={styles.toolsContainer}>
                <Tooltip title={dictionary.queryBuilderHeader?.tooltips?.newQueryBuilder || 'New query builder'}>
                    <Button
                        className={styles.queryBuilderHeaderActionIconBtn}
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            if (isDirty) {
                                confirmUnsavedChangeForNewFilter(onNewSavedFilter);
                            } else {
                                onNewSavedFilter();
                            }
                        }}
                        type="text"
                        disabled={isNewFilter}
                    >
                        <PlusIcon />
                    </Button>
                </Tooltip>
                <Tooltip title={dictionary.queryBuilderHeader?.tooltips?.save || 'Save'}>
                    <Button
                        className={cx(styles.queryBuilderHeaderActionIconBtn, isDirty ? styles.dirty : '')}
                        onClick={(e: React.MouseEvent) => {
                            e.stopPropagation();
                            config.onSaveFilter(selectedSavedFilter!);
                        }}
                        type="text"
                        disabled={isSaveButtonDisabled}
                    >
                        <SaveIcon />
                    </Button>
                </Tooltip>
                {config.options?.enableDuplicate && (
                    <Tooltip
                        title={
                            dictionary.queryBuilderHeader?.tooltips?.duplicateQueryBuilder || 'Duplicate query builder'
                        }
                    >
                        <Button
                            className={styles.queryBuilderHeaderActionIconBtn}
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                if (isDirty) {
                                    confirmUnsavedChangeForNewFilter(onDuplicateSavedFilter);
                                } else {
                                    onDuplicateSavedFilter();
                                }
                            }}
                            type="text"
                            disabled={isNewFilter}
                        >
                            <CopyIcon />
                        </Button>
                    </Tooltip>
                )}
                <Tooltip title={dictionary.queryBuilderHeader?.tooltips?.delete || 'Delete'}>
                    <Popconfirm
                        arrowPointAtCenter
                        cancelText={dictionary.queryBuilderHeader?.popupConfirm?.delete.cancelText || 'Cancel'}
                        disabled={!selectedSavedFilter}
                        okText={dictionary.queryBuilderHeader?.popupConfirm?.delete.okText || 'Delete'}
                        onConfirm={(e) => {
                            e!.stopPropagation();
                            config.onDeleteFilter(selectedSavedFilter!.id);
                        }}
                        placement="topRight"
                        title={
                            dictionary.queryBuilderHeader?.popupConfirm?.delete.title ||
                            'Permanently delete this request?'
                        }
                        getPopupContainer={(trigger) => trigger.parentElement!}
                    >
                        <Button className={styles.queryBuilderHeaderActionIconBtn} type="text" disabled={isNewFilter}>
                            <DeleteIcon />
                        </Button>
                    </Popconfirm>
                </Tooltip>
                {config.options?.enableShare && (
                    <Tooltip title={dictionary.queryBuilderHeader?.tooltips?.share || 'Share (Copy url)'}>
                        <Button
                            className={styles.queryBuilderHeaderActionIconBtn}
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                            }}
                            type="text"
                            disabled={isNewFilter}
                        >
                            <ShareIcon />
                        </Button>
                    </Tooltip>
                )}
            </StackLayout>
            <StackLayout className={styles.extra}>
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
                        size={'small'}
                        icon={<FolderIcon className={styles.prefixIcon} />}
                        disabled={savedFilters.length == 0}
                    >
                        <span className={styles.bContent}>
                            {dictionary.queryBuilderHeader?.myFiltersDropdown?.title || 'My Filters'}
                            <DownOutlined className={styles.arrow} />
                        </span>
                    </Button>
                </ConditionalWrapper>
            </StackLayout>
        </StackLayout>
    );
};

const isNewUnsavedFilter = (selectedSavedFilter: ISavedFilter, savedFilters: ISavedFilter[]) => {
    return (
        !selectedSavedFilter ||
        !(savedFilters!.filter((savedFilter: ISavedFilter) => savedFilter.id == selectedSavedFilter?.id).length > 0)
    );
};

const hasQueries = (queriesState: IQueriesState) =>
    queriesState.queries.filter((sqon) => isNotEmptySqon(sqon)).length > 0;

const hasUnsavedChanges = (
    selectedSavedFilter: ISavedFilter,
    savedFilters: ISavedFilter[],
    queriesState: IQueriesState,
) => {
    if (selectedSavedFilter && !isNewUnsavedFilter(selectedSavedFilter, savedFilters)) {
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

export default QueryBuilderHeaderTools;
