import React, { useEffect, useState } from 'react';
import { AiOutlineCopy, AiOutlineDelete } from 'react-icons/ai';
import { Button, Checkbox, Popconfirm, Space, Tooltip } from 'antd';
import cx from 'classnames';

import BooleanQueryPill from './QueryPills/BooleanQueryPill';
import {
    IDictionary,
    IFacetFilterConfig,
    TCallbackRemoveAction,
    TCallbackRemoveReferenceAction,
    TOnChange,
} from './types';
import { ISyntheticSqon, TSqonGroupOp } from '../../data/sqon/types';
import { isBooleanOperator, isEmptySqon } from '../../data/sqon/utils';
import { numberFormat } from '../../utils/numberUtils';

import styles from '@ferlab/style/components/queryBuilder/QueryBar.module.scss';
import { LoadingOutlined } from '@ant-design/icons';

interface IQueryBarProps {
    id: string;
    Icon: React.ReactNode;
    total: number;
    index: number;
    loading?: boolean;
    dictionary?: IDictionary;
    query: ISyntheticSqon | Record<string, never>;
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
}
const QueryBar = ({
    id,
    Icon,
    index,
    total,
    loading = false,
    dictionary = {},
    query,
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
}: IQueryBarProps) => {
    const [checked, setChecked] = useState(isSelected);
    useEffect(() => {
        setChecked(isSelected);
    }, [isSelected]);
    const referenceColor = getColorForReference(index);
    const containerClassNames = cx(styles.queryBarContainer, { [styles.selected]: isActive });

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
                    <Space direction="horizontal" className={styles.selectionWrapper}>
                        <Checkbox
                            checked={checked}
                            className={styles.label}
                            onClick={() => {
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
                        {Icon}{' '}
                        {isActive && loading ? (
                            <LoadingOutlined spin />
                        ) : (
                            numberFormat(isActive ? total : query.total ?? 0)
                        )}
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
