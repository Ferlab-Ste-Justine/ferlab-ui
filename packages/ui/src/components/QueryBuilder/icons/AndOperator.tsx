import React from 'react';

import styles from '@ferlab/style/components/queryBuilder/Operator.module.scss';

interface IAndOperatorProps {
    className?: string;
}
const AndOperator: React.FC<IAndOperatorProps> = ({ className = '' }) => (
    <span className={`${styles.text} ${className}`}>and</span>
);
export default AndOperator;
