import React from 'react';
import {
    BarChartOutlined,
    DotChartOutlined,
    FundOutlined,
    InfoCircleOutlined,
    PieChartOutlined,
    WarningFilled,
} from '@ant-design/icons';
import { Tooltip, Typography } from 'antd';

import ExternalLink from '../../ExternalLink';
import { ISavedFilter } from '../../QueryBuilder/types';

import QueryPill from './QueryPill';

import styles from './index.module.scss';

interface IQueriesSidebarDictionary {
    emptyText: string;
    errorText: string;
    learnMore: string;
    title: string;
}

export interface IQueriesSidebarProps {
    customPills: ISavedFilter[];
    hasError: boolean;
    dictionary: IQueriesSidebarDictionary;
    learnMoreLink?: string;
    addPillToQuery: (queryPillId: string) => void;
    editPill: (queryPillId: string) => void;
    duplicatePill: (queryPillId: string) => void;
    deletePill: (queryPillId: string) => void;
}

const QueriesSidebar = ({
    customPills = [],
    hasError = false,
    dictionary,
    learnMoreLink,
    addPillToQuery,
    deletePill,
    duplicatePill,
    editPill,
}: IQueriesSidebarProps): JSX.Element => {
    if (!customPills.length || hasError) {
        return (
            <div className={styles.emptyQueriesSidebarWrapper}>
                <div className={styles.iconsWrapper}>
                    <BarChartOutlined className={styles.icon} />
                    <PieChartOutlined className={styles.icon} />
                    <FundOutlined className={styles.icon} />
                    <DotChartOutlined className={styles.icon} />
                </div>
                {hasError && (
                    <div className={styles.errorText}>
                        <WarningFilled className={styles.errorIcon} />
                        {dictionary.errorText}
                    </div>
                )}

                {/* TODO change href when we will have it */}
                {!hasError && (
                    <>
                        <div className={styles.emptyText}>{dictionary.emptyText}</div>
                        {learnMoreLink && (
                            <ExternalLink className={styles.link} hasIcon={true} href={learnMoreLink}>
                                {dictionary.learnMore}
                            </ExternalLink>
                        )}
                    </>
                )}
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
