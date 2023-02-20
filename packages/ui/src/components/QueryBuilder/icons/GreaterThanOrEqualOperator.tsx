import React from 'react';

import styles from './LabelOperator.module.scss';

interface IGreaterThanOrEqualOperatorProps {
    className?: string;
}
const GreaterThanOrEqualOperator = ({ className = '' }: IGreaterThanOrEqualOperatorProps) => (
    <svg
        className={`${styles.icon} ${className}`}
        fill="currentColor"
        height="14"
        viewBox="0 0 24 24"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M5 6.07112L15.412 9.46312L5 12.9291V16.5001L19 10.9421V8.05812L5 2.50012V6.07112Z" />
        <path d="M19 13.4401V15.9442L5 21.5022V19.0402L19 13.4401Z" />
    </svg>
);
export default GreaterThanOrEqualOperator;
