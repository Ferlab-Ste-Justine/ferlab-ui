import React from 'react';

import styles from '@ferlab/style/components/queryBuilder/Operator.module.scss';

interface IOrOperatorProps {
    className?: string;
}
const OrOperator: React.FC<IOrOperatorProps> = ({ className = '' }) => (
    <span className={`${styles.text} ${className}`}>or</span>
);
export default OrOperator;
