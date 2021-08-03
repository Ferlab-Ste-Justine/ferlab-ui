import React, { useEffect, useState } from 'react';
import { AiOutlineCopy, AiOutlineDelete } from 'react-icons/ai';
import { Button, Checkbox, Popconfirm } from 'antd';
import cx from 'classnames';
import isEmpty from 'lodash/isEmpty';

import StackLayout from '../../layout/StackLayout';

import Combiner from './Combiner';
import QueryPill from './QueryPill';
import QueryReferencePill from './QueryReferencePill';
import { IDictionary, TCallbackRemoveAction, TOnChange } from './types';
import { ISyntheticSqon, IValueFilter, TSqonGroupOp } from '../../data/types';

import styles from '@ferlab/style/components/queryBuilder/QueryBar.module.scss';
import { isEmptySqon, isReference } from '../../data/SqonUtils';

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
    isActive?: boolean;
    isSelected?: boolean;
    isReferenced?: boolean;
    onChangeQuery?: TOnChange;
    onDeleteQuery?: TOnChange;
    onDuplicate?: TOnChange;
    onSelectBar?: (index: number, toRemove: boolean) => void;
    onCombineChange?: (id: string, combinator: TSqonGroupOp) => void;
    getColorForReference?: (refIndex: number) => string;
}
const QueryBar: React.FC<IQueryBarProps> = ({
    id,
    Icon,
    index,
    total,
    dictionary = {},
    query,
    onRemoveFacet,
    actionDisabled = false,
    selectionDisabled = false,
    canDelete = true,
    showLabels = true,
    isActive = true,
    isSelected = false,
    isReferenced = false,
    onChangeQuery = (f) => f,
    onDeleteQuery = (f) => f,
    onDuplicate = (f) => f,
    onCombineChange = (f) => f,
    onSelectBar = (f) => f,
    getColorForReference = (f) => '',
}) => {
    const [checked, setChecked] = useState(isSelected);
    useEffect(() => {
        setChecked(isSelected);
    }, [isSelected]);
    const referenceColor = getColorForReference(index);
    const containerClassNames = cx(styles.container, { [styles.selected]: isActive });

    console.log(isEmptySqon(query))

    return (
        <StackLayout
            className={containerClassNames}
            fitContent
            flexContent
            onClick={() => {
                if (!isActive) onChangeQuery(id, query);
            }}
        >
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
                        {String(index + 1).padStart(2, 'Q')}
                    </Checkbox>
                </StackLayout>
            )}
            <StackLayout className={styles.queryContent} flexContent>
                <div className={styles.identifier} style={isReferenced ? { background: referenceColor! } : {}} />
                {isEmptySqon(query) ? (
                    <StackLayout>{dictionary.query?.noQuery || 'Use the filters to build a query'}</StackLayout>
                ) : (
                    <StackLayout className={styles.queryValues} fitContent flexContent>
                        {query.content.map((f, i) => (
                            <StackLayout key={i}>
                                {isReference(f) ? (
                                    <QueryReferencePill
                                        currentSelectedQuery={isActive}
                                        refIndex={f as number}
                                        onRemove={onRemoveFacet}
                                        getColorForReference={getColorForReference}
                                    />
                                ) : (
                                    <QueryPill
                                        currentSelectedQuery={isActive}
                                        dictionary={dictionary}
                                        onRemove={onRemoveFacet}
                                        query={f as IValueFilter}
                                        showLabels={showLabels}
                                    />
                                )}
                                {query.content.length - 1 > i && (
                                    <Combiner
                                        dictionary={dictionary}
                                        onChange={(type) => onCombineChange(id, type)}
                                        type={query.op}
                                    />
                                )}
                            </StackLayout>
                        ))}
                    </StackLayout>
                )}
                <span className={styles.total}>
                    {Icon} {total}
                </span>
            </StackLayout>
            {!actionDisabled && (
                <StackLayout className={styles.actions}>
                    <Button
                        onClick={(e) => {
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
                        onConfirm={() => {
                            onDeleteQuery(id, query);
                        }}
                        placement="topRight"
                        title={dictionary.actions?.delete?.title || 'Delete this query?'}
                    >
                        <Button
                            onClick={(e) => {
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
