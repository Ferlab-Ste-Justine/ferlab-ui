import React, { ReactElement } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import StudyIcon from '../../../../components/Icons/FuturoSpot/StudySpotIcon';
import TextIcon from '../../TextIcon';
import { TStudiesDictionary } from '../index';

import styles from './index.module.css';

type TSummaryProps = {
    dictionary: TStudiesDictionary;
    studiesBtnOnClick?: () => void;
    studiesCount: number;
};

const Summary = ({ dictionary, studiesBtnOnClick, studiesCount }: TSummaryProps): ReactElement => (
    <div className={styles.container}>
        <TextIcon IconComponent={StudyIcon} size="large" subtitle={dictionary.title} title={studiesCount} />
        <div className={styles.description}>{dictionary.summary}</div>
        {studiesBtnOnClick && (
            <div>
                <Button onClick={() => studiesBtnOnClick()} size="large" type="primary">
                    {dictionary.viewAllBtn || 'View all studies'}
                    <ArrowRightOutlined />
                </Button>
            </div>
        )}
    </div>
);

export default Summary;
