import React from 'react';
import {
    BarChartOutlined,
    DotChartOutlined,
    FundOutlined,
    InfoCircleOutlined,
    PieChartOutlined,
    WarningFilled,
} from '@ant-design/icons';
import { Spin, Tooltip, Typography } from 'antd';

import ExternalLink from '../../ExternalLink';
import { ISavedFilter } from '../../QueryBuilder/types';

import QueryPill from './QueryPill';

import styles from './index.module.scss';

export interface IQueriesSidebarDictionary {
    emptyText: string;
    errorText: string;
    learnMore: string;
    title: string;
    deleteCustomPill: {
        modal: {
            title: string;
            okText: string;
            cancelText: string;
            message: string;
            existingFilters: string;
            errorMessage: string;
        };
        notification: {
            error: { description: string; message: string };
            success: string;
        };
    };
    duplicateCustomPill: {
        notification: {
            error: { description: string; message: string };
        };
    };
}

export interface IQueriesSidebarProps {
    customPills: ISavedFilter[];
    hasError: boolean;
    dictionary: IQueriesSidebarDictionary;
    isLoading: boolean;
    queryBuilderId: string;
    learnMoreLink?: string;
    editPill: (id: string) => void;
    duplicatePill: (queryPill: ISavedFilter) => any;
    deletePill: (id: string) => any;
    getFiltersByPill: (id: string) => any;
}

const QueriesSidebar = ({
    customPills = [],
    hasError = false,
    isLoading = false,
    dictionary,
    queryBuilderId,
    learnMoreLink,
    deletePill,
    duplicatePill,
    editPill,
    getFiltersByPill,
}: IQueriesSidebarProps): JSX.Element => {
    if (isLoading) {
        return <Spin spinning={isLoading}></Spin>;
    }
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

    const sortedPills = structuredClone(customPills).sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { ignorePunctuation: true, sensitivity: 'base' }),
    );

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
                        deletePill={deletePill}
                        dictionary={dictionary}
                        duplicatePill={duplicatePill}
                        editPill={editPill}
                        getFiltersByPill={getFiltersByPill}
                        key={pill.id}
                        queryBuilderId={queryBuilderId}
                        queryPill={pill}
                    />
                ))}
            </div>
        </div>
    );
};

export default QueriesSidebar;
