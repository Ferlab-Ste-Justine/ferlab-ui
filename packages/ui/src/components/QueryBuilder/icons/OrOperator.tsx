import React from 'react';

import styles from '@ferlab/style/components/queryBuilder/Operator.module.scss';
import { IDictionary } from '../types';

interface IOrOperatorProps {
    dictionary?: IDictionary;
    className?: string;
}
const OrOperator = ({ className = '', dictionary = {} }: IOrOperatorProps) => (
    <span className={`${styles.text} ${className}`}>{dictionary.query?.combine?.or || 'or'}</span>
);
export default OrOperator;
