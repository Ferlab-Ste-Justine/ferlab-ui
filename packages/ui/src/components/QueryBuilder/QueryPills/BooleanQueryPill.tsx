import React, { Fragment } from 'react';

import { Space } from 'antd';
import { ISyntheticSqon, IValueFilter, TSqonGroupOp } from '../../../data/sqon/types';
import { isBooleanOperator, isReference, isSet } from '../../../data/sqon/utils';
import Combiner from '../Combiner';
import { TCallbackRemoveAction, TCallbackRemoveReferenceAction } from '../types';
import FieldQueryPill from './FieldQueryPill';
import ReferenceQueryPill from './ReferenceQueryPill';
import SetQueryPill from './SetQueryPill';

interface IBooleanQueryPillProps {
    isActive: boolean;
    parentQueryId: string;
    query: ISyntheticSqon | Record<string, never>;
    onRemoveFacet: TCallbackRemoveAction;
    onRemoveReference: TCallbackRemoveReferenceAction;
    onCombineChange?: (id: string, combinator: TSqonGroupOp) => void;
    getColorForReference?: (refIndex: number) => string;
}

const isNotEnd = (props: IBooleanQueryPillProps, index: number) => props.query.content.length - 1 > index;

const BooleanQueryPill = (props: IBooleanQueryPillProps) => (
    <Fragment>
        {props.query.content.map((f: any, i: number) => (
            <Space key={i} size={0} style={{ padding: '2px 0px' }}>
                {isBooleanOperator(f) ? (
                    <BooleanQueryPill {...props} query={f} />
                ) : isReference(f) ? (
                    <ReferenceQueryPill
                        isBarActive={props.isActive}
                        refIndex={f as number}
                        onRemove={() => props.onRemoveReference(f as number, props.query)}
                        getColorForReference={props.getColorForReference}
                    />
                ) : isSet(f) ? (
                    <SetQueryPill
                        isBarActive={props.isActive}
                        valueFilter={f as IValueFilter}
                        onRemove={() => props.onRemoveReference(f as number, props.query)}
                    />
                ) : (
                    <FieldQueryPill
                        isBarActive={props.isActive}
                        onRemove={() => props.onRemoveFacet(f, props.query)}
                        valueFilter={f as IValueFilter}
                    />
                )}
                {isNotEnd(props, i) && (
                    <Combiner
                        onChange={(type) => props.onCombineChange!(props.parentQueryId, type)}
                        type={props.query.op}
                    />
                )}
            </Space>
        ))}
    </Fragment>
);

export default BooleanQueryPill;
