import React from 'react';

import StudyIcon from '../../../../components/Icons/FuturoSpot/StudySpotIcon';
import TextIcon from '../../TextIcon';
import { TStudiesDictionary } from '../index';

import styles from './index.module.css';

type TSummaryProps = {
    dictionary: TStudiesDictionary;
    studiesCount: number;
};

const Summary = ({ dictionary, studiesCount }: TSummaryProps) => (
    <div className={styles.container}>
        <TextIcon IconComponent={StudyIcon} size="large" subtitle={dictionary.title} title={studiesCount} />
        <div className={styles.description}>{dictionary.summary}</div>
    </div>
);

export default Summary;
