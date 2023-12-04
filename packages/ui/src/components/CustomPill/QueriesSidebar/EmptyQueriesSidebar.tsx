import React from 'react';
import { BarChartOutlined, DotChartOutlined, FundOutlined, PieChartOutlined } from '@ant-design/icons';

import ExternalLink from '../../ExternalLink';

import styles from './index.module.scss';

interface IEmptyQueriesSidebar {
    emptyText: string;
    learnMoreText?: string;
    learnMoreLink?: string;
}

const EmptyQueriesSidebar = ({ emptyText, learnMoreLink, learnMoreText }: IEmptyQueriesSidebar): JSX.Element => (
    <div className={styles.emptyQueriesSidebarWrapper}>
        <div className={styles.iconsWrapper}>
            <BarChartOutlined className={styles.icon} />
            <PieChartOutlined className={styles.icon} />
            <FundOutlined className={styles.icon} />
            <DotChartOutlined className={styles.icon} />
        </div>
        {/* TODO change href when we will have it */}
        <div className={styles.emptyText}>{emptyText}</div>
        {learnMoreLink && (
            <ExternalLink className={styles.link} hasIcon={true} href={learnMoreLink}>
                {learnMoreText}
            </ExternalLink>
        )}
    </div>
);

export default EmptyQueriesSidebar;
