import React from 'react';

import styles from '@ferlab/style/components/queryBuilder/LabelOperator.module.scss';

interface IGreaterThanOperatorProps {
    className?: string;
}
const GreaterThanOperator = ({ className = '' }: IGreaterThanOperatorProps) => (
    <svg
        className={`${styles.icon} ${className}`}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M9.01067 1.75037L8.22842 4.66703H11.6666V6.41703H7.75942L7.44675 7.5837H11.6666V9.3337H6.97775L6.19667 12.2504H4.98917L5.77025 9.3337H2.33325V7.5837H6.23925L6.55133 6.41703H2.33325V4.66703H7.02033L7.80258 1.75037H9.01067Z" />
    </svg>
);
export default GreaterThanOperator;
