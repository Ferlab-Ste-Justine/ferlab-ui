import React, { useContext, useEffect, useState } from 'react';
import { CloseOutlined, ExclamationCircleOutlined, WarningFilled } from '@ant-design/icons';
import { Button, Modal, Space, Spin, Typography } from 'antd';
import { isEqual } from 'lodash';

import { IRemoteComponent, ISyntheticSqon } from '../../../data/sqon/types';
import { removeContentFromSqon } from '../../../data/sqon/utils';
import { QueryCommonContext } from '../../QueryBuilder/context';
import BooleanQueryPill from '../../QueryBuilder/QueryPills/BooleanQueryPill';
import {
    ArrayTenOrMore,
    CombinerEnum,
    defaultReferenceColors,
    ISavedFilter,
    SavedFilterTypeEnum,
} from '../../QueryBuilder/types';
import useQueryBuilderState, { setQueryBuilderState } from '../../QueryBuilder/utils/useQueryBuilderState';
import SidebarMenu, { ISidebarMenuItem } from '../../SidebarMenu/index';

import styles from './EditCustomPillModal.module.scss';

interface EditCustomPillModalProps {
    editPill: (queryPill: ISavedFilter, tag: string, queryBuilderId: string) => any;
    getFiltersByPill: (id: string) => any;
    menuItems: ISidebarMenuItem[];
    open: boolean;
    queryBuilderId: string;
    queryEditionQBId: string;
    queryPill: ISavedFilter;
    referenceColors?: ArrayTenOrMore<string>;
    remoteComponentMapping?: (props: IRemoteComponent) => void;
    onCancel: () => void;
    tag: string;
    validateName: (title: string, tag: string) => any;
}

