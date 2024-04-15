import React, { ReactElement, ReactNode } from 'react';

import Carousel from './Carousel';
import Summary from './Summary';

import styles from './index.module.scss';

export type StudiesDictionary = {
    title: string;
    summary: string;
};

export type Study = {
    code: string;
    title: ReactNode;
    subtitle: string;
    description: string;
    participantCount?: number;
};

export type StudiesProps = {
    studiesCount: number;
    studies: Study[];
    dictionary: StudiesDictionary;
};

const Studies = ({ dictionary, studies, studiesCount }: StudiesProps): ReactElement => (
    <div className={styles.container}>
        <Summary dictionary={dictionary} studiesCount={studiesCount} />
        <Carousel studies={studies} />
    </div>
);
export default Studies;
