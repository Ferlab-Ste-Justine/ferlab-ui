import React from 'react';

import styles from './LabelOperator.module.scss';

interface IGreaterThanOperatorProps {
    className?: string;
}
const GreaterThanOperator = ({ className = '' }: IGreaterThanOperatorProps) => (
    <svg
        className={`${styles.icon} ${className}`}
        fill="currentColor"
        height="14"
        viewBox="0 0 24 24"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M15.412 11.9631L5 8.57112V5.00012L19 10.5581V13.4421L5 19.0001V15.4291L15.412 11.9631Z" />
    </svg>
);
export default GreaterThanOperator;