const EditCustomPillModal = ({
    editPill,
    getFiltersByPill,
    menuItems,
    onCancel,
    open,
    queryBuilderId,
    queryEditionQBId,
    queryPill,
    referenceColors = defaultReferenceColors,
    remoteComponentMapping,
    tag,
    validateName,
}: EditCustomPillModalProps): JSX.Element => {
    const queryPillCloned = structuredClone(queryPill);
    const { dictionary } = useContext(QueryCommonContext);
    const { activeQuery, state } = useQueryBuilderState(queryEditionQBId);
    const [isUpdated, setIsUpdated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(queryPillCloned.title);
    const [hasTitleUpdate, setHasTitleUpdate] = useState<boolean>(false);

    useEffect(() => {
        if (open && queryPill.queries[0]) {
            setQueryBuilderState(queryEditionQBId, {
                active: queryPillCloned?.queries[0].id,
                state: queryPillCloned?.queries,
            });
            setNewTitle(queryPillCloned.title);
        }
    }, [queryPill, open]);

    useEffect(() => {
        if (hasTitleUpdate) return;
        setIsUpdated(
            !isEqual(
                {
                    content: activeQuery.content,
                    id: activeQuery.id,
                    op: activeQuery.op,
                },
                {
                    content: queryPill.queries[0].content,
                    id: queryPill.queries[0].id,
                    op: queryPill.queries[0].op,
                },
            ),
        );
    }, [activeQuery, queryPill, hasTitleUpdate]);

    const getColorForReference = (refIndex: number) => referenceColors[refIndex % referenceColors.length];

    const updateQueryById = (newQuery: ISyntheticSqon) => {
        const queryToUpdate = state?.state?.find(({ id }) => id === newQuery.id);
        if (queryToUpdate) {
            queryToUpdate.content = newQuery.content;
            queryToUpdate.op = newQuery.op;
        }

        setQueryBuilderState(queryEditionQBId, state || {});
    };

    const resetValuesOnClose = () => {
        onCancel();
        setQueryBuilderState(queryEditionQBId, {
            active: undefined,
            state: undefined,
        });
        setIsUpdated(false);
        setNewTitle('');
        setHasTitleUpdate(false);
    };

    return (
        <Modal
            bodyStyle={{ height: '100vh', padding: 0, width: '100vw' }}
            cancelButtonProps={{ style: { display: 'none' } }}
            className={styles.modalContainer}
            closable={false}
            footer={null}
            open={open}
        >
            <Spin spinning={isLoading}>
                <div className={styles.contentContainer}>
                    <SidebarMenu className={styles.sidebarMenu} menuItems={menuItems} />
                    <div className={styles.editContainer}>
                        <div className={styles.header}>
                            <Typography.Text className={styles.title}>
                                {dictionary.queriesSidebar?.editCustomPill?.title || 'Edit a custom query'}
                            </Typography.Text>
                            <Button
                                className={styles.closeIcon}
                                icon={<CloseOutlined />}
                                onClick={resetValuesOnClose}
                                type="text"
                            />
                        </div>
                        <div className={styles.content}>
                            <Typography.Title
                                className={styles.queryTitle}
                                editable={{
                                    enterIcon: null,
                                    onChange: (value: string) => {
                                        setNewTitle(value);
                                        setIsUpdated(value !== queryPill.title);
                                        setHasTitleUpdate(value !== queryPill.title);
                                    },
                                }}
                                level={5}
                            >
                                {newTitle}
                            </Typography.Title>
                            <Space className={styles.queryValues}>
                                <BooleanQueryPill
                                    getColorForReference={getColorForReference}
                                    isActive={true}
                                    onCombineChange={() => {
                                        const queryToUpdate = state?.state?.[0];
                                        if (queryToUpdate) {
                                            queryToUpdate.op =
                                                queryToUpdate.op === 'and' ? CombinerEnum.Or : CombinerEnum.And;
                                        }
                                        setQueryBuilderState(queryEditionQBId, state || {});
                                    }}
                                    onRemoveFacet={(field, query) => {
                                        updateQueryById(removeContentFromSqon(field, query));
                                    }}
                                    onRemoveReference={(refIndex, query) => {
                                        updateQueryById(removeContentFromSqon(refIndex, query));
                                    }}
                                    parentQueryId={'id'}
                                    query={activeQuery}
                                    remoteComponentMapping={remoteComponentMapping}
                                />
                            </Space>
                        </div>
                        <div className={styles.footer}>
                            <Button className={styles.cancel} onClick={resetValuesOnClose} type="text">
                                {dictionary.queriesSidebar?.editCustomPill?.cancelText || 'Cancel'}
                            </Button>
                            <Button
                                className={styles.save}
                                disabled={!isUpdated}
                                onClick={async () => {
                                    setIsLoading(true);
                                    if (activeQuery.content.length === 0) {
                                        Modal.error({
                                            content: (
                                                <Typography.Text>
                                                    {dictionary.queriesSidebar?.editCustomPill.save.emptyQuery
                                                        .message ||
                                                        'Your custom query must contain at least one criteria.'}
                                                </Typography.Text>
                                            ),
                                            okText:
                                                dictionary.queriesSidebar?.editCustomPill.save.emptyQuery.closeText ||
                                                'Close',
                                            title:
                                                dictionary.queriesSidebar?.editCustomPill.save.emptyQuery.title ||
                                                'Query cannot be empty',
                                        });
                                        setIsLoading(false);
                                        return;
                                    } else if (hasTitleUpdate) {
                                        const { error } = await validateName(newTitle, tag);
                                        if (error) {
                                            Modal.error({
                                                content: (
                                                    <Typography.Text>
                                                        {dictionary.queriesSidebar?.editCustomPill?.nameAlreadyExist
                                                            ?.description ||
                                                            'A custom query with this name already exists. Please assign a unique name.'}
                                                    </Typography.Text>
                                                ),
                                                okText:
                                                    dictionary.queriesSidebar?.editCustomPill?.nameAlreadyExist
                                                        ?.okText || 'Close',
                                                onOk: () => {
                                                    setIsLoading(false);
                                                },
                                                title:
                                                    dictionary.queriesSidebar?.editCustomPill?.nameAlreadyExist
                                                        ?.message || 'Name already in use',
                                            });
                                        }
                                    }
                                    const { data, error } = await getFiltersByPill(queryPill.id);
                                    Modal.confirm({
                                        cancelText:
                                            dictionary.queriesSidebar?.editCustomPill?.save?.confirmation?.cancelText ||
                                            'Cancel',
                                        className: styles.saveEditionModal,
                                        content: (
                                            <>
                                                <Typography.Text>
                                                    {dictionary.queriesSidebar?.editCustomPill?.save?.confirmation?.message?.replace(
                                                        '{title}',
                                                        newTitle.toUpperCase(),
                                                    ) ||
                                                        'You are about to edit the custom query "{title}", which may affect your results.'}
                                                </Typography.Text>
                                                {(data?.length > 0 || error) && (
                                                    <div className={styles.existingFilters}>
                                                        <Typography.Text strong>
                                                            {dictionary.queriesSidebar?.editCustomPill?.save
                                                                ?.confirmation?.existingFilters ||
                                                                'Affected saved filters:'}
                                                        </Typography.Text>
                                                        {error && (
                                                            <div className={styles.error}>
                                                                <WarningFilled className={styles.errorIcon} />
                                                                {dictionary.queriesSidebar?.editCustomPill?.save
                                                                    ?.confirmation?.existingFiltersError ||
                                                                    'We are currently unable to fetch your list of filters.'}
                                                            </div>
                                                        )}
                                                        {!error && (
                                                            <ul className={styles.list}>
                                                                {data.map((filter: ISavedFilter) => (
                                                                    <li key={filter.id}>{filter.title}</li>
                                                                ))}
                                                            </ul>
                                                        )}
                                                    </div>
                                                )}
                                            </>
                                        ),
                                        icon: <ExclamationCircleOutlined className={styles.icon} />,
                                        okText:
                                            dictionary.queriesSidebar?.editCustomPill?.save?.confirmation?.okText ||
                                            'Save',
                                        onCancel: () => {
                                            setIsLoading(false);
                                        },
                                        onOk: () => {
                                            editPill(
                                                {
                                                    favorite: queryPill.favorite,
                                                    id: queryPill.id,
                                                    queries: state?.state || [],

                                                    title: newTitle,
                                                    type: SavedFilterTypeEnum.Query,
                                                },
                                                tag,
                                                queryBuilderId,
                                            );

                                            resetValuesOnClose();
                                            setIsLoading(false);
                                        },
                                        title:
                                            dictionary.queriesSidebar?.editCustomPill?.save?.confirmation?.title ||
                                            'Edit this query?',
                                    });
                                }}
                                type="text"
                            >
                                {dictionary.queriesSidebar?.editCustomPill?.saveText || 'Save'}
                            </Button>
                        </div>
                    </div>
                </div>
            </Spin>
        </Modal>
    );
};

export default EditCustomPillModal;
