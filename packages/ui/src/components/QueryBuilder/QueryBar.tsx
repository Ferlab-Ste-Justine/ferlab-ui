import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineCopy, AiOutlineDelete } from 'react-icons/ai';
import { Button, Checkbox, Popconfirm, Space, Tooltip } from 'antd';
import cx from 'classnames';

import BooleanQueryPill from './QueryPills/BooleanQueryPill';
import {
    IDictionary,
    IFacetFilterConfig,
    IFetchQueryCount,
    IGetResolvedQueryForCount,
    TCallbackRemoveAction,
    TCallbackRemoveReferenceAction,
    TOnChange,
} from './types';
import { ISqonGroupFilter, ISyntheticSqon, TSqonGroupOp } from '../../data/sqon/types';
import { isBooleanOperator, isEmptySqon } from '../../data/sqon/utils';
import { numberFormat } from '../../utils/numberUtils';
import { LoadingOutlined } from '@ant-design/icons';
import useQueryBuilderState from './utils/useQueryBuilderState';
import { isEqual } from 'lodash';

import styles from '@ferlab/style/components/queryBuilder/QueryBar.module.scss';

interface IQueryBarProps {
    id: string;
    queryBuilderId: string;
    Icon: React.ReactNode;
    index: number;
    dictionary?: IDictionary;
    query: ISyntheticSqon;
    actionDisabled?: boolean;
    selectionDisabled?: boolean;
    canDelete?: boolean;
    showLabels?: boolean;
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
    facetFilterConfig: IFacetFilterConfig;
    fetchQueryCount: IFetchQueryCount;
    getResolvedQueryForCount: IGetResolvedQueryForCount;
}
const QueryBar = ({
    id,
    Icon,
    index,
    dictionary = {},
    query,
    queryBuilderId,
    onRemoveFacet,
    onRemoveReference,
    actionDisabled = false,
    selectionDisabled = false,
    canDelete = true,
    showLabels = true,
    isActive = true,
    isSelected = false,
    isReferenced = false,
    onChangeQuery,
    onDeleteQuery,
    onDuplicate,
    onCombineChange,
    onSelectBar,
    getColorForReference,
    facetFilterConfig,
    fetchQueryCount,
    getResolvedQueryForCount,
}: IQueryBarProps) => {
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
        const previous = previousQuery.current;
        const current = getResolvedQueryForCount(query);

        if (!previousQuery.current || !isEqual(previous, current)) {
            previousQuery.current = current;
            setIsLoading(true);
            fetchQueryCount(query)
                .then(setTotal)
                .finally(() => {
                    setIsLoading(false);
                });
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
                                    dictionary={dictionary}
                                    showLabels={showLabels}
                                    onRemoveFacet={onRemoveFacet}
                                    onRemoveReference={onRemoveReference}
                                    onCombineChange={onCombineChange}
                                    getColorForReference={getColorForReference}
                                    facetFilterConfig={facetFilterConfig}
                                />
                            </Space>
                        )
                    )}
                    <span className={styles.total}>
                        {Icon} {isLoading ? <LoadingOutlined spin /> : numberFormat(total)}
                    </span>
                </Space>
                {!actionDisabled && (
                    <Space className={styles.actions} size={16}>
                        <Button
                            className={styles.actionButton}
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                                onDuplicate(id, query);
                            }}
                            type="text"
                        >
                            <AiOutlineCopy size={18} />
                        </Button>
                        <Popconfirm
                            arrowPointAtCenter
                            cancelText={dictionary.actions?.delete?.cancel || 'Cancel'}
                            disabled={!canDelete}
                            okText={dictionary.actions?.delete?.confirm || 'Delete'}
                            onConfirm={(e) => {
                                e!.stopPropagation();
                                onDeleteQuery(id, query);
                            }}
                            placement="topRight"
                            title={dictionary.actions?.delete?.title || 'Delete this query?'}
                            getPopupContainer={(trigger) => trigger.parentElement!}
                        >
                            <Button
                                className={styles.actionButton}
                                onClick={(e: React.MouseEvent) => {
                                    e.stopPropagation();
                                }}
                                type="text"
                            >
                                <AiOutlineDelete size={18} />
                            </Button>
                        </Popconfirm>
                    </Space>
                )}
            </div>
        </div>
    );
};

export default QueryBar;
