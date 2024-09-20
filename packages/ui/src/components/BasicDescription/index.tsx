import React from 'react';

import styles from './index.module.css';

type TBasicDescription = {
    label: string;
    text: string;
};

const BasicDescription = ({ label, text }: TBasicDescription): React.ReactElement => (
    <div className={styles.basicDescription}>
        <span className={styles.label}>{label}</span>
        <span className={styles.text}>{text}</span>
    </div>
);

export default BasicDescription;
