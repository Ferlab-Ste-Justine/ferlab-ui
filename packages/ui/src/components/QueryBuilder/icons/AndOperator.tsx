import React, { ReactElement } from 'react';

import { IDictionary } from '../types';

import styles from './Operator.module.css';

interface IAndOperatorProps {
    dictionary?: IDictionary;
    className?: string;
}
const AndOperator = ({ className = '', dictionary = {} }: IAndOperatorProps): ReactElement => (
    <span className={`${styles.text} ${className}`}>{dictionary.query?.combine?.and || 'and'}</span>
);
export default AndOperator;
