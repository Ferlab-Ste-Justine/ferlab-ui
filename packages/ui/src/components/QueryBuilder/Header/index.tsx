import React, { useCallback, useEffect, useState } from 'react';
import { EditOutlined, StarFilled, StarOutlined, UndoOutlined, WarningFilled } from '@ant-design/icons';
import { Button, Form, Input, Modal, Space, Tooltip, Typography } from 'antd';
import { Rule } from 'antd/lib/form';
import cx from 'classnames';
import { v4 } from 'uuid';

import { getDefaultSyntheticSqon } from '../../../data/sqon/utils';
import Collapse, { CollapsePanel } from '../../Collapse';
import { IDictionary, IQueriesState, IQueryBuilderHeaderConfig, ISavedFilter, TOnSavedFilterChange } from '../types';
import { setQueryBuilderState } from '../utils/useQueryBuilderState';

import QueryBuilderHeaderTools from './Tools';
import { hasUnsavedChanges, isNewUnsavedFilter } from './utils';

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
    capLengthNameSavedQuery?: boolean;
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

    const emptyRule: Rule = {
        message: <span>{dictionary.queryBuilderHeader?.form?.error?.fieldRequired || 'This field is required'}</span>,
        required: true,
        type: 'string',
    };

    const maxLengthRule: Rule = {
        max: DEFAULT_TITLE_MAX_LENGTH,
        message: (
            <span>
                <WarningFilled /> {DEFAULT_TITLE_MAX_LENGTH}{' '}
                {dictionary.queryBuilderHeader?.modal?.edit?.input.maximumLength || 'characters maximum'}
            </span>
        ),
        required: false,
        type: 'string',
    };

    const headerRules = !config.noCapLengthNameSavedQuery ? [emptyRule, maxLengthRule] : [emptyRule];

    const onSaveFilter = (savedFilter: ISavedFilter) => {
        const newSavedFilter = {
            favorite: savedFilter?.favorite || false,
            id: savedFilter?.id || v4(),
            queries: queriesState.queries,
            title: savedFilter?.title! || config.defaultTitle!,
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
            favorite: false,
            id: v4(),
            queries: [getDefaultSyntheticSqon(defaultQueryId)],
            title: config.defaultTitle!,
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
                queriesState={queriesState}
                savedFilters={localSavedFilters!}
                selectedSavedFilter={selectedSavedFilter!}
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
                    extra={getExtra()}
                    header={
                        <Space className={styles.QBHContainer} size={16}>
                            <Title className={styles.togglerTitle} level={5}>
                                {localSelectedSavedFilter?.title || config.defaultTitle}
                            </Title>
                            <Space className={cx(styles.QBHActionContainer, styles.QBHOptionsActionsContainer)}>
                                {config.options?.enableEditTitle && (
                                    <Button
                                        className={styles.iconBtnAction}
                                        icon={<EditOutlined />}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setEditModalVisible(true);
                                        }}
                                        size="small"
                                        type="text"
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
                                                size="small"
                                                type="text"
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
            <Modal
                cancelText={dictionary.queryBuilderHeader?.modal?.edit?.cancelText || 'Cancel'}
                className={styles.QBHeditModal}
                okButtonProps={{ disabled: !localSavedFilters }}
                okText={dictionary.queryBuilderHeader?.modal?.edit?.okText || 'Save'}
                onCancel={() => {
                    setEditModalVisible(false);
                    editForm.resetFields();
                }}
                onOk={(e) => editForm.submit()}
                title={dictionary.queryBuilderHeader?.modal?.edit?.title || 'Save this query'}
                visible={isEditModalVisible}
            >
                <Form
                    fields={[
                        {
                            name: ['title'],
                            value: savedFilterTitle || selectedSavedFilter?.title!,
                        },
                    ]}
                    form={editForm}
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
                                className={styles.QBHfilterEditFormItem}
                                label={dictionary.queryBuilderHeader?.modal?.edit?.input.label || 'Query name'}
                                name="title"
                                required={false}
                                rules={headerRules}
                            >
                                <Input
                                    placeholder={
                                        dictionary.queryBuilderHeader?.modal?.edit?.input.placeholder ||
                                        'Untitled query'
                                    }
                                    ref={callbackRef}
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
