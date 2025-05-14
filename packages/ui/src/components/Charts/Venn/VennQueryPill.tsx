import React, { useContext } from 'react';
import { Tag, Tooltip } from 'antd';

import { FieldOperators } from '../../../data/sqon/operators';
import { ISyntheticSqon, SET_ID_PREFIX, TFilterValue, TSyntheticSqonContentValue } from '../../../data/sqon/types';
import { QueryDictionaryContext } from '../../QueryBuilder/context';
import { Operator } from '../../QueryBuilder/QueryPills/FieldQueryPill';
import { IDictionary } from '../../QueryBuilder/types';

import styles from './VennQueryPill.module.css';

const JOIN_STRING = ', ';

type TVennQueryPill = {
    sqon: ISyntheticSqon;
};

type TFilter = {
    field: string;
    op: string;
    value: string[];
};

type TPillTag = {
    field: string;
    operator: string;
    value: TFilterValue;
    dictionary: IDictionary;
};

const isSet = (value: TFilterValue): boolean => value.toString().startsWith(SET_ID_PREFIX);

const flattenSqon = (filters: any[], sqonContent: TSyntheticSqonContentValue, operator: string) => {
    // TODO: not supported at the moment
    if (typeof sqonContent == 'number') {
        return;
    }

    if ('field' in sqonContent && 'value' in sqonContent) {
        filters.push({
            field: sqonContent.field,
            op: operator,
            value: sqonContent.value,
        });
    }

    if ('content' in sqonContent && 'op' in sqonContent) {
        if ('field' in sqonContent.content && 'value' in sqonContent.content) {
            filters.push({
                field: sqonContent.content.field,
                op: sqonContent.op,
                value: sqonContent.content.value,
            });
        }

        if (Array.isArray(sqonContent.content)) {
            sqonContent.content.forEach((content) => {
                flattenSqon(filters, content, operator);
            });
        }
    }
};

const PillTag = ({ dictionary, field, operator, value }: TPillTag) => (
    <Tag>
        <div className={styles.vennQueryPill}>
            <span>{dictionary.query?.facet ? dictionary.query?.facet(field) : field}</span>
            {isSet(value) ? <Operator type={FieldOperators.between} /> : <Operator type={operator} />}
            <Tooltip style={{ zIndex: 100000 }} title={value.join(JOIN_STRING)}>
                <span className={styles.value}>
                    {isSet(value) && dictionary.query?.setNameResolver
                        ? dictionary.query?.setNameResolver(value.toString())
                        : value.join(JOIN_STRING)}
                </span>
            </Tooltip>
        </div>
    </Tag>
);

const VennQueryPill = ({ sqon }: TVennQueryPill): JSX.Element => {
    const { dictionary } = useContext(QueryDictionaryContext);
    const valueFilter: TFilter[] = [];

    if (Array.isArray(sqon.content)) {
        sqon.content.forEach((content) => {
            flattenSqon(valueFilter, content, sqon.op);
        });
    } else {
        flattenSqon(valueFilter, sqon.content, sqon.op);
    }

    return (
        <>
            {valueFilter.map(({ field, op, value }, index) => (
                <>
                    <PillTag dictionary={dictionary} field={field} key={field} operator={op} value={value} />
                    {index < valueFilter.length - 1 && <span className={styles.op}>{sqon.op}</span>}
                </>
            ))}
        </>
    );
};

export default VennQueryPill;
