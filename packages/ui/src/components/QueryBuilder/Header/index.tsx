import React, { useCallback, useEffect, useState } from 'react';
import { Typography, Modal, Input, Space, Button, Tooltip, Form } from 'antd';
import cx from 'classnames';
import { v4 } from 'uuid';
import QueryBuilderHeaderTools from './Tools';
import { IDictionary, IQueriesState, IQueryBuilderHeaderConfig, ISavedFilter, TOnSavedFilterChange } from '../types';
import { getDefaultSyntheticSqon } from '../../../data/sqon/utils';
import { hasUnsavedChanges, isNewUnsavedFilter } from './utils';
import { EditOutlined, StarFilled, StarOutlined, UndoOutlined, WarningFilled } from '@ant-design/icons';
import { setQueryBuilderState } from '../utils/useQueryBuilderState';
import Collapse, { CollapsePanel, TCollapseProps } from '../../Collapse';

import styles from '@ferlab/style/components/queryBuilder/QueryBuilderHeader.module.scss';

interface IQueryBuilderHeaderProps {
    queryBuilderId: string;
    config: IQueryBuilderHeaderConfig;
    dictionary: IDictionary;
    children: JSX.Element;
    selectedSavedFilter?: ISavedFilter;
    onSavedFilterChange: TOnSavedFilterChange;
    queriesState: IQueriesState;
    resetQueriesState: (id: string) => void;
}

const { Title } = Typography;
const tooltipAlign = { align: { offset: [0, 5] } };
const DEFAULT_TITLE_MAX_LENGTH = 50;

