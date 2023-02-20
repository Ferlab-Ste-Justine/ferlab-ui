import React from 'react';

import { IDictionary } from '../types';

import styles from './Operator.module.scss';

interface IAndOperatorProps {
    dictionary?: IDictionary;
    className?: string;
}
const AndOperator = ({ className = '', dictionary = {} }: IAndOperatorProps) => (
    <span className={`${styles.text} ${className}`}>{dictionary.query?.combine?.and || 'and'}</span>
);
export default AndOperator;
