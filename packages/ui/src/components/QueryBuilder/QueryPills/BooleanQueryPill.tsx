import React from 'react';

import StackLayout from '../../../layout/StackLayout';
import { ISyntheticSqon, IValueFilter, TSqonGroupOp } from '../../../data/sqon/types';
import { isBooleanOperator, isReference } from '../../../data/sqon/utils';
import ReferenceQueryPill from './ReferenceQueryPill';
import FieldQueryPill from './FieldQueryPill';
import Combiner from '../Combiner';
import {
    IDictionary,
    IFacetFilterConfig,
    TCallbackRemoveAction,
    TCallbackRemoveReferenceAction,
} from '../types';

interface IBooleanQueryPillProps {
    parentQueryId: string;
    query: ISyntheticSqon | Record<string, never>;
    isActive: boolean;
    showLabels?: boolean;
    dictionary: IDictionary;
    facetFilterConfig: IFacetFilterConfig;
    onRemoveFacet: TCallbackRemoveAction;
    onRemoveReference: TCallbackRemoveReferenceAction;
    onCombineChange?: (id: string, combinator: TSqonGroupOp) => void;
    getColorForReference?: (refIndex: number) => string;
}

const isNotEnd = (props: IBooleanQueryPillProps, index: number) => props.query.content.length - 1 > index;

const BooleanQueryPill = (props: IBooleanQueryPillProps) => (
    <>
        {props.query.content.map((f: any, i: number) => (
            <StackLayout key={i}>
                {isBooleanOperator(f) ? (
                    <BooleanQueryPill {...props} query={f} />
                ) : isReference(f) ? (
                    <ReferenceQueryPill
                        isBarActive={props.isActive}
                        refIndex={f as number}
                        onRemove={() => props.onRemoveReference(f as number, props.query)}
                        getColorForReference={props.getColorForReference}
                    />
                ) : (
                    <FieldQueryPill
                        isBarActive={props.isActive}
                        dictionary={props.dictionary}
                        onRemove={() => props.onRemoveFacet(f, props.query)}
                        query={f as IValueFilter}
                        showLabels={props.showLabels}
                        facetFilterConfig={props.facetFilterConfig}
                    />
                )}
                {isNotEnd(props, i) && (
                    <Combiner
                        dictionary={props.dictionary}
                        onChange={(type) => props.onCombineChange!(props.parentQueryId, type)}
                        type={props.query.op}
                    />
                )}
            </StackLayout>
        ))}
    </>
);

export default BooleanQueryPill;
