import { Button, Checkbox, Popconfirm, Space } from 'antd';
import cx from 'classnames';
import React, { useEffect, useRef, useState } from 'react';

import { CopyOutlined, DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { isEqual } from 'lodash';
import { ISqonGroupFilter, ISyntheticSqon, TSqonGroupOp } from '../../data/sqon/types';
import { isBooleanOperator, isEmptySqon } from '../../data/sqon/utils';
import { numberFormat } from '../../utils/numberUtils';
import BooleanQueryPill from './QueryPills/BooleanQueryPill';
import {
    IFetchQueryCount,
    IGetResolvedQueryForCount,
    TCallbackRemoveAction,
    TCallbackRemoveReferenceAction,
    TOnChange
} from './types';
import useQueryBuilderState from './utils/useQueryBuilderState';

import styles from '@ferlab/style/components/queryBuilder/QueryBar.module.scss';
import { useContext } from 'react';
import { QueryBuilderContext } from './context';

interface IQueryBarProps {
    id: string;
    Icon: React.ReactNode;
    index: number;
    query: ISyntheticSqon;
    actionDisabled?: boolean;
    selectionDisabled?: boolean;
    onRemoveFacet: TCallbackRemoveAction;
    onRemoveReference: TCallbackRemoveReferenceAction;
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
}
const QueryBar = ({
    id,
    Icon,
    index,
    query,
    onRemoveFacet,
    onRemoveReference,
    actionDisabled = false,
    selectionDisabled = false,
    isActive = true,
    isSelected = false,
    isReferenced = false,
    onChangeQuery,
    onDeleteQuery,
    onDuplicate,
    onCombineChange,
    onSelectBar,
    getColorForReference,
    fetchQueryCount,
    getResolvedQueryForCount,
}: IQueryBarProps) => {
    const { queryBuilderId, dictionary, noQueries } = useContext(QueryBuilderContext);
    const previousQuery = useRef<ISqonGroupFilter | null>(null);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [checked, setChecked] = useState(isSelected);
    const referenceColor = getColorForReference(index);
    const { queryList } = useQueryBuilderState(queryBuilderId);
    const containerClassNames = cx(styles.queryBarContainer, { [styles.selected]: isActive });

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
                        direction="horizontal"
                        className={styles.selectionWrapper}
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
                                    parentQueryId={id}
                                    query={query}
                                    isActive={isActive}
                                    onRemoveFacet={onRemoveFacet}
                                    onRemoveReference={onRemoveReference}
                                    onCombineChange={onCombineChange}
                                    getColorForReference={getColorForReference}
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
                        <Button
                            className={styles.actionButton}
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                onDuplicate(id, query);
                            }}
                            type="text"
                            icon={<CopyOutlined />}
                        />
                        <Popconfirm
                            arrowPointAtCenter
                            cancelText={dictionary.actions?.delete?.cancel || 'Cancel'}
                            disabled={noQueries}
                            okText={dictionary.actions?.delete?.confirm || 'Delete'}
                            onConfirm={(e) => {
                                e!.stopPropagation();
                                onDeleteQuery(id, query);
                            }}
                            placement="topLeft"
                            title={dictionary.actions?.delete?.title || 'Delete this query?'}
                            getPopupContainer={(trigger) => trigger.parentElement!}
                        >
                            <Button
                                className={styles.actionButton}
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                }}
                                type="text"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </Space>
                )}
            </div>
        </div>
    );
};

export default QueryBar;
