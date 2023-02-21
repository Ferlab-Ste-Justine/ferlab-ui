import React, { Fragment, useContext, useEffect, useState } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { Button } from 'antd';
import cx from 'classnames';
import { get } from 'lodash';
import take from 'lodash/take';

import { ArrangerValues, keyEnhance } from '../../data/arranger/formatting';
import { FieldOperators } from '../../data/sqon/operators';
import { IValueFilter, TFilterValue } from '../../data/sqon/types';
import { isSet } from '../../data/sqon/utils';
import { removeUnderscoreAndCapitalize } from '../../utils/stringUtils';
import ConditionalWrapper from '../utils/ConditionalWrapper';

import IntersectionOperator from './icons/IntersectionOperator';
import UnionOperator from './icons/UnionOperator';
import { QueryBuilderContext } from './context';

import styles from './QueryValues.module.scss';

interface IQueryValuesProps {
    valueFilter: IValueFilter;
    isElement?: boolean;
    onClick?: (e: any) => void;
}

const QueryValues = ({ isElement = false, onClick, valueFilter }: IQueryValuesProps) => {
    const { dictionary } = useContext(QueryBuilderContext);
    const hasMoreValues = valueFilter.content.value.length > 3;
    const [expanded, setExpanded] = useState(false);
    const [values, setValues] = useState(
        hasMoreValues ? take(valueFilter.content.value, 3) : valueFilter.content.value,
    );

    const getValueName = (value: string) => {
        if (isSet(valueFilter) && dictionary.query?.setNameResolver) {
            return dictionary.query?.setNameResolver(value);
        }

        const facetMapping = get(get(dictionary.query, 'facetValueMapping', {}), valueFilter.content.field, {});
        return removeUnderscoreAndCapitalize(value in facetMapping ? facetMapping[value] : value);
    };

    const getElementOfValueString = (values: TFilterValue) => {
        const hasValueMissing = values.some((val) => val === ArrangerValues.missing);

        return `[${values.filter((val) => val !== ArrangerValues.missing).join(' , ')}]${
            hasValueMissing ? ` , ${getValueName(keyEnhance(ArrangerValues.missing))}` : ''
        }`;
    };

    useEffect(() => {
        const newValues = !hasMoreValues || expanded ? valueFilter.content.value : take(valueFilter.content.value, 3);
        setValues(newValues);
    }, [expanded, valueFilter]);

    return (
        <div
            className={cx(
                styles.queryValuesContainer,
                onClick && styles.clickable,
                hasMoreValues && !valueFilter.content.overrideValuesName ? styles.hasMore : '',
            )}
            onClick={(e) => (onClick ? onClick(e) : undefined)}
        >
            {!isElement ? (
                <ConditionalWrapper
                    condition={onClick !== undefined}
                    wrapper={(children) => <a className={styles.queryValueSelector}>{children}</a>}
                >
                    <Fragment>
                        {valueFilter.content.overrideValuesName ? (
                            <div className={styles.valueWrapper} key={valueFilter.content.overrideValuesName}>
                                <span className={styles.value}>{valueFilter.content.overrideValuesName}</span>
                            </div>
                        ) : (
                            values.map((v, i) => (
                                <div className={styles.valueWrapper} key={`${v}-${i}`}>
                                    <span className={styles.value}>
                                        {typeof v == 'string' ? getValueName(keyEnhance(v)) : v}
                                    </span>
                                    {values.length - 1 > i &&
                                        (valueFilter.op === FieldOperators.all ? (
                                            <IntersectionOperator className={styles.operator} />
                                        ) : (
                                            <UnionOperator className={styles.operator} />
                                        ))}
                                </div>
                            ))
                        )}
                    </Fragment>
                </ConditionalWrapper>
            ) : (
                <div className={styles.valueWrapper}>
                    <span className={styles.value}>{getElementOfValueString(values)}</span>
                </div>
            )}
            {hasMoreValues &&
                !valueFilter.content.overrideValuesName &&
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
        </div>
    );
};

export default QueryValues;
