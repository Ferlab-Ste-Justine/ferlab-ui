import React from 'react';
import { Button, Tooltip } from 'antd';

import StackLayout from '../../layout/StackLayout';
import AndOperator from './icons/AndOperator';
import OrOperator from './icons/OrOperator';
import { CombinerEnum, IDictionary } from './types';
import { TSqonGroupOp } from '../../data/sqon/types';

import styles from '@ferlab/style/components/queryBuilder/Combiner.module.scss';

interface ICombinerProps {
    dictionary?: IDictionary;
    type: TSqonGroupOp;
    onChange: (type: TSqonGroupOp) => void;
}

const Combiner = ({ onChange, type, dictionary = {} }: ICombinerProps) => {
    const isAndOperator = () => {
        return type === 'and';
    };

    const toggleOperator = () => {
        onChange(isAndOperator() ? CombinerEnum.Or : CombinerEnum.And);
    };

    const getTooltipTitle = () => {
        return `
            ${dictionary.actions?.changeOperatorTo || 'Change operator to'}
            ${
                isAndOperator()
                    ? `"${dictionary.query?.combine?.or || 'or'}"`
                    : `"${dictionary.query?.combine?.and || 'and'}"`
            }
        `;
    };

    return (
        <StackLayout className={styles.combinerContainer}>
            <Tooltip title={getTooltipTitle()} align={{ offset: [0, 5] }}>
                <Button className={styles.button} type="text" onClick={() => toggleOperator()}>
                    {isAndOperator() ? (
                        <AndOperator dictionary={dictionary} className={styles.operator} />
                    ) : (
                        <OrOperator dictionary={dictionary} className={styles.operator} />
                    )}
                </Button>
            </Tooltip>
        </StackLayout>
    );
};

export default Combiner;
