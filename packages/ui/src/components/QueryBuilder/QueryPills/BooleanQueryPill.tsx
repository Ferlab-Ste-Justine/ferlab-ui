import React from 'react';

import StackLayout from '../../../layout/StackLayout';
import { ISyntheticSqon, IValueFilter, TSqonGroupOp } from '../../../data/sqon/types';
import { isBooleanOperator, isReference } from '../../../data/sqon/utils';
import ReferenceQueryPill from './ReferenceQueryPill';
import FieldQueryPill from './FieldQueryPill';
import Combiner from '../Combiner';
import { IDictionary, TCallbackRemoveAction, TCallbackRemoveReferenceAction } from '../types';

interface IBooleanQueryPillProps {
    parentQueryId: string;
    query: ISyntheticSqon | Record<string, never>;
    isActive: boolean;
    showLabels?: boolean;
    dictionary: IDictionary;
    onRemoveFacet: TCallbackRemoveAction;
    onRemoveReference: TCallbackRemoveReferenceAction;
    onCombineChange?: (id: string, combinator: TSqonGroupOp) => void;
    getColorForReference?: (refIndex: number) => string;
}

const BooleanQueryPill: React.FC<IBooleanQueryPillProps> = (props) => {
    const {
        parentQueryId,
        query,
        isActive,
        showLabels,
        dictionary,
        onRemoveFacet,
        onRemoveReference,
        onCombineChange = (f) => f,
        getColorForReference = () => '',
    } = props;
    const { op, content } = query;

    return (
        <>
            {content.map((f: any, i: number) => (
                <StackLayout key={i}>
                    {isBooleanOperator(f) ? (
                        <BooleanQueryPill {...props} query={f} />
                    ) : isReference(f) ? (
                        <ReferenceQueryPill
                            isBarActive={isActive}
                            refIndex={f as number}
                            onRemove={() => onRemoveReference(f as number, query)}
                            getColorForReference={getColorForReference}
                        />
                    ) : (
                        <FieldQueryPill
                            isBarActive={isActive}
                            dictionary={dictionary}
                            onRemove={onRemoveFacet}
                            query={f as IValueFilter}
                            showLabels={showLabels}
                        />
                    )}
                    {query.content.length - 1 > i && (
                        <Combiner
                            dictionary={dictionary}
                            onChange={(type) => onCombineChange(parentQueryId, type)}
                            type={op}
                        />
                    )}
                </StackLayout>
            ))}
        </>
    );
};

export default BooleanQueryPill;
