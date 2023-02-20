import React from 'react';

interface IUnionOperatorProps {
    className?: string;
}
const UnionOperator = ({ className = '' }: IUnionOperatorProps) => <span className={className}>,</span>;
export default UnionOperator;
