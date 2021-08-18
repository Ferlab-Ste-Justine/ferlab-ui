import React from 'react';
import StackLayout from '../../layout/StackLayout';

import styles from '@ferlab/style/components/queryBuilder/QueryValues.module.scss';

interface IReferenceQueryValuesProps {
    refIndex: number;
    highlightColor?: string;
}

const ReferenceQueryValues = (props: IReferenceQueryValuesProps) => (
    <StackLayout className={styles.container}>
        <StackLayout className={styles.valueWrapper}>
            <span className={styles.value} style={props.highlightColor ? { color: props.highlightColor } : undefined}>
                {`Q${props.refIndex + 1}`}
            </span>
        </StackLayout>
    </StackLayout>
);

export default ReferenceQueryValues;