const QueryBuilderHeader = ({
    queryBuilderId,
    config,
    dictionary = {},
    children,
    selectedSavedFilter,
    onSavedFilterChange,
    queriesState,
    resetQueriesState,
}: IQueryBuilderHeaderProps) => {
    const [editForm] = Form.useForm();
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [localSelectedSavedFilter, setLocalSelectedSavedFilter] = useState<ISavedFilter | undefined>(
        selectedSavedFilter,
    );
    const [savedFilterTitle, setSavedFilterTitle] = useState('');
    const [localSavedFilters, setLocalSavedFilters] = useState(config.savedFilters);

    const onSaveFilter = (savedFilter: ISavedFilter) => {
        const newSavedFilter = {
            id: savedFilter?.id || v4(),
            title: savedFilter?.title! || config.defaultTitle!,
            favorite: savedFilter?.favorite || false,
            queries: queriesState.queries,
        };
        if (config?.onSaveFilter) {
            config.onSaveFilter(newSavedFilter);
        }
        onSavedFilterChange(newSavedFilter);
    };

    const onUpdateFilter = (savedFilter: ISavedFilter) => {
        const updatedSavedFilter = {
            ...savedFilter,
            queries: queriesState.queries,
        };
        if (config?.onUpdateFilter) {
            config.onUpdateFilter(updatedSavedFilter);
        }
        onSavedFilterChange(updatedSavedFilter);
    };

    const onDeleteFilter = (id: string) => {
        if (config?.onDeleteFilter) {
            config.onDeleteFilter(id);
        }
        onNewSavedFilter();
    };

    const onNewSavedFilter = () => {
        const defaultQueryId = v4();
        resetQueriesState(defaultQueryId);
        setSavedFilterTitle(config.defaultTitle!);
        onSavedFilterChange({
            id: v4(),
            title: config.defaultTitle!,
            favorite: false,
            queries: [getDefaultSyntheticSqon(defaultQueryId)],
        });
    };

    const callbackRef = useCallback(
        (inputElement) => {
            if (inputElement) {
                setTimeout(() => {
                    inputElement.focus();
                }, 10);
            }
        },
        [isEditModalVisible],
    );

    const getExtra = () =>
        config.showTools ? (
            <QueryBuilderHeaderTools
                config={{
                    ...config,
                    onDeleteFilter: onDeleteFilter,
                    onSaveFilter: onSaveFilter,
                    onUpdateFilter: onUpdateFilter,
                }}
                dictionary={dictionary}
                savedFilters={localSavedFilters!}
                selectedSavedFilter={selectedSavedFilter!}
                queriesState={queriesState}
                onSavedFilterChange={(filter) => {
                    setSavedFilterTitle(filter.title);
                    onSavedFilterChange(filter);
                }}
                onNewSavedFilter={onNewSavedFilter}
                onDuplicateSavedFilter={() => {
                    const duplicatedQueries = [...queriesState.queries].map((query) => ({
                        ...query,
                        id: v4(),
                    }));
                    const title = `${selectedSavedFilter?.title!} ${
                        dictionary.queryBuilderHeader?.duplicateFilterTitleSuffix || 'COPY'
                    }`;
                    setSavedFilterTitle(title);
                    onSavedFilterChange({
                        id: v4(),
                        title: title,
                        favorite: false,
                        queries: duplicatedQueries, // should probably set new id for each filter here
                    });
                }}
            />
        ) : (
            []
        );

    useEffect(() => {
        setLocalSavedFilters(config.savedFilters);
    }, [config.savedFilters]);

    useEffect(() => {
        setLocalSelectedSavedFilter(selectedSavedFilter!);
    }, [selectedSavedFilter]);

    return (
        <div id="query-builder-header-tools">
            <Collapse
                {...{
                    ...config.collapseProps,
                    arrowIcon: config.collapseProps?.arrowIcon ?? 'caretFilled',
                    size: config.collapseProps?.size ?? 'large',
                }}
                defaultActiveKey={'query-header-tools'}
            >
                <CollapsePanel
                    key="query-header-tools"
                    header={
                        <Space className={styles.QBHContainer} size={16}>
                            <Title level={5} className={styles.togglerTitle}>
                                {localSelectedSavedFilter?.title || config.defaultTitle}
                            </Title>
                            <Space className={cx(styles.QBHActionContainer, styles.QBHOptionsActionsContainer)}>
                                {config.options?.enableEditTitle && (
                                    <Button
                                        className={styles.iconBtnAction}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditModalVisible(true);
                                        }}
                                        type="text"
                                        size="small"
                                        icon={<EditOutlined />}
                                    />
                                )}
                                {config.options?.enableFavoriteFilter &&
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
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const updatedSavedFilter = {
                                                        ...selectedSavedFilter!,
                                                        favorite: !selectedSavedFilter?.favorite,
                                                    };
                                                    if (selectedSavedFilter?.favorite) {
                                                        if (config.onUpdateFilter) {
                                                            config.onUpdateFilter(updatedSavedFilter);
                                                        }
                                                    } else {
                                                        if (config?.onSetAsFavorite) {
                                                            config.onSetAsFavorite(updatedSavedFilter);
                                                        }
                                                    }
                                                    onSavedFilterChange(updatedSavedFilter);
                                                }}
                                                type="text"
                                                size="small"
                                                icon={
                                                    localSelectedSavedFilter?.favorite ? (
                                                        <StarFilled className={styles.QBHOptionsFavoriteStar} />
                                                    ) : (
                                                        <StarOutlined />
                                                    )
                                                }
                                            />
                                        </Tooltip>
                                    )}
                                {config.options?.enableUndoChanges &&
                                    hasUnsavedChanges(selectedSavedFilter!, config.savedFilters!, queriesState) && (
                                        <Tooltip
                                            title={
                                                dictionary.queryBuilderHeader?.tooltips?.undoChanges ||
                                                'Discard unsaved changes'
                                            }
                                            {...tooltipAlign}
                                        >
                                            <Button
                                                className={styles.iconBtnAction}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (selectedSavedFilter) {
                                                        setQueryBuilderState(queryBuilderId, {
                                                            active: selectedSavedFilter?.queries[0].id,
                                                            state: selectedSavedFilter?.queries,
                                                        });
                                                    }
                                                }}
                                                type="text"
                                                size="small"
                                                icon={<UndoOutlined />}
                                            />
                                        </Tooltip>
                                    )}
                            </Space>
                        </Space>
                    }
                    extra={getExtra()}
                >
                    {children}
                </CollapsePanel>
            </Collapse>
            <Modal
                className={styles.QBHeditModal}
                visible={isEditModalVisible}
                okButtonProps={{ disabled: !localSavedFilters }}
                title={dictionary.queryBuilderHeader?.modal?.edit?.title || 'Save this query'}
                okText={dictionary.queryBuilderHeader?.modal?.edit?.okText || 'Save'}
                cancelText={dictionary.queryBuilderHeader?.modal?.edit?.cancelText || 'Cancel'}
                onOk={(e) => editForm.submit()}
                onCancel={() => {
                    setEditModalVisible(false);
                    editForm.resetFields();
                }}
            >
                <Form
                    form={editForm}
                    fields={[
                        {
                            name: ['title'],
                            value: savedFilterTitle || selectedSavedFilter?.title!,
                        },
                    ]}
                    layout="vertical"
                    onFinish={(values) => {
                        setEditModalVisible(false);
                        setSavedFilterTitle(values.title);
                        const filterToSave = {
                            ...selectedSavedFilter!,
                            title: values.title,
                        };
                        if (isNewUnsavedFilter(selectedSavedFilter!, localSavedFilters!)) {
                            onSaveFilter(filterToSave);
                        } else {
                            onUpdateFilter(filterToSave);
                        }
                    }}
                >
                    <Form.Item noStyle shouldUpdate>
                        {() => (
                            <Form.Item
                                name="title"
                                label={dictionary.queryBuilderHeader?.modal?.edit?.input.label || 'Query name'}
                                rules={[
                                    {
                                        type: 'string',
                                        max: DEFAULT_TITLE_MAX_LENGTH,
                                        message: (
                                            <span>
                                                <WarningFilled /> {DEFAULT_TITLE_MAX_LENGTH}{' '}
                                                {dictionary.queryBuilderHeader?.modal?.edit?.input.maximumLength ||
                                                    'characters maximum'}
                                            </span>
                                        ),
                                    },
                                    {
                                        type: 'string',
                                        required: true,
                                        message: (
                                            <span>
                                                {dictionary.queryBuilderHeader?.form?.error?.fieldRequired ||
                                                    'This field is required'}
                                            </span>
                                        ),
                                    },
                                ]}
                                required={false}
                                className={styles.QBHfilterEditFormItem}
                            >
                                <Input
                                    ref={callbackRef}
                                    placeholder={
                                        dictionary.queryBuilderHeader?.modal?.edit?.input.placeholder ||
                                        'Untitled query'
                                    }
                                />
                            </Form.Item>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default QueryBuilderHeader;
