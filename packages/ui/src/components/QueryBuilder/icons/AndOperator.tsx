import React from 'react';

import styles from '@ferlab/style/components/queryBuilder/Operator.module.scss';
import { IDictionary } from '../types';

interface IAndOperatorProps {
    dictionary?: IDictionary;
    className?: string;
}
const AndOperator = ({ className = '', dictionary = {} }: IAndOperatorProps) => (
    <span className={`${styles.text} ${className}`}>{dictionary.query?.combine?.and || 'and'}</span>
);
export default AndOperator;
