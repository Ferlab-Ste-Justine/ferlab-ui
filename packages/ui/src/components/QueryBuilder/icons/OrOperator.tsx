import React from 'react';

import { IDictionary } from '../types';

import styles from './Operator.module.scss';

interface IOrOperatorProps {
    dictionary?: IDictionary;
    className?: string;
}
const OrOperator = ({ className = '', dictionary = {} }: IOrOperatorProps) => (
    <span className={`${styles.text} ${className}`}>{dictionary.query?.combine?.or || 'or'}</span>
);
export default OrOperator;
