import React, { ReactElement } from 'react';

import styles from './QueryValues.module.css';

interface IReferenceQueryValuesProps {
    refIndex: number;
    highlightColor?: string;
}

const ReferenceQueryValues = (props: IReferenceQueryValuesProps): ReactElement => (
    <div className={styles.queryValuesContainer}>
        <div className={styles.valueWrapper}>
            <span className={styles.value} style={props.highlightColor ? { color: props.highlightColor } : undefined}>
                {`Q${props.refIndex + 1}`}
            </span>
        </div>
    </div>
);

export default ReferenceQueryValues;
