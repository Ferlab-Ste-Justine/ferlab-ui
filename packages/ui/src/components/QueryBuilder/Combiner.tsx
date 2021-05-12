import React from 'react';
import { Button, Dropdown, Menu } from 'antd';

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

const Combiner: React.FC<ICombinerProps> = ({ onChange, type, dictionary = {} }) => (
    <StackLayout className={styles.container}>
        <Dropdown
            overlay={
                <Menu>
                    <Menu.Item className={styles.menuItem} onClick={() => onChange(CombinerEnum.And)}>
                        <AndOperator className={styles.itemIcon} />{' '}
                        {dictionary.query?.combine?.intersection || 'Intersection'}
                    </Menu.Item>
                    <Menu.Item className={styles.menuItem} onClick={() => onChange(CombinerEnum.Or)}>
                        <OrOperator className={styles.itemIcon} /> {dictionary.query?.combine?.union || 'Union'}
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
