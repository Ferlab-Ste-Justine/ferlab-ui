import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'antd';
import cx from 'classnames';

import StackLayout from '../../../layout/StackLayout';

import ElementOperator from '../icons/ElementOperator';
import EqualOperator from '../icons/EqualOperator';
import GreaterThanOrEqualOperator from '../icons/GreaterThanOrEqualOperator';
import LessThanOrEqualOperator from '../icons/LessThanOrEqualOperator';
import GreaterThanOperator from '../icons/GreaterThanOperator';
import LessThanOperator from '../icons/LessThanOperator';
import QueryValues from '../QueryValues';
import { IDictionary } from '../types';
import { IValueFilter } from '../../../data/sqon/types';
import { FieldOperators } from '../../../data/sqon/operators';
import { isBooleanFilter, isRangeFilter } from '../../../data/sqon/utils';

import styles from '@ferlab/style/components/queryBuilder/QueryPill.module.scss';

interface IFieldQueryPillProps {
    isBarActive?: boolean;
    query: IValueFilter;
    dictionary?: IDictionary;
    showLabels?: boolean;
    onRemove: Function;
}

interface IOperatorProps {
    type: string;
    className?: string;
}

const Operator = ({ className = '', type }: IOperatorProps) => {
    switch (type) {
        case FieldOperators['>']:
            return <GreaterThanOperator className={className} />;
        case FieldOperators['>=']:
            return <GreaterThanOrEqualOperator className={className} />;
        case FieldOperators['<']:
            return <LessThanOperator className={className} />;
        case FieldOperators['<=']:
            return <LessThanOrEqualOperator className={className} />;
        case FieldOperators.between:
            return <ElementOperator className={className} />;
        default:
            return <EqualOperator className={className} />;
    }
};

const FieldQueryPill = ({ query, dictionary = {}, showLabels, onRemove, isBarActive }: IFieldQueryPillProps) => (
    <StackLayout className={cx(styles.container, { [styles.selected]: isBarActive })}>
        {(showLabels || isBooleanFilter(query) || isRangeFilter(query)) && (
            <>
                <span className={`${styles.field}`}>
                    {dictionary.query?.facet(query.content.field) || query.content.field}
                </span>
                <Operator className={styles.operator} type={query.op} />
            </>
        )}
        <QueryValues isElement={query.op === FieldOperators.between} query={query} />
        <Button className={styles.close} type="text">
            <AiOutlineClose onClick={() => onRemove()} />
        </Button>
    </StackLayout>
);

export default FieldQueryPill;
