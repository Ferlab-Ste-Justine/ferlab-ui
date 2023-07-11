import React from 'react';
import {
    BarChartOutlined,
    DotChartOutlined,
    FundOutlined,
    InfoCircleOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Tooltip, Typography } from 'antd';

import ExternalLink from '../../ExternalLink';
import { ISavedFilter } from '../../QueryBuilder/types';

import QueryPill from './QueryPill';

import styles from './index.module.scss';

interface IQueriesSidebarDictionary {
    emptyText: string;
    learnMore: string;
    title: string;
}

export interface IQueriesSidebarProps {
    customPills: ISavedFilter[];
    dictionary: IQueriesSidebarDictionary;
    addPillToQuery: (queryPillId: string) => void;
    editPill: (queryPillId: string) => void;
    duplicatePill: (queryPillId: string) => void;
    deletePill: (queryPillId: string) => void;
}

const QueriesSidebar = ({
    customPills = [],
    dictionary,
    addPillToQuery,
    deletePill,
    duplicatePill,
    editPill,
}: IQueriesSidebarProps): JSX.Element => {
    if (!customPills.length) {
        return (
            <div className={styles.emptyQueriesSidebarWrapper}>
                <div className={styles.iconsWrapper}>
                    <BarChartOutlined className={styles.icon} />
                    <PieChartOutlined className={styles.icon} />
                    <FundOutlined className={styles.icon} />
                    <DotChartOutlined className={styles.icon} />
                </div>
                <div className={styles.emptyText}>{dictionary.emptyText}</div>

                {/* TODO change href when we will have it */}
                <ExternalLink className={styles.link} hasIcon={true} href={'http://www.google.fr'}>
                    {dictionary.learnMore}
                </ExternalLink>
            </div>
        );
    }

    const sortedPills = customPills.sort((a, b) => (a.title < b.title ? -1 : a.title > b.title ? 1 : 0));

    return (
        <div className={styles.queriesSidebarWrapper}>
            <span className={styles.titleWrapper}>
                <Typography.Text className={styles.title} strong>
                    {dictionary.title}
                </Typography.Text>
                {dictionary.emptyText && (
                    <Tooltip
                        align={{ offset: [-24, 0] }}
                        arrowPointAtCenter
                        placement="topLeft"
                        title={dictionary.emptyText}
                    >
                        <InfoCircleOutlined className={styles.tooltipIcon} />
                    </Tooltip>
                )}
            </span>
            <div className={styles.pillsWrapper}>
                {sortedPills.map((pill) => (
                    <QueryPill
                        addPillToQuery={addPillToQuery}
                        deletePill={deletePill}
                        duplicatePill={duplicatePill}
                        editPill={editPill}
                        key={pill.id}
                        queryPill={pill}
                    />
                ))}
            </div>
        </div>
    );
};

export default QueriesSidebar;
