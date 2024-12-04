import React, { ReactElement, ReactNode } from 'react';

import Carousel from './Carousel';
import Summary from './Summary';

import styles from './index.module.css';

export type TStudiesDictionary = {
    summary: string;
    title: string;
    viewAllBtn?: string;
};

export type TStudy = {
    code: string;
    description: ReactNode;
    participantCount?: number;
    subtitle: ReactNode;
    title: ReactNode;
};

export type TStudiesProps = {
    autoplaySpeed?: number;
    dictionary: TStudiesDictionary;
    studies: TStudy[];
    studiesBtnOnClick?: () => void;
    studiesCount: number;
};

const Studies = ({
    autoplaySpeed,
    dictionary,
    studies,
    studiesBtnOnClick,
    studiesCount,
}: TStudiesProps): ReactElement => (
    <div className={styles.container}>
        <Summary dictionary={dictionary} studiesBtnOnClick={studiesBtnOnClick} studiesCount={studiesCount} />
        <Carousel autoplaySpeed={autoplaySpeed} studies={studies} />
    </div>
);
export default Studies;
