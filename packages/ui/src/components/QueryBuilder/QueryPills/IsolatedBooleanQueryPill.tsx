import React from 'react';
import { cloneDeep } from 'lodash';

import { BooleanOperators, TermOperators } from '../../../data/sqon/operators';
import { ISqonGroupFilter, IValueFilter } from '../../../data/sqon/types';

import FieldQueryPill from './FieldQueryPill';

interface IIsolatedBooleanQueryPillProps {
    isBarActive?: boolean;
    isCustomPillEdition?: boolean;
    onRemove: () => void;
    contentValue: ISqonGroupFilter;
}

const IsolatedBooleanQueryPill = ({
    contentValue,
    isBarActive,
    isCustomPillEdition,
    onRemove,
}: IIsolatedBooleanQueryPillProps): JSX.Element => {
    const newQueryDict: { [content: string]: any } = {};

    contentValue.content.forEach((f: any) => {
        if (newQueryDict.hasOwnProperty(f.content.field)) {
            newQueryDict[f.content.field] = cloneDeep(newQueryDict[f.content.field]);
            newQueryDict[f.content.field].content.value = newQueryDict[f.content.field].content.value.concat(
                f.content.value,
            );
            if (
                contentValue.skipBooleanOperatorCheck &&
                f.op === TermOperators.in &&
                contentValue.op === BooleanOperators.and
            ) {
                newQueryDict[f.content.field].op = TermOperators.all;
            }
        } else {
            newQueryDict[f.content.field] = cloneDeep(f);
        }
    });

    const newQuery = {
        ...contentValue,
        content: Object.entries(newQueryDict).map((kv: any) => kv[1]),
    };

    return (
        <FieldQueryPill
            isBarActive={isBarActive}
            isCustomPillEdition={isCustomPillEdition}
            onRemove={onRemove}
            valueFilter={newQuery.content[0] as IValueFilter}
        />
    );
};

export default IsolatedBooleanQueryPill;
