import React from 'react';
import { Carousel as AntCarousel } from 'antd';

import ParticipantIcon from '../../../../components/Icons/Futuro/ParticipantIcon';
import { numberFormat } from '../../../../utils/numberUtils';
import TextIcon from '../../TextIcon';
import { TStudy } from '../index';

import styles from './index.module.css';

type TCarouselProps = {
    studies: TStudy[];
    autoplaySpeed?: number;
};

const Carousel = ({ autoplaySpeed = 7000, studies }: TCarouselProps) => (
    <AntCarousel autoplay autoplaySpeed={autoplaySpeed} className={styles.carousel} dots={{ className: styles.dots }}>
        {studies.map((study) => (
            <div className={styles.contentStyle} key={study.code}>
                <div className={styles.title}>{study.title}</div>
                <div className={styles.subtitle}>{study.subtitle}</div>
                <div className={styles.description}>{study.description}</div>
                {study.participantCount && (
                    <TextIcon
                        IconComponent={ParticipantIcon}
                        color="dark"
                        subtitle="Participants"
                        title={numberFormat(study.participantCount)}
                    />
                )}
            </div>
        ))}
    </AntCarousel>
);

export default Carousel;
