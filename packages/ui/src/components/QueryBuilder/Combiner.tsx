import React from 'react';
import { Button, Dropdown, Menu } from 'antd';

import StackLayout from '../../layout/StackLayout';

import AndOperator from './icons/AndOperator';
import OrOperator from './icons/OrOperator';
import { CombinerEnum, TSqonGroupOp } from './types';

import styles from '@ferlab/style/components/queryBuilder/Combiner.module.scss';

interface ICombinerProps {
    type: TSqonGroupOp;
    onChange: (type: TSqonGroupOp) => void;
}

const Combiner: React.FC<ICombinerProps> = ({ onChange, type }) => (
    <StackLayout className={styles.container}>
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item onClick={() => onChange(CombinerEnum.And)}>
                        <AndOperator />
                    </Menu.Item>
                    <Menu.Item onClick={() => onChange(CombinerEnum.Or)}>
                        <OrOperator />
                    </Menu.Item>
                </Menu>
            }
            trigger={['click']}
        >
            <Button className={styles.button} type="text">
                {type === 'and' ? <AndOperator /> : <OrOperator />}
            </Button>
        </Dropdown>
    </StackLayout>
);

export default Combiner;
