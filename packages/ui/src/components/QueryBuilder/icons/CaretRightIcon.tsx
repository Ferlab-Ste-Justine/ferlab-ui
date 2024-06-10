import React, { ReactElement } from 'react';

import styles from './LabelOperator.module.css';

interface IElementlOperatorProps {
    className?: string;
}
const CaretRightIcon = ({ className = '' }: IElementlOperatorProps): ReactElement => (
    <svg
        className={`${styles.icon} ${className}`}
        fill="currentColor"
        height="14"
        viewBox="0 0 24 24"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M16.7766 11.5659L7.85156 3.86901C7.51875 3.58308 7.03125 3.84089 7.03125 4.30261V19.6964C7.03125 20.1581 7.51875 20.4159 7.85156 20.1299L16.7766 12.4331C17.032 12.2128 17.032 11.7862 16.7766 11.5659Z" />
    </svg>
);
export default CaretRightIcon;
