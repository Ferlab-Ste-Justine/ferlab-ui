import React, { useCallback, useEffect, useState } from 'react';
import { Typography, Modal, Input, Space, Button, Tooltip, Form } from 'antd';
import cx from 'classnames';
import { v4 } from 'uuid';
import CaretRightIcon from '../icons/CaretRightIcon';
import CaretDownIcon from '../icons/CaretDownIcon';
import EditIcon from '../icons/EditIcon';
import StarIcon from '../icons/StarIcon';
import StarFilledIcon from '../icons/StarFilledIcon';
import QueryBuilderHeaderTools from './Tools';
import { IDictionary, IQueriesState, IQueryBuilderHeaderConfig, ISavedFilter, TOnSavedFilterChange } from '../types';
import { getDefaultSyntheticSqon } from '../../../data/sqon/utils';
import { isNewUnsavedFilter } from './utils';

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

const { Title } = Typography;
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
    const [editForm] = Form.useForm();
    const [isEditModalVisible, setEditModalVisible] = useState(false);
    const [localSelectedSavedFilter, setLocalSelectedSavedFilter] = useState<ISavedFilter | null>(null);
    const [savedFilterTitle, setSavedFilterTitle] = useState('');
    const [localSavedFilters, setLocalSavedFilters] = useState(config.savedFilters);

    const onSaveFilter = (savedFilter: ISavedFilter) => {
        const newSavedFilter = {
            id: savedFilter?.id || v4(),
            title: savedFilter?.title! || config.defaultTitle!,
            default: savedFilter?.default || false,
            queries: queriesState.queries,
        };
        if (config?.onSaveFilter) {
            config.onSaveFilter(newSavedFilter);
        }
        onSavedFilterChange(newSavedFilter);
    };

    const onUpdateFilter = (savedFilter: ISavedFilter) => {
        if (config?.onUpdateFilter) {
            config.onUpdateFilter(savedFilter);
        }
        onSavedFilterChange(savedFilter);
    };

    const onDeleteFilter = (id: string) => {
        if (config?.onDeleteFilter) {
            config.onDeleteFilter(id);
        }
        setSavedFilterTitle(config.defaultTitle!);
        onNewSavedFilter();
    };

    const onNewSavedFilter = () => {
        const defaultQueryId = v4();
        resetQueriesState(defaultQueryId);
        setSavedFilterTitle(config.defaultTitle!);
        onSavedFilterChange({
            id: v4(),
            title: config.defaultTitle!,
            default: false,
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

    useEffect(() => {
        setLocalSavedFilters(config.savedFilters);
    }, [config.savedFilters]);

    useEffect(() => {
        setLocalSelectedSavedFilter(selectedSavedFilter!);
    }, [selectedSavedFilter]);

    return (
        <div id="query-builder-header-tools">
            <Space direction="vertical" className={styles.QBHContainer} size={0}>
                <Space className={`${styles.QBToggler} ${collapsed && styles.togglerClosed}`}>
                    <Space className={styles.QBTitleContainer} size={16}>
                        <div className={styles.QBHActionContainer} onClick={() => toggleQb(!collapsed)}>
                            <span className={styles.togglerIcon}>
                                {collapsed ? <CaretRightIcon /> : <CaretDownIcon />}
                            </span>
                            <Title level={1} className={styles.togglerTitle}>
                                {localSelectedSavedFilter?.title || config.defaultTitle}
                            </Title>
                        </div>
                        <div className={cx(styles.QBHActionContainer, styles.QBHOptionsActionsContainer)}>
                            {config.options?.enableEditTitle && (
                                <Button
                                    className={styles.iconBtnAction}
                                    onClick={() => {
                                        setEditModalVisible(true);
                                    }}
                                    type="text"
                                >
                                    <EditIcon />
                                </Button>
                            )}
                            {config.options?.enableDefaultFilter && (
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
                                        onClick={() => console.log('Favorite option currently disabled.')}
                                        type="text"
                                    >
                                        {localSelectedSavedFilter?.default ? <StarFilledIcon /> : <StarIcon />}
                                    </Button>
                                </Tooltip>
                            )}
                        </div>
                    </Space>
                    {config.showTools && (
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
                                    id: v4(),
                                    ...query,
                                }));
                                const title = `${selectedSavedFilter?.title!} ${
                                    dictionary.queryBuilderHeader?.duplicateFilterTitleSuffix || 'COPY'
                                }`;
                                setSavedFilterTitle(title);
                                onSavedFilterChange({
                                    id: v4(),
                                    title: title,
                                    default: false,
                                    queries: duplicatedQueries, // should probably set new id for each filter here
                                });
                            }}
                        />
                    )}
                </Space>
                {!collapsed && children}
            </Space>
            <Modal
                className={styles.QBHeditModal}
                visible={isEditModalVisible}
                okButtonProps={{ disabled: !localSavedFilters }}
                title={dictionary.queryBuilderHeader?.modal?.edit?.title || 'Save this query'}
                okText={dictionary.queryBuilderHeader?.modal?.edit?.okText || 'Save'}
                cancelText={dictionary.queryBuilderHeader?.modal?.edit?.cancelText || 'Cancel'}
                onOk={(e) => editForm.submit()}
                onCancel={() => setEditModalVisible(false)}
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
                    <Form.Item noStyle>
                        <Form.Item
                            name="title"
                            label={dictionary.queryBuilderHeader?.modal?.edit?.input.label || 'Query name'}
                            rules={[{ required: true, type: 'string' }]}
                            required={false}
                            className={styles.QBHfilterEditFormItem}
                        >
                            <Input
                                ref={callbackRef}
                                placeholder={
                                    dictionary.queryBuilderHeader?.modal?.edit?.input.placeholder || 'Untitled query'
                                }
                            />
                        </Form.Item>
                        <span>{`${config.titleMaxLength || DEFAULT_TITLE_MAX_LENGTH} ${
                            dictionary.queryBuilderHeader?.modal?.edit?.input.maximumLength || 'characters maximum'
                        }`}</span>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default QueryBuilderHeader;
