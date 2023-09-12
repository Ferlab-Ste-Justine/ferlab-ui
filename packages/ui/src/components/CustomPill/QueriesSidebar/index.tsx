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

import { IRemoteComponent } from '../../../data/sqon/types';
import ExternalLink from '../../ExternalLink';
import { defaultFacetFilterConfig, QueryCommonContext } from '../../QueryBuilder/context';
import { IDictionary, IFacetFilterConfig, ISavedFilter } from '../../QueryBuilder/types';
import { ISidebarMenuItem } from '../../SidebarMenu';

import QueryPill from './QueryPill';
import { IQueriesSidebarDictionary } from './types';

import styles from './index.module.scss';

export interface IQueriesSidebarProps {
    customPills: ISavedFilter[];
    dictionary: IQueriesSidebarDictionary;
    editMenuItems: ISidebarMenuItem[];
    hasError: boolean;
    isLoading: boolean;
    queryBuilderId: string;
    queryDictionary: IDictionary;
    queryEditionQBId: string;
    tag: string;
    facetFilterConfig?: IFacetFilterConfig;
    learnMoreLink?: string;
    showLabels?: boolean;
    deletePill: (id: string) => any;
    duplicatePill: (queryPill: ISavedFilter) => any;
    editPill: (queryPill: ISavedFilter, tag: string, queryBuilderId: string) => void;
    getFiltersByPill: (id: string) => any;
    validateName: (title: string, tag: string) => any;
    remoteComponentMapping?: (props: IRemoteComponent) => void;
    editCallback?: () => void;
}

const QueriesSidebar = ({
    customPills = [],
    hasError = false,
    isLoading = false,
    dictionary,
    editMenuItems,
    queryBuilderId,
    queryDictionary,
    queryEditionQBId,
    learnMoreLink,
    showLabels = true,
    facetFilterConfig = defaultFacetFilterConfig,
    tag,
    deletePill,
    duplicatePill,
    editCallback,
    editPill,
    getFiltersByPill,
    remoteComponentMapping,
    validateName,
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
        <QueryCommonContext.Provider
            value={{ dictionary: { ...queryDictionary, queriesSidebar: dictionary }, facetFilterConfig, showLabels }}
        >
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
                            duplicatePill={duplicatePill}
                            editCallback={editCallback}
                            editMenuItems={editMenuItems}
                            editPill={editPill}
                            getFiltersByPill={getFiltersByPill}
                            key={pill.id}
                            queryBuilderId={queryBuilderId}
                            queryEditionQBId={queryEditionQBId}
                            queryPill={pill}
                            remoteComponentMapping={remoteComponentMapping}
                            tag={tag}
                            validateName={validateName}
                        />
                    ))}
                </div>
            </div>
        </QueryCommonContext.Provider>
    );
};

export default QueriesSidebar;
