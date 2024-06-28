import React, { ReactElement } from 'react';

import { IDictionary } from '../types';

import styles from './Operator.module.css';

interface IOrOperatorProps {
    dictionary?: IDictionary;
    className?: string;
}
const OrOperator = ({ className = '', dictionary = {} }: IOrOperatorProps): ReactElement => (
    <span className={`${styles.text} ${className}`}>{dictionary.query?.combine?.or || 'or'}</span>
);
export default OrOperator;
