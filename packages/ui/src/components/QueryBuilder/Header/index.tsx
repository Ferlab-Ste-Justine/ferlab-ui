import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { EditOutlined, StarFilled, StarOutlined, UndoOutlined } from '@ant-design/icons';
import { Button, Space, Tooltip, Typography } from 'antd';
import cx from 'classnames';
import { v4 } from 'uuid';

import { ISyntheticSqon, IValueFilterQuery, IValueQuery, TSyntheticSqonContentValue } from '../../../data/sqon/types';
import { getDefaultSyntheticSqon } from '../../../data/sqon/utils';
import Collapse, { CollapsePanel } from '../../Collapse';
import { QueryBuilderContext, QueryCommonContext } from '../context';
import { ISavedFilter, TOnSavedFilterChange } from '../types';
import { setQueryBuilderState } from '../utils/useQueryBuilderState';

import EditFilterModal from './Tools/EditFilterModal';
import QueryBuilderHeaderTools from './Tools';
import { hasUnsavedChanges, isNewUnsavedFilter } from './utils';

import styles from './index.module.scss';

interface IQueryBuilderHeaderProps {
    children: JSX.Element;
    onSavedFilterChange: TOnSavedFilterChange;
    resetQueriesState: (id: string) => void;
    maxNameCapSavedQuery?: number;
}

const { Title } = Typography;
const tooltipAlign = { align: { offset: [0, 5] } };

const formatQueriesWithPill = (queries: ISyntheticSqon[]): ISyntheticSqon[] => {
    const queriesCloned = structuredClone(queries);
    const formattedQueries = queriesCloned.map((query: ISyntheticSqon) => {
        const newContent = query.content.map((c: TSyntheticSqonContentValue) => {
            if (c.hasOwnProperty('title') && (c as IValueQuery).id)
                return { filterID: (c as IValueQuery).id } as IValueFilterQuery;
            return c;
        });
        return { ...query, content: newContent };
    });
    return formattedQueries;
};

