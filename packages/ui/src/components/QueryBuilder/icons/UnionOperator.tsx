import React from 'react';

import styles from '@ferlab/style/components/queryBuilder/Operator.module.scss';

interface IUnionOperatorProps {
    className?: string;
}
const UnionOperator = ({ className = '' }: IUnionOperatorProps) => (
    <span className={className}>,</span>
);
export default UnionOperator;
