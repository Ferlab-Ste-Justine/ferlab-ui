import React, { useEffect, useState } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { Button } from 'antd';
import take from 'lodash/take';
import cx from 'classnames';

import StackLayout from '../../layout/StackLayout';
import UnionOperator from './icons/UnionOperator';
import { IValueFilter } from '../../data/sqon/types';
import { IDictionary } from '../QueryBuilder/types';
import { removeUnderscoreAndCapitalize } from '../../utils/stringUtils';
import ConditionalWrapper from '../utils/ConditionalWrapper';
import { get, isEmpty } from 'lodash';
import { keyEnhance } from '../../data/arranger/formatting';
import { FieldOperators } from '../../data/sqon/operators';
import IntersectionOperator from './icons/IntersectionOperator';

import styles from '@ferlab/style/components/queryBuilder/QueryValues.module.scss';

interface IQueryValuesProps {
    valueFilter: IValueFilter;
    isElement?: boolean;
    onClick?: (e: any) => void;
    dictionary: IDictionary;
}

const QueryValues = ({ isElement = false, valueFilter, onClick, dictionary = {} }: IQueryValuesProps) => {
    const hasMoreValues = valueFilter.content.value.length > 3;
    const [expanded, setExpanded] = useState(false);
    const [values, setValues] = useState(
        hasMoreValues ? take(valueFilter.content.value, 3) : valueFilter.content.value,
    );

    const getValueName = (value: string) => {
        const valueNameMapping = valueFilter.content.valueNameMapping;

        if (valueNameMapping && !isEmpty(valueNameMapping)) {
            if (Object.keys(valueNameMapping).includes(value)) {
                return valueNameMapping[value];
            }
        }

        const facetMapping = get(get(dictionary.query, 'facetValueMapping', {}), valueFilter.content.field, {});
        return removeUnderscoreAndCapitalize(value in facetMapping ? facetMapping[value] : value);
    };

    useEffect(() => {
        const newValues = !hasMoreValues || expanded ? valueFilter.content.value : take(valueFilter.content.value, 3);
        setValues(newValues);
    }, [expanded, valueFilter]);

    return (
        <StackLayout
            onClick={(e) => (onClick ? onClick(e) : undefined)}
            className={cx(styles.queryValuesContainer, onClick && styles.clickable, hasMoreValues && styles.hasMore)}
            flexOwn
        >
            {!isElement ? (
                <ConditionalWrapper
                    condition={onClick !== undefined}
                    wrapper={(children) => <a className={styles.queryValueSelector}>{children}</a>}
                >
                    <>
                        {valueFilter.content.overrideValuesName ? (
                            <StackLayout className={styles.valueWrapper} key={valueFilter.content.overrideValuesName}>
                                <span className={styles.value}>{valueFilter.content.overrideValuesName}</span>
                            </StackLayout>
                        ) : (
                            values.map((v, i) => (
                                <StackLayout className={styles.valueWrapper} key={`${v}-${i}`}>
                                    <span className={styles.value}>
                                        {typeof v == 'string' ? getValueName(keyEnhance(v)) : v}
                                    </span>
                                    {values.length - 1 > i &&
                                        (valueFilter.op === FieldOperators.all ? (
                                            <IntersectionOperator className={styles.operator} />
                                        ) : (
                                            <UnionOperator className={styles.operator} />
                                        ))}
                                </StackLayout>
                            ))
                        )}
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
