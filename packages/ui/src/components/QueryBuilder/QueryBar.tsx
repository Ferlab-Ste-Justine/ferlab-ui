import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import { CopyOutlined, DeleteOutlined, LoadingOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox, notification, Popconfirm, Space, Tooltip } from 'antd';
import cx from 'classnames';
import { isEqual } from 'lodash';
import { v4 as getUUID } from 'uuid';

import {
    IRemoteComponent,
    ISqonGroupFilter,
    ISyntheticSqon,
    IValueQuery,
    TSqonGroupOp,
    TSyntheticSqonContentValue,
} from '../../data/sqon/types';
import { isBooleanOperator, isEmptySqon } from '../../data/sqon/utils';
import { numberFormat } from '../../utils/numberUtils';

import SaveCustomPillModal from './Header/Tools/SaveCustomPillModal';
import BooleanQueryPill from './QueryPills/BooleanQueryPill';
import useQueryBuilderState from './utils/useQueryBuilderState';
import { QueryBuilderContext, QueryCommonContext } from './context';
import {
    IFetchQueryCount,
    IGetResolvedQueryForCount,
    ISaveCustomPillResponse,
    SavedFilterTypeEnum,
    TCallbackRemoveAction,
    TCallbackRemoveQueryAction,
    TCallbackRemoveReferenceAction,
    TOnChange,
} from './types';

import styles from './QueryBar.module.scss';

