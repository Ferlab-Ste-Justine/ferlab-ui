import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from 'antd';
import cx from 'classnames';

import StackLayout from '../../layout/StackLayout';

import ElementOperator from './icons/ElementOperator';
import EqualOperator from './icons/EqualOperator';
import GreaterThanOrEqualOperator from './icons/GreaterThanOrEqualOperator';
import LessThanOrEqualOperator from './icons/LessThanOrEqualOperator';
import QueryValues from './QueryValues';
import { IDictionary, IValueFilter, TCallbackRemoveAction } from './types';

import styles from '@ferlab/style/components/queryBuilder/QueryPill.module.scss';

interface IQueryBarProps {
    currentSelectedQuery?: boolean;
    query: IValueFilter;
    dictionary?: IDictionary;
    showLabels?: boolean;
    onRemove: TCallbackRemoveAction;
}

interface IOperatorProps {
    type: string;
}

const Operator: React.FC<IOperatorProps> = ({ type }) => {
    switch (type) {
        case '>=':
            return <GreaterThanOrEqualOperator />;
        case '<=':
            return <LessThanOrEqualOperator />;
        case 'between':
            return <ElementOperator />;
        default:
            return <EqualOperator />;
    }
};

const QueryPill: React.FC<IQueryBarProps> = ({
    query,
    dictionary = {},
    showLabels,
    onRemove,
    currentSelectedQuery,
}) => {
    const containerClassNames = cx(styles.container, { [styles.selected]: currentSelectedQuery });
    return (
        <StackLayout className={containerClassNames}>
            {showLabels && (
                <span className={styles.field}>
                    {dictionary.query?.facet(query.content.field) || query.content.field}
                </span>
            )}
            <Operator type={query.op} />
            <QueryValues isElement={query.op === 'between'} query={query} />
            <Button className={styles.close} type="text">
                <AiOutlineClose onClick={() => onRemove(query)} />
            </Button>
        </StackLayout>
    );
};

export default QueryPill;
