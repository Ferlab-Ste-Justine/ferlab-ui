import { Button, Tooltip } from 'antd';
import React, { useContext } from 'react';
import { TSqonGroupOp } from '../../data/sqon/types';
import AndOperator from './icons/AndOperator';
import OrOperator from './icons/OrOperator';
import { CombinerEnum } from './types';

import styles from '@ferlab/style/components/queryBuilder/Combiner.module.scss';
import { QueryBuilderContext } from './context';

interface ICombinerProps {
    type: TSqonGroupOp;
    onChange: (type: TSqonGroupOp) => void;
}

const Combiner = ({ onChange, type }: ICombinerProps) => {
    const { dictionary } = useContext(QueryBuilderContext);

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
        <div className={styles.combinerContainer}>
            <Tooltip title={getTooltipTitle()} align={{ offset: [0, 5] }}>
                <Button className={styles.button} type="text" onClick={() => toggleOperator()}>
                    {isAndOperator() ? (
                        <AndOperator dictionary={dictionary} className={styles.operator} />
                    ) : (
                        <OrOperator dictionary={dictionary} className={styles.operator} />
                    )}
                </Button>
            </Tooltip>
        </div>
    );
};

export default Combiner;
