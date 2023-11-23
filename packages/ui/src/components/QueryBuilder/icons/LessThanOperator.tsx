import React, { ReactElement } from 'react';

import styles from './LabelOperator.module.scss';

interface ILessThanOperatorProps {
    className?: string;
}
const LessThanOperator = ({ className = '' }: ILessThanOperatorProps): ReactElement => (
    <svg
        className={`${styles.icon} ${className}`}
        fill="currentColor"
        height="14"
        viewBox="0 0 24 24"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M8.588 11.9631L19 8.57112V5.00012L5 10.5581V13.4421L19 19.0001V15.4291L8.588 11.9631Z" />
    </svg>
);
export default LessThanOperator;
