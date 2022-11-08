import { Space } from 'antd';
import React, { Fragment } from 'react';
import { ISqonGroupFilter, ISyntheticSqon, IValueContent, IValueFilter, TSqonGroupOp } from '../../../data/sqon/types';
import { isBooleanOperator, isReference, isSet } from '../../../data/sqon/utils';
import Combiner from '../Combiner';
import { TCallbackRemoveAction, TCallbackRemoveReferenceAction } from '../types';
import FieldQueryPill from './FieldQueryPill';
import IsolatedBooleanQueryPill from './IsolatedBooleanQueryPill';
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

const isNotEnd = (content: any[], index: number) => content.length - 1 > index;

const BooleanQueryPill = (props: IBooleanQueryPillProps) => (
    <Fragment>
        {props.query.content.map((f: any, i: number) => (
            <Space key={i} size={0} style={{ padding: '2px 0px' }}>
                {f.skipBooleanOperatorCheck ? (
                    <IsolatedBooleanQueryPill
                        isBarActive={props.isActive}
                        onRemove={() =>
                            props.onRemoveFacet(
                                ((f as ISqonGroupFilter).content[0].content as IValueContent).field,
                                props.query,
                            )
                        }
                        contentValue={f as ISqonGroupFilter}
                    />
                ) : isBooleanOperator(f) ? (
                    <BooleanQueryPill {...props} query={f} />
                ) : isReference(f) ? (
                    <ReferenceQueryPill
                        getColorForReference={props.getColorForReference}
                        isBarActive={props.isActive}
                        onRemove={() => props.onRemoveReference(f as number, props.query)}
                        refIndex={f as number}
                    />
                ) : isSet(f) ? (
                    <SetQueryPill
                        isBarActive={props.isActive}
                        onRemove={() => props.onRemoveFacet((f as IValueFilter).content.field, props.query)}
                        valueFilter={f as IValueFilter}
                    />
                ) : (
                    <FieldQueryPill
                        isBarActive={props.isActive}
                        onRemove={() => props.onRemoveFacet((f as IValueFilter).content.field, props.query)}
                        valueFilter={f as IValueFilter}
                    />
                )}
                {isNotEnd(props.query.content, i) && (
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
