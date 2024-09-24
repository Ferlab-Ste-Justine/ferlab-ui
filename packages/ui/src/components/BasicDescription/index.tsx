import React from 'react';
import cx from 'classnames';

import styles from './index.module.css';

type TBasicDescription = {
    label: string;
    text: string;
    bordered?: boolean;
};

const BasicDescription = ({ bordered = false, label, text }: TBasicDescription): React.ReactElement => (
    <div className={cx(styles.basicDescription, { [styles.bordered]: bordered })}>
        <span className={styles.label}>{label}</span>
        <span className={styles.text}>{text}</span>
    </div>
);

export default BasicDescription;
