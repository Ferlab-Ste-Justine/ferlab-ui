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
import { WarningFilled } from '@ant-design/icons';

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
                            {config.options?.enableFavoriteFilter &&
                                !isNewUnsavedFilter(selectedSavedFilter!, localSavedFilters!) && (
                                    <Tooltip
                                        title={
                                            localSelectedSavedFilter?.favorite
                                                ? dictionary.queryBuilderHeader?.tooltips?.usetDefaultFilter ||
                                                  'Unset default filter'
                                                : dictionary.queryBuilderHeader?.tooltips?.setAsDefaultFilter ||
                                                  'Set as default filter'
                                        }
                                    >
                                        <Button
                                            className={styles.iconBtnAction}
                                            onClick={() => {
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
                                        >
                                            {localSelectedSavedFilter?.favorite ? (
                                                <StarFilledIcon className={styles.QBHOptionsFavoriteStar} />
                                            ) : (
                                                <StarIcon />
                                            )}
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