interface IQueryBarProps {
    id: string;
    Icon: React.ReactNode;
    index: number;
    query: ISyntheticSqon;
    actionDisabled?: boolean;
    selectionDisabled?: boolean;
    onRemoveFacet: TCallbackRemoveAction;
    onRemoveReference: TCallbackRemoveReferenceAction;
    onRemoveQuery: TCallbackRemoveQueryAction;
    isActive?: boolean;
    isSelected?: boolean;
    isReferenced?: boolean;
    onChangeQuery: TOnChange;
    onDeleteQuery: TOnChange;
    onDuplicate: TOnChange;
    onSelectBar: (index: number, toRemove: boolean) => void;
    onCombineChange: (id: string, combinator: TSqonGroupOp) => void;
    getColorForReference: (refIndex: number) => string;
    fetchQueryCount: IFetchQueryCount;
    getResolvedQueryForCount: IGetResolvedQueryForCount;
    remoteComponentMapping?: (props: IRemoteComponent) => void;
    updateQueryById: (id: string, newQuery: ISyntheticSqon) => void;
}
const QueryBar = ({
    actionDisabled = false,
    fetchQueryCount,
    getColorForReference,
    getResolvedQueryForCount,
    Icon,
    id,
    index,
    isActive = true,
    isReferenced = false,
    isSelected = false,
    onChangeQuery,
    onCombineChange,
    onDeleteQuery,
    onDuplicate,
    onRemoveFacet,
    onRemoveQuery,
    onRemoveReference,
    onSelectBar,
    query,
    remoteComponentMapping,
    selectionDisabled = false,
    updateQueryById,
}: IQueryBarProps): JSX.Element => {
    const { customPillConfig, noQueries, queryBuilderId } = useContext(QueryBuilderContext);
    const { dictionary } = useContext(QueryCommonContext);
    const previousQuery = useRef<ISqonGroupFilter | null>(null);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(isSelected);
    const referenceColor = getColorForReference(index);
    const { queryList } = useQueryBuilderState(queryBuilderId);
    const containerClassNames = cx(styles.queryBarContainer, { [styles.selected]: isActive });
    const [isSaveCustomPillModalVisible, setIsSaveCustomPillModalVisible] = useState(false);
    const [isSaveCustomPillLoading, setIsSaveCustomPillLoading] = useState<boolean>(false);
    const [onSaveCustomPillResponse, setOnSaveCustomPillResponse] = useState<ISaveCustomPillResponse>({
        hasError: false,
        message: '',
    });
    const [isSaveCustomPillDisabled, setIsSaveCustomPillDisabled] = useState<boolean>(false);

    useEffect(() => {
        setChecked(isSelected);
    }, [isSelected]);

    useEffect(() => {
        if (queryList.find((cQuery) => cQuery.id === query.id)) {
            const previous = previousQuery.current;
            const current = getResolvedQueryForCount(query, queryList);

            if (!previousQuery.current || !isEqual(previous, current)) {
                previousQuery.current = current;
                setIsLoading(true);
                fetchQueryCount(query, queryList)
                    .then(setTotal)
                    .finally(() => {
                        setIsLoading(false);
                    });
            }
        }
    }, [JSON.stringify(queryList), JSON.stringify(query)]);

    useEffect(() => {
        const hasCustomPill = query.content.filter(
            (queryPart: TSyntheticSqonContentValue) =>
                (queryPart as IValueQuery).title || !(queryPart as IValueQuery).content,
        );
        setIsSaveCustomPillDisabled(!!hasCustomPill.length);
    }, [query]);

    return (
        <div className={styles.queryBarWrapper}>
            <div
                className={cx(styles.identifier, isActive ? styles.active : '')}
                style={isReferenced ? { background: referenceColor! } : {}}
            />
            <div
                className={containerClassNames}
                onClick={() => {
                    if (!isActive) {
                        onChangeQuery(id, query);
                    }
                }}
            >
                {!selectionDisabled && (
                    <Space
                        className={styles.selectionWrapper}
                        direction="horizontal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Checkbox
                            checked={checked}
                            className={styles.label}
                            onClick={(e) => {
                                e.stopPropagation();
                                setChecked(!checked);
                                onSelectBar(index, checked);
                            }}
                        >
                            {`Q${index + 1}`}
                        </Checkbox>
                    </Space>
                )}
                <Space className={styles.queryContent}>
                    {isEmptySqon(query) ? (
                        <div>
                            {dictionary.query?.noQuery || 'Use the search tools & facets on the left to build a query'}
                        </div>
                    ) : (
                        isBooleanOperator(query) && (
                            <Space className={styles.queryValues}>
                                <BooleanQueryPill
                                    getColorForReference={getColorForReference}
                                    isActive={isActive}
                                    onCombineChange={onCombineChange}
                                    onRemoveFacet={onRemoveFacet}
                                    onRemoveQuery={onRemoveQuery}
                                    onRemoveReference={onRemoveReference}
                                    parentQueryId={id}
                                    query={query}
                                    remoteComponentMapping={remoteComponentMapping}
                                />
                            </Space>
                        )
                    )}
                    <span className={styles.total}>
                        {Icon} {isLoading ? <LoadingOutlined spin /> : numberFormat(total)}
                    </span>
                </Space>
                {!actionDisabled && (
                    <Space className={styles.actions} size={4}>
                        <Tooltip
                            title={
                                isSaveCustomPillDisabled
                                    ? dictionary.actions?.saveCustomPill?.tooltip?.disabled ||
                                      'Custom queries cannot include other custom queries'
                                    : dictionary.actions?.saveCustomPill?.tooltip?.enabled || 'Save as a custom query'
                            }
                        >
                            <Button
                                className={`${styles.actionButton} ${styles.actionButtonWithTooltip}`}
                                disabled={isSaveCustomPillDisabled}
                                icon={<SaveOutlined />}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsSaveCustomPillModalVisible(true);
                                }}
                                size="small"
                                type="text"
                            />
                        </Tooltip>
                        <Button
                            className={styles.actionButton}
                            icon={<CopyOutlined />}
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                onDuplicate(id, query);
                            }}
                            type="text"
                        />
                        <Popconfirm
                            arrowPointAtCenter
                            cancelText={dictionary.actions?.delete?.cancel || 'Cancel'}
                            disabled={noQueries}
                            getPopupContainer={(trigger) => trigger.parentElement!}
                            okText={dictionary.actions?.delete?.confirm || 'Delete'}
                            onConfirm={(e) => {
                                e!.stopPropagation();
                                onDeleteQuery(id, query);
                            }}
                            placement="topLeft"
                            title={dictionary.actions?.delete?.title || 'Delete this query?'}
                        >
                            <Button
                                className={styles.actionButton}
                                icon={<DeleteOutlined />}
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                }}
                                type="text"
                            />
                        </Popconfirm>
                    </Space>
                )}
            </div>
            {isSaveCustomPillModalVisible && (
                <SaveCustomPillModal
                    isLoading={isSaveCustomPillLoading}
                    onCancel={() => {
                        setIsSaveCustomPillModalVisible(false);
                        setOnSaveCustomPillResponse({ hasError: false, message: undefined });
                    }}
                    onSubmit={async (title) => {
                        setIsSaveCustomPillLoading(true);
                        if (customPillConfig?.createCustomPill) {
                            await customPillConfig
                                .createCustomPill(
                                    {
                                        favorite: false,
                                        id: getUUID(),
                                        queries: [query],
                                        title,
                                        type: SavedFilterTypeEnum.Query,
                                    },
                                    customPillConfig.tag || '',
                                )
                                .then((response: any) => {
                                    if (response.error) {
                                        if (response.error.message === 'Already exists') {
                                            setOnSaveCustomPillResponse({
                                                hasError: true,
                                                message:
                                                    dictionary.actions?.saveCustomPill?.form?.error
                                                        ?.nameAlreadyExists || 'A query with this name already exists',
                                            });
                                        } else if (response.error.message === 'Invalid format') {
                                            setOnSaveCustomPillResponse({
                                                hasError: true,
                                                message:
                                                    dictionary.actions?.saveCustomPill?.form?.error?.invalidFormat ||
                                                    'Invalid format, special character not authorized',
                                            });
                                        } else {
                                            setOnSaveCustomPillResponse({ hasError: false, message: undefined });
                                            setIsSaveCustomPillModalVisible(false);
                                        }
                                    } else {
                                        if (response?.payload?.queries?.[0]) {
                                            const newContent = [
                                                {
                                                    content: response.payload.queries[0].content,
                                                    id: response.payload.id,
                                                    op: response.payload.queries[0].op,
                                                    title: response.payload.title,
                                                },
                                            ];
                                            const newQuery = { ...query, content: newContent };
                                            updateQueryById(id, newQuery);
                                        }
                                        setOnSaveCustomPillResponse({ hasError: false, message: undefined });
                                        setIsSaveCustomPillModalVisible(false);
                                    }
                                    setIsSaveCustomPillLoading(false);
                                });
                        }
                    }}
                    saveCustomPillResponse={onSaveCustomPillResponse}
                    visible={isSaveCustomPillModalVisible}
                />
            )}
        </div>
    );
};

export default QueryBar;
