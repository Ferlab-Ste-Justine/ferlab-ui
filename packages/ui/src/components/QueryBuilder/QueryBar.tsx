import React, { useEffect, useState } from 'react';
import { AiOutlineCopy, AiOutlineDelete } from 'react-icons/ai';
import { Button, Checkbox, Popconfirm, Tooltip } from 'antd';
import cx from 'classnames';

import StackLayout from '../../layout/StackLayout';
import BooleanQueryPill from './QueryPills/BooleanQueryPill';
import { IDictionary, IFacetFilterConfig, TCallbackRemoveAction, TCallbackRemoveReferenceAction, TOnChange } from './types';
import { ISyntheticSqon, TSqonGroupOp } from '../../data/sqon/types';
import { isBooleanOperator, isEmptySqon } from '../../data/sqon/utils';
import { numberFormat } from '../../utils/numberUtils';

import styles from '@ferlab/style/components/queryBuilder/QueryBar.module.scss';

interface IQueryBarProps {
    id: string;
    Icon: React.ReactNode;
    total: number;
    index: number;
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
    facetFilterConfig
}: IQueryBarProps) => {
    const [checked, setChecked] = useState(isSelected);
    useEffect(() => {
        setChecked(isSelected);
    }, [isSelected]);
    const referenceColor = getColorForReference(index);
    const containerClassNames = cx(styles.queryBarContainer, { [styles.selected]: isActive });

    return (
        <StackLayout
            className={containerClassNames}
            fitContent
            flexContent
            onClick={() => {
                if (!isActive) {
                    onChangeQuery(id, query);
                }
            }}
        >
            <div className={styles.identifier} style={isReferenced ? { background: referenceColor! } : {}} />
            {!selectionDisabled && (
                <StackLayout className={styles.selectionWrapper}>
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
                </StackLayout>
            )}
            <StackLayout className={styles.queryContent} flexContent>
                {isEmptySqon(query) ? (
                    <StackLayout>{dictionary.query?.noQuery || 'Use the filters to build a query'}</StackLayout>
                ) : (
                    isBooleanOperator(query) && (
                        <StackLayout className={styles.queryValues} fitContent flexContent>
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
                        </StackLayout>
                    )
                )}
                <span className={styles.total}>
                    {Icon} {numberFormat(total)}
                </span>
            </StackLayout>
            {!actionDisabled && (
                <StackLayout className={styles.actions}>
                    <Tooltip title={dictionary.actions?.duplicate || 'Duplicate'}>
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
                    </Tooltip>

                    <Tooltip title={dictionary.actions?.delete?.confirm || 'Delete'}>
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
                    </Tooltip>
                </StackLayout>
            )}
        </StackLayout>
    );
};

export default QueryBar;
