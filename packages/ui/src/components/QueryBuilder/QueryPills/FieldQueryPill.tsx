import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'antd';
import cx from 'classnames';

import StackLayout from '../../../layout/StackLayout';

import ElementOperator from '../icons/ElementOperator';
import EqualOperator from '../icons/EqualOperator';
import GreaterThanOrEqualOperator from '../icons/GreaterThanOrEqualOperator';
import LessThanOrEqualOperator from '../icons/LessThanOrEqualOperator';
import QueryValues from '../QueryValues';
import { IDictionary, TCallbackRemoveAction } from '../types';
import { IValueFilter } from '../../../data/types';

import styles from '@ferlab/style/components/queryBuilder/QueryPill.module.scss';

interface IQueryBarProps {
    isBarActive?: boolean;
    query: IValueFilter;
    dictionary?: IDictionary;
    showLabels?: boolean;
    onRemove: TCallbackRemoveAction;
}

interface IOperatorProps {
    type: string;
    className?: string;
}

const Operator: React.FC<IOperatorProps> = ({ className = '', type }) => {
    switch (type) {
        case '>=':
            return <GreaterThanOrEqualOperator className={className} />;
        case '<=':
            return <LessThanOrEqualOperator className={className} />;
        case 'between':
            return <ElementOperator className={className} />;
        default:
            return <EqualOperator className={className} />;
    }
};

const FieldQueryPill: React.FC<IQueryBarProps> = ({ query, dictionary = {}, showLabels, onRemove, isBarActive }) => {
    const containerClassNames = cx(styles.container, { [styles.selected]: isBarActive });
    return (
        <StackLayout className={containerClassNames}>
            {showLabels && (
                <>
                    <span className={`${styles.field}`}>
                        {dictionary.query?.facet(query.content.field) || query.content.field}
                    </span>
                    <Operator className={styles.operator} type={query.op} />
                </>
            )}
            <QueryValues isElement={query.op === 'between'} query={query} />
            <Button className={styles.close} type="text">
                <AiOutlineClose onClick={() => onRemove(query)} />
            </Button>
        </StackLayout>
    );
};

export default FieldQueryPill;
