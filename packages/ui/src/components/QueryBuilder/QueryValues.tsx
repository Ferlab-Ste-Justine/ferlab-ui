import React, { useEffect, useState } from 'react';
import { AiFillCaretLeft } from 'react-icons/ai';
import { Button } from 'antd';
import take from 'lodash/take';

import StackLayout from '../../layout/StackLayout';

import UnionOperator from './icons/UnionOperator';
import { IValueFilter } from './types';

import styles from '@ferlab/style/components/queryBuilder/QueryValues.module.scss';

interface IQueryValuesProps {
    query: IValueFilter;
    isElement?: boolean;
}

const QueryValues: React.FC<IQueryValuesProps> = ({ isElement = false, query }) => {
    const hasMoreValues = query.content.value.length > 3;

    const [expanded, setExpanded] = useState(false);
    const [values, setValues] = useState(hasMoreValues ? take(query.content.value, 3) : query.content.value);

    useEffect(() => {
        const newValues = !hasMoreValues || expanded ? query.content.value : take(query.content.value, 3);
        setValues(newValues);
    }, [expanded, query]);
    const totalValues = values.length;
    return (
        <StackLayout className={styles.container}>
            {!isElement ? (
                values.map((v, i) => (
                    <StackLayout className={styles.valueWrapper} key={`${v}-${i}`}>
                        <span className={styles.value}>{v}</span>
                        {totalValues - 1 > i && <UnionOperator className={styles.operator} />}
                    </StackLayout>
                ))
            ) : (
                <StackLayout className={styles.valueWrapper}>
                    <span className={styles.value}>[{values.join(',')}]</span>
                </StackLayout>
            )}
            {hasMoreValues &&
                (expanded ? (
                    <Button
                        className={`${styles.button} ${styles.icon}`}
                        onClick={() => setExpanded(false)}
                        type="text"
                    >
                        <AiFillCaretLeft />
                    </Button>
                ) : (
                    <Button className={styles.button} onClick={() => setExpanded(true)} type="text">
                        ...
                    </Button>
                ))}
        </StackLayout>
    );
};

export default QueryValues;
