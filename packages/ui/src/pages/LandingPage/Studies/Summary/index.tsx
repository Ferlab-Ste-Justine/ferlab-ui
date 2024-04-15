import React from 'react';

import StudyIcon from '../../../../components/Icons/FuturoSpot/StudySpotIcon';
import TextIcon from '../../TextIcon';
import { StudiesDictionary } from '../index';

import styles from './index.module.scss';

type OwnProps = {
    dictionary: StudiesDictionary;
    studiesCount: number;
};

const Summary = ({ dictionary, studiesCount }: OwnProps) => (
    <div className={styles.container}>
        <TextIcon IconComponent={StudyIcon} size="large" subTitle={dictionary.title} title={studiesCount} />
        <div className={styles.description}>{dictionary.summary}</div>
    </div>
);

export default Summary;
