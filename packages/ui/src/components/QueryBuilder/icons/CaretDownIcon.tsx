import React, { ReactElement } from 'react';

import styles from './LabelOperator.module.scss';

interface IElementlOperatorProps {
    className?: string;
}
const CaretDownIcon = ({ className = '' }: IElementlOperatorProps): ReactElement => (
    <svg
        className={`${styles.icon} ${className}`}
        fill="currentColor"
        height="14"
        viewBox="0 0 24 24"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M19.6962 7.03137H4.30248C3.84077 7.03137 3.58295 7.51887 3.86889 7.85168L11.5658 16.7767C11.7861 17.0322 12.2103 17.0322 12.433 16.7767L20.1298 7.85168C20.4158 7.51887 20.158 7.03137 19.6962 7.03137Z" />
    </svg>
);
export default CaretDownIcon;
