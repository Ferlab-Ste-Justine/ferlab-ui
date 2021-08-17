import React from 'react';

import styles from '@ferlab/style/components/queryBuilder/LabelOperator.module.scss';

interface IGreaterThanOrEqualOperatorProps {
    className?: string;
}
const GreaterThanOrEqualOperator = ({ className = '' }: IGreaterThanOrEqualOperatorProps) => (
    <svg
        className={`${styles.icon} ${className}`}
        fill="currentColor"
        height="14"
        viewBox="0 0 14 14"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M1.16669 4.08333L6.41669 6.39923V7.60076L1.16669 9.91666V8.42876L4.9219 6.98443L1.16669 5.57123V4.08333ZM12.8334 7.58333V8.74999H7.58335V7.58333H12.8334ZM12.8334 5.24999V6.41666H7.58335V5.24999H12.8334Z" />
    </svg>
);
export default GreaterThanOrEqualOperator;
