import React from 'react';

import styles from '@ferlab/style/components/queryBuilder/Operator.module.scss';

interface IUnionOperatorProps {
    className?: string;
}
const UnionOperator: React.FC<IUnionOperatorProps> = ({ className = '' }) => (
    <svg
        className={`${styles.icon} ${className}`}
        fill="currentColor"
        height="14"
        viewBox="0 0 14 14"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M5.27913 9.1875C4.87082 8.78939 4.66666 8.27411 4.66666 7.64165V2.33331H2.91666V7.64165C2.91666 8.91584 3.25416 9.89045 3.92918 10.5655C4.60419 11.2405 5.6278 11.6075 6.99999 11.6666L7.21376 11.6548C8.47896 11.568 9.43131 11.2049 10.0708 10.5655C10.7103 9.92597 11.0469 9.0176 11.0805 7.84034L11.0833 7.64165V2.33331H9.33332V7.64165C9.33332 8.27411 9.12916 8.78939 8.72085 9.1875C8.34394 9.55499 7.82618 9.79035 7.16758 9.89359L6.99999 9.91665C6.26107 9.82866 5.68745 9.58561 5.27913 9.1875Z" />
    </svg>
);
export default UnionOperator;
