import React, { ReactElement } from 'react';

interface IUnionOperatorProps {
    className?: string;
}
const UnionOperator = ({ className = '' }: IUnionOperatorProps): ReactElement => <span className={className}>&</span>;
export default UnionOperator;