const QueryBuilderHeader = ({
    children,
    onSavedFilterChange,
    resetQueriesState,
}: IQueryBuilderHeaderProps): JSX.Element => {
    const { headerConfig, queriesState, queryBuilderId, selectedSavedFilter } = useContext(QueryBuilderContext);
    const { dictionary } = useContext(QueryCommonContext);
    const [savedFilterTitle, setSavedFilterTitle] = useState('');
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [localSelectedSavedFilter, setLocalSelectedSavedFilter] = useState<ISavedFilter | null>(selectedSavedFilter);
    const [localSavedFilters, setLocalSavedFilters] = useState(headerConfig.savedFilters);

    const onSaveFilter = async (savedFilter: ISavedFilter) => {
        const formattedQueries = formatQueriesWithPill(queriesState.queries);

        const newSavedFilter = {
            favorite: savedFilter?.favorite || false,
            id: savedFilter?.id || v4(),
            queries: queriesState.queries,
            title: savedFilter?.title || headerConfig.defaultTitle || '',
        };

        if (headerConfig?.onSaveFilter) {
            const result = await headerConfig.onSaveFilter({ ...newSavedFilter, queries: formattedQueries });
            if (result?.error) {
                return;
            }
        }

        setSavedFilterTitle(newSavedFilter.title);
        onSavedFilterChange(newSavedFilter);
    };

    const onUpdateFilter = async (savedFilter: ISavedFilter) => {
        const formattedQueries = formatQueriesWithPill(queriesState.queries);

        const updatedSavedFilter = {
            ...savedFilter,
            queries: queriesState.queries,
        };

        if (headerConfig?.onUpdateFilter) {
            const result = await headerConfig.onUpdateFilter({
                ...savedFilter,
                queries: formattedQueries,
            });
            if (result?.error) {
                return;
            }
        }

        setSavedFilterTitle(updatedSavedFilter.title);
        onSavedFilterChange(updatedSavedFilter);
    };

    const onDeleteFilter = (id: string) => {
        if (headerConfig?.onDeleteFilter) {
            headerConfig.onDeleteFilter(id);
        }
        onNewSavedFilter();
    };

    const onNewSavedFilter = () => {
        const defaultQueryId = v4();
        resetQueriesState(defaultQueryId);
        setSavedFilterTitle(headerConfig.defaultTitle!);
        onSavedFilterChange({
            favorite: false,
            id: v4(),
            queries: [getDefaultSyntheticSqon(defaultQueryId)],
            title: headerConfig.defaultTitle!,
        });
    };

    const getExtra = () =>
        headerConfig.showTools ? (
            <QueryBuilderHeaderTools
                config={{
                    ...headerConfig,
                    onDeleteFilter: onDeleteFilter,
                    onSaveFilter: onSaveFilter,
                    onUpdateFilter: onUpdateFilter,
                    onUpdateFilterModal: (savedFilter: ISavedFilter) => {
                        if (headerConfig?.onUpdateFilter) {
                            headerConfig.onUpdateFilter(savedFilter);
                        }
                    },
                }}
                onDuplicateSavedFilter={() => {
                    const duplicatedQueries = [...queriesState.queries].map((query) => ({
                        ...query,
                        id: v4(),
                    }));
                    const title = `${selectedSavedFilter?.title || ''} ${
                        dictionary.queryBuilderHeader?.duplicateFilterTitleSuffix || 'COPY'
                    }`;
                    setSavedFilterTitle(title);
                    onSavedFilterChange({
                        favorite: false,
                        id: v4(),
                        queries: duplicatedQueries,
                        title: title, // should probably set new id for each filter here
                    });
                }}
                onNewSavedFilter={onNewSavedFilter}
                onSavedFilterChange={(filter) => {
                    setSavedFilterTitle(filter.title);
                    onSavedFilterChange(filter);
                }}
                savedFilters={localSavedFilters!}
            />
        ) : (
            []
        );

    useEffect(() => {
        setLocalSavedFilters(headerConfig.savedFilters);
    }, [headerConfig.savedFilters]);

    useEffect(() => {
        setLocalSelectedSavedFilter(selectedSavedFilter!);
    }, [selectedSavedFilter]);

    return (
        <div id="query-builder-header-tools">
            <Collapse
                {...{
                    ...headerConfig.collapseProps,
                    arrowIcon: headerConfig.collapseProps?.arrowIcon ?? 'caretFilled',
                    size: headerConfig.collapseProps?.size ?? 'large',
                }}
                className={styles.QBHCollapse}
                defaultActiveKey={'query-header-tools'}
            >
                <CollapsePanel
                    extra={getExtra()}
                    header={
                        <Space className={styles.QBHContainer} size={16}>
                            <Title className={styles.togglerTitle} level={5}>
                                {localSelectedSavedFilter?.title || headerConfig.defaultTitle}
                            </Title>
                            <Space className={cx(styles.QBHActionContainer, styles.QBHOptionsActionsContainer)}>
                                {headerConfig.options?.enableEditTitle && (
                                    <Button
                                        className={styles.iconBtnAction}
                                        icon={<EditOutlined />}
                                        id="QBH_editName"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditModalVisible(true);
                                        }}
                                        size="small"
                                        type="text"
                                    />
                                )}
                                {headerConfig.options?.enableFavoriteFilter &&
                                    !isNewUnsavedFilter(selectedSavedFilter!, localSavedFilters!) && (
                                        <Tooltip
                                            title={
                                                localSelectedSavedFilter?.favorite
                                                    ? dictionary.queryBuilderHeader?.tooltips?.unsetDefaultFilter ||
                                                      'Unset default filter'
                                                    : dictionary.queryBuilderHeader?.tooltips?.setAsDefaultFilter ||
                                                      'Set as default filter'
                                            }
                                            {...tooltipAlign}
                                        >
                                            <Button
                                                className={styles.iconBtnAction}
                                                icon={
                                                    localSelectedSavedFilter?.favorite ? (
                                                        <StarFilled className={styles.QBHOptionsFavoriteStar} />
                                                    ) : (
                                                        <StarOutlined />
                                                    )
                                                }
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const updatedSavedFilter = {
                                                        ...selectedSavedFilter!,
                                                        favorite: !selectedSavedFilter?.favorite,
                                                    };
                                                    if (selectedSavedFilter?.favorite) {
                                                        if (headerConfig.onUpdateFilter) {
                                                            headerConfig.onUpdateFilter(updatedSavedFilter);
                                                        }
                                                    } else {
                                                        if (headerConfig?.onSetAsFavorite) {
                                                            headerConfig.onSetAsFavorite(updatedSavedFilter);
                                                        }
                                                    }
                                                    onSavedFilterChange(updatedSavedFilter);
                                                }}
                                                size="small"
                                                type="text"
                                            />
                                        </Tooltip>
                                    )}
                                {headerConfig.options?.enableUndoChanges &&
                                    hasUnsavedChanges(
                                        selectedSavedFilter!,
                                        headerConfig.savedFilters!,
                                        queriesState,
                                    ) && (
                                        <Tooltip
                                            title={
                                                dictionary.queryBuilderHeader?.tooltips?.undoChanges ||
                                                'Discard unsaved changes'
                                            }
                                            {...tooltipAlign}
                                        >
                                            <Button
                                                className={styles.iconBtnAction}
                                                icon={<UndoOutlined />}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (selectedSavedFilter) {
                                                        setQueryBuilderState(queryBuilderId, {
                                                            active: selectedSavedFilter?.queries[0].id,
                                                            state: selectedSavedFilter?.queries,
                                                        });
                                                    }
                                                }}
                                                size="small"
                                                type="text"
                                            />
                                        </Tooltip>
                                    )}
                            </Space>
                        </Space>
                    }
                    key="query-header-tools"
                >
                    {children}
                </CollapsePanel>
            </Collapse>
            <EditFilterModal
                initialTitleValue={savedFilterTitle || selectedSavedFilter?.title || ''}
                isNewFilter={isNewUnsavedFilter(selectedSavedFilter!, localSavedFilters!)}
                okDisabled={!localSavedFilters}
                onCancel={() => setEditModalVisible(false)}
                onSubmit={(title) => {
                    setEditModalVisible(false);
                    const filterToSave = {
                        ...selectedSavedFilter!,
                        title,
                    };
                    if (isNewUnsavedFilter(selectedSavedFilter!, localSavedFilters!)) {
                        onSaveFilter(filterToSave);
                    } else {
                        onUpdateFilter(filterToSave);
                    }
                }}
                visible={isEditModalVisible}
            />
        </div>
    );
};

export default QueryBuilderHeader;
