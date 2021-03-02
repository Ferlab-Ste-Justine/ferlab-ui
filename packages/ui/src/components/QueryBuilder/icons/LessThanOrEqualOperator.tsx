import React from 'react';

import styles from '@ferlab/style/components/queryBuilder/LabelOperator.module.scss';

interface ILessThanOrEqualOperatorProps {
    className?: string;
}
const LessThanOrEqualEqualOperator: React.FC<ILessThanOrEqualOperatorProps> = ({ className = '' }) => (
    <svg
        className={`${styles.icon} ${className}`}
        fill="currentColor"
        height="14"
        viewBox="0 0 14 14"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M6.41669 4.08327L1.16669 6.39917V7.6007L6.41669 9.9166V8.4287L2.66148 6.98437L6.41669 5.57117V4.08327ZM12.8334 7.58327V8.74993H7.58335V7.58327H12.8334ZM12.8334 5.24993V6.4166H7.58335V5.24993H12.8334Z" />
    </svg>
);
export default LessThanOrEqualEqualOperator;
