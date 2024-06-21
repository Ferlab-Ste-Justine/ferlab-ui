import React from 'react';
import { InfoCircleOutlined, WarningFilled } from '@ant-design/icons';
import { Popover, Spin, Typography } from 'antd';

import { IRemoteComponent } from '../../../data/sqon/types';
import { defaultFacetFilterConfig, QueryCommonContext } from '../../QueryBuilder/context';
import { IDictionary, IFacetFilterConfig, ISavedFilter } from '../../QueryBuilder/types';
import { ISidebarMenuItem } from '../../SidebarMenu';

import EmptyQueriesSidebar from './EmptyQueriesSidebar';
import QueryPill from './QueryPill';
import { IQueriesSidebarDictionary } from './types';

import styles from './index.module.css';

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
    deletePill: (id: string, queryBuilderId: string) => any;
    duplicatePill: (queryPill: ISavedFilter) => any;
    editPill: (queryPill: ISavedFilter, tag: string, queryBuilderId: string) => void;
    getFiltersByPill: (id: string) => any;
    validateName: (title: string, tag: string) => any;
    remoteComponentMapping?: (props: IRemoteComponent) => void;
    editCallback?: () => void;
}

const getSortedPill = (customPills: ISavedFilter[]): ISavedFilter[] =>
    structuredClone(customPills).sort((a, b) =>
        a.title.localeCompare(b.title, undefined, { ignorePunctuation: true, sensitivity: 'base' }),
    );

const QueriesSidebar = ({
    customPills = [],
    deletePill,
    dictionary,
    duplicatePill,
    editCallback,
    editMenuItems,
    editPill,
    facetFilterConfig = defaultFacetFilterConfig,
    getFiltersByPill,
    hasError = false,
    isLoading = false,
    learnMoreLink,
    queryBuilderId,
    queryDictionary,
    queryEditionQBId,
    remoteComponentMapping,
    showLabels = true,
    tag,
    validateName,
}: IQueriesSidebarProps): JSX.Element => {
    if (isLoading) {
        return <Spin spinning={isLoading}></Spin>;
    }
    if (!customPills.length && !hasError) {
        return (
            <EmptyQueriesSidebar
                emptyText={dictionary.emptyText}
                learnMoreLink={learnMoreLink}
                learnMoreText={dictionary.learnMore}
            />
        );
    }

    const sortedPills = !hasError ? getSortedPill(customPills) : [];

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
                        <Popover
                            content={
                                <EmptyQueriesSidebar
                                    emptyText={dictionary.emptyText}
                                    learnMoreLink={learnMoreLink}
                                    learnMoreText={dictionary.learnMore}
                                />
                            }
                            overlayStyle={{ width: '350px' }}
                            placement="left"
                        >
                            <InfoCircleOutlined className={styles.tooltipIcon} />
                        </Popover>
                    )}
                </span>
                <div className={styles.pillsWrapper}>
                    {hasError && (
                        <div className={styles.errorText}>
                            <WarningFilled className={styles.errorIcon} />
                            {dictionary.errorText}
                        </div>
                    )}
                    {!hasError &&
                        sortedPills.map((pill) => (
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
