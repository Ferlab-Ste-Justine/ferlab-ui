import React, { useEffect, useState } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { Button } from 'antd';
import take from 'lodash/take';

import StackLayout from '../../layout/StackLayout';
import UnionOperator from './icons/UnionOperator';
import { IValueFilter } from '../../data/sqon/types';

import styles from '@ferlab/style/components/queryBuilder/QueryValues.module.scss';
import ConditionalWrapper from '../utils/ConditionalWrapper';

interface IQueryValuesProps {
    query: IValueFilter;
    isElement?: boolean;
    onClick?: (e: any) => void;
}

const QueryValues = ({ isElement = false, query, onClick }: IQueryValuesProps) => {
    const hasMoreValues = query.content.value.length > 3;
    const [expanded, setExpanded] = useState(false);
    const [values, setValues] = useState(hasMoreValues ? take(query.content.value, 3) : query.content.value);

    useEffect(() => {
        const newValues = !hasMoreValues || expanded ? query.content.value : take(query.content.value, 3);
        setValues(newValues);
    }, [expanded, query]);
    const totalValues = values.length;
    return (
        <StackLayout
            onClick={(e) => (onClick ? onClick(e) : undefined)}
            className={`${styles.queryValuesContainer} ${onClick && styles.clickable}`}
        >
            {!isElement ? (
                <ConditionalWrapper
                    condition={onClick !== undefined}
                    wrapper={(children) => <a className={styles.queryValueSelector}>{children}</a>}
                >
                    <>
                        {values.map((v, i) => (
                            <StackLayout className={styles.valueWrapper} key={`${v}-${i}`}>
                                <span className={styles.value}>{v}</span>
                                {totalValues - 1 > i && <UnionOperator className={styles.operator} />}
                            </StackLayout>
                        ))}
                    </>
                </ConditionalWrapper>
            ) : (
                <StackLayout className={styles.valueWrapper}>
                    <span className={styles.value}>[{values.join(',')}]</span>
                </StackLayout>
            )}
            {hasMoreValues &&
                (expanded ? (
                    <Button
                        className={`${styles.button} ${styles.icon}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(false);
                        }}
                        type="text"
                    >
                        <AiFillCaretLeft />
                    </Button>
                ) : (
                    <Button
                        className={`${styles.button} ${styles.icon}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(true);
                        }}
                        type="text"
                    >
                        <AiFillCaretRight />
                    </Button>
                ))}
        </StackLayout>
    );
};

export default QueryValues;
