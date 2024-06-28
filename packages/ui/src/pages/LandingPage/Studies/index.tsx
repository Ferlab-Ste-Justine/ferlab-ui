import React, { ReactElement, ReactNode } from 'react';

import Carousel from './Carousel';
import Summary from './Summary';

import styles from './index.module.css';

export type TStudiesDictionary = {
    title: string;
    summary: string;
};

export type TStudy = {
    code: string;
    title: ReactNode;
    subtitle: ReactNode;
    description: ReactNode;
    participantCount?: number;
};

export type TStudiesProps = {
    studiesCount: number;
    studies: TStudy[];
    autoplaySpeed?: number;
    dictionary: TStudiesDictionary;
};

const Studies = ({ autoplaySpeed, dictionary, studies, studiesCount }: TStudiesProps): ReactElement => (
    <div className={styles.container}>
        <Summary dictionary={dictionary} studiesCount={studiesCount} />
        <Carousel autoplaySpeed={autoplaySpeed} studies={studies} />
    </div>
);
export default Studies;
