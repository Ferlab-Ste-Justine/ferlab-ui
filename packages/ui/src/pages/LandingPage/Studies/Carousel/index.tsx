import React from 'react';
import { Carousel as AntCarousel } from 'antd';

import ParticipantIcon from '../../../../components/Icons/Futuro/ParticipantIcon';
import { numberFormat } from '../../../../utils/numberUtils';
import TextIcon from '../../TextIcon';
import { Study } from '../index';

import styles from './index.module.scss';

type OwnProps = {
    studies: Study[];
};

const Carousel = ({ studies }: OwnProps) => (
    <AntCarousel autoplay autoplaySpeed={5000} className={styles.carousel} dots={{ className: styles.dots }}>
        {studies.map((study) => (
            <div className={styles.contentStyle} key={study.code}>
                <div className={styles.title}>{study.title}</div>
                <div className={styles.subTitle}>{study.subtitle}</div>
                <div className={styles.description}>{study.description}</div>
                {study.participantCount && (
                    <TextIcon
                        IconComponent={ParticipantIcon}
                        color="dark"
                        subTitle="Participants"
                        title={numberFormat(study.participantCount)}
                    />
                )}
            </div>
        ))}
    </AntCarousel>
);

export default Carousel;
