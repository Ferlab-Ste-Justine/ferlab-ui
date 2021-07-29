import React from 'react';
import { Button, Tooltip } from 'antd';

import StackLayout from '../../layout/StackLayout';

import AndOperator from './icons/AndOperator';
import OrOperator from './icons/OrOperator';
import { CombinerEnum, IDictionary, TSqonGroupOp } from './types';

import styles from '@ferlab/style/components/queryBuilder/Combiner.module.scss';

interface ICombinerProps {
    dictionary?: IDictionary;
    type: TSqonGroupOp;
    onChange: (type: TSqonGroupOp) => void;
}

const Combiner: React.FC<ICombinerProps> = ({ onChange, type, dictionary = {} }) => {
    const isAndOperator = () => {
        return type === 'and';
    };

    const toggleOperator = () => {
        onChange(isAndOperator() ? CombinerEnum.Or : CombinerEnum.And);
    };

    return (
        <StackLayout className={styles.container}>
            <Tooltip title={'Change operator to ' + (isAndOperator() ? 'Or' : 'And')} align={{ offset: [0, 5] }}>
                <Button className={styles.button} type="text" onClick={() => toggleOperator()}>
                    {isAndOperator() ? <AndOperator className={styles.operator} /> : <OrOperator className={styles.operator}/>}
                </Button>
            </Tooltip>
        </StackLayout>
    );
};

export default Combiner;
