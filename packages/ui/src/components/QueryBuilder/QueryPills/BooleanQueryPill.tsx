import React, { Fragment } from 'react';
import { Space } from 'antd';
import cloneDeep from 'lodash/cloneDeep';

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

const isNotEnd = (content: any[], index: number) => content.length - 1 > index;

const BooleanQueryPill = (props: IBooleanQueryPillProps) => {
    const newQueryDict: { [content: string]: any } = {};
    props.query.content.map((f: any) => {
        if (newQueryDict.hasOwnProperty(f.content.field)) {
            newQueryDict[f.content.field] = cloneDeep(newQueryDict[f.content.field]);
            newQueryDict[f.content.field].content.value = newQueryDict[f.content.field].content.value.concat(
                f.content.value,
            );
        } else {
            newQueryDict[f.content.field] = cloneDeep(f);
        }
    });

    const newQuery = {
        content: Object.entries(newQueryDict).map((kv: any) => kv[1]),
        id: props.query.id,
        op: props.query.op,
    };

    return (
        <Fragment>
            {newQuery.content.map((f: any, i: number) => (
                <Space key={i} size={0} style={{ padding: '2px 0px' }}>
                    {isBooleanOperator(f) ? (
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
                            onRemove={() => props.onRemoveReference(f as number, props.query)}
                            valueFilter={f as IValueFilter}
                        />
                    ) : (
                        <FieldQueryPill
                            isBarActive={props.isActive}
                            onRemove={() => props.onRemoveFacet(f, props.query)}
                            valueFilter={f as IValueFilter}
                        />
                    )}
                    {isNotEnd(newQuery.content, i) && (
                        <Combiner
                            onChange={(type) => props.onCombineChange!(props.parentQueryId, type)}
                            type={props.query.op}
                        />
                    )}
                </Space>
            ))}
        </Fragment>
    );
}


export default BooleanQueryPill;
