import React from 'react';

import styles from './LabelOperator.module.scss';

interface IEqualOperatorProps {
    className?: string;
}
const EqualOperator = ({ className = '' }: IEqualOperatorProps) => (
    <svg
        className={`${styles.icon} ${className}`}
        fill="currentColor"
        height="14"
        viewBox="0 0 14 14"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M11.6666 7.58332V9.33332H2.33331V7.58332H11.6666ZM11.6666 4.66666V6.41666H2.33331V4.66666H11.6666Z" />
    </svg>
);
export default EqualOperator;
