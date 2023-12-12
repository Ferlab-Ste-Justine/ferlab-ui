import React, { ReactElement, useContext } from 'react';
import { Button, Tooltip } from 'antd';

import { TSqonGroupOp } from '../../data/sqon/types';

import AndOperator from './icons/AndOperator';
import OrOperator from './icons/OrOperator';
import { QueryBuilderContext } from './context';
import { CombinerEnum } from './types';

import styles from './Combiner.module.scss';

interface ICombinerProps {
    type: TSqonGroupOp;
    onChange: (type: TSqonGroupOp) => void;
}

const Combiner = ({ onChange, type }: ICombinerProps): ReactElement => {
    const { dictionary } = useContext(QueryBuilderContext);

    const isAndOperator = () => type === 'and';

    const toggleOperator = () => {
        onChange(isAndOperator() ? CombinerEnum.Or : CombinerEnum.And);
    };

    const getTooltipTitle = () => `
            ${dictionary.actions?.changeOperatorTo || 'Change operator to'}
            ${
                isAndOperator()
                    ? `"${dictionary.query?.combine?.or || 'or'}"`
                    : `"${dictionary.query?.combine?.and || 'and'}"`
            }
        `;

    return (
        <div className={styles.combinerContainer}>
            <Tooltip align={{ offset: [0, 5] }} title={getTooltipTitle()}>
                <Button className={styles.button} onClick={() => toggleOperator()} type="text">
                    {isAndOperator() ? (
                        <AndOperator className={styles.operator} dictionary={dictionary} />
                    ) : (
                        <OrOperator className={styles.operator} dictionary={dictionary} />
                    )}
                </Button>
            </Tooltip>
        </div>
    );
};

export default Combiner;
