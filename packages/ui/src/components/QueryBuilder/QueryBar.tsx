import React, { useEffect, useState } from 'react';
import { AiOutlineCopy, AiOutlineDelete } from 'react-icons/ai';
import { Button, Checkbox, Popconfirm } from 'antd';
import cx from 'classnames';

import StackLayout from '../../layout/StackLayout';
import { IDictionary, TCallbackRemoveAction, TCallbackRemoveReferenceAction, TOnChange, TOnFacetClick } from './types';
import { ISyntheticSqon, TSqonGroupOp } from '../../data/sqon/types';
import { isBooleanOperator, isEmptySqon } from '../../data/sqon/utils';
import BooleanQueryPill from './QueryPills/BooleanQueryPill';
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
    selectedFilterContent?: React.ReactElement;
    enableFacetFilter?: boolean;
    onFacetClick?: TOnFacetClick;
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
}
const QueryBar = ({
    id,
    Icon,
    index,
    total,
    dictionary = {},
    query,
    enableFacetFilter,
    onFacetClick,
    onRemoveFacet,
    onRemoveReference,
    actionDisabled = false,
    selectionDisabled = false,
    canDelete = true,
    showLabels = true,
    selectedFilterContent,
    isActive = true,
    isSelected = false,
    isReferenced = false,
    onChangeQuery,
    onDeleteQuery,
    onDuplicate,
    onCombineChange,
    onSelectBar,
    getColorForReference,
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
                                enableFacetFilter={enableFacetFilter}
                                onFacetClick={onFacetClick}
                                onRemoveFacet={onRemoveFacet}
                                onRemoveReference={onRemoveReference}
                                onCombineChange={onCombineChange}
                                getColorForReference={getColorForReference}
                                selectedFilterContent={selectedFilterContent}
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
                    <Button
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
                            onClick={(e: React.MouseEvent) => {
                                e.stopPropagation();
                            }}
                            type="text"
                        >
                            <AiOutlineDelete size={18} />
                        </Button>
                    </Popconfirm>
                </StackLayout>
            )}
        </StackLayout>
    );
};

export default QueryBar;
