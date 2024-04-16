import React from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import GeneIcon from '../../../components/Icons/FuturoSpot/GeneSpotIcon';
import { numberFormat } from '../../../utils/numberUtils';
import TextIcon from '../TextIcon';

import styles from './index.module.scss';

export type VariantDictionaryProps = {
    title: string;
    description: string;
    button: string;
};

export type VariantCardProps = {
    variantsCount: number;
    handleClick: () => Promise<void> | void;
    dictionary: VariantDictionaryProps;
};

const VariantCard = ({ dictionary, handleClick, variantsCount }: VariantCardProps) => (
    <div className={styles.container}>
        <TextIcon
            IconComponent={GeneIcon}
            size="large"
            subtitle={dictionary.title}
            title={numberFormat(variantsCount)}
        />
        <div className={styles.description}>{dictionary.description}</div>
        <div className={styles.buttonContainer}>
            <Button onClick={handleClick} size="large" type="primary">
                {dictionary.button}
                <ArrowRightOutlined />
            </Button>
        </div>
    </div>
);
export default VariantCard;
