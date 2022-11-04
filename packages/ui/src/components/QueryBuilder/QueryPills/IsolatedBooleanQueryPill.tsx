import { cloneDeep } from 'lodash';
import React from 'react';
import { ISqonGroupFilter, IValueFilter } from '../../../data/sqon/types';
import FieldQueryPill from './FieldQueryPill';

interface ISingleBoolenQueryPillProps {
    isBarActive?: boolean;
    onRemove: () => void;
    contentValue: ISqonGroupFilter;
}

const IsolatedBooleanQueryPill = ({ contentValue, onRemove, isBarActive }: ISingleBoolenQueryPillProps) => {
    const newQueryDict: { [content: string]: any } = {};
    
    contentValue.content.forEach((f: any) => {
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
        ...contentValue,
        content: Object.entries(newQueryDict).map((kv: any) => kv[1]),
    };

    return (
        <FieldQueryPill
            isBarActive={isBarActive}
            onRemove={onRemove}
            valueFilter={newQuery.content[0] as IValueFilter}
        />
    );
};

export default IsolatedBooleanQueryPill;
