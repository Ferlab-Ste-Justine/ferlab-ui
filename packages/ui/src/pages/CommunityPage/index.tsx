import React from 'react';
import { List, Space, Typography } from 'antd';

import FiltersBox, {
    DEFAULT_FILTER_BOX_DICTIONARY,
    TFilterBoxDictionary,
    TFilterBoxOptions,
} from '../../components/FilterBox';
import TableHeader from '../../components/ProTable/Header';
import { numberWithCommas } from '../../utils/numberUtils';

import { IUser } from './type';

import styles from './index.module.css';

const { Title } = Typography;

export const DEFAULT_COMMUNITY_PAGE_DICTIONARY = {
    filterBox: DEFAULT_FILTER_BOX_DICTIONARY,
    noResults: 'no result',
    result: 'result',
    results: 'results',
    resultSuffix: '',
    title: 'Community',
    totalMembers: (members: number): string => `${members} Total Members`,
};

export type TCommunityPageDictionary = {
    title: string;
    result: string;
    results: string;
    noResults: string;
    filterBox: TFilterBoxDictionary;
    totalMembers: (members: number) => string;
    resultSuffix?: string;
};

export interface ISearchParams {
    pageIndex?: number;
    pageSize?: number;
    match?: string;
    sort?: string;
    roles?: string;
    dataUses?: string;
    interests?: string;
}

interface ICommunityPage {
    handleActiveFilter: (searchParams: ISearchParams) => void;
    options: TFilterBoxOptions;
    handlePageChange: (page: number) => void;
    activeFilter: ISearchParams;
    pageSize: number;
    dictionary?: TCommunityPageDictionary;
    users: IUser[];
    totalPage: number;
    loading: boolean;
    totalMembers?: number;
    renderMember: (activeFilter: any, item: any) => React.ReactNode;
}

const CommunityMembersPage = ({
    activeFilter,
    dictionary = DEFAULT_COMMUNITY_PAGE_DICTIONARY,
    handleActiveFilter,
    handlePageChange,
    loading,
    options,
    pageSize,
    renderMember,
    totalMembers,
    totalPage,
    users,
}: ICommunityPage): JSX.Element => {
    const extraCountInfo = [];

    if (totalMembers) {
        extraCountInfo.push(<span>{dictionary.totalMembers(totalMembers)}</span>);
    }

    return (
        <Space className={styles.communityWrapper} direction="vertical" size={24}>
            <Title className={styles.title} level={4}>
                {dictionary.title}
            </Title>
            <FiltersBox
                dictionary={dictionary.filterBox}
                handleActiveFilter={handleActiveFilter}
                hasFilters={!!activeFilter.sort}
                options={options}
            />
            <Space className={styles.usersListWrapper} direction="vertical" size={24}>
                <TableHeader
                    dictionary={{
                        itemCount: {
                            clear: '',
                            clearFilters: '',
                            noResults: dictionary.noResults,
                            of: '',
                            result: dictionary.result,
                            results: dictionary.results,
                            resultSuffix: dictionary.resultSuffix,
                            selectAllResults: '',
                            selected: '',
                            selectedPlural: '',
                        },
                        numberFormat: numberWithCommas,
                    }}
                    extraCountInfo={extraCountInfo}
                    pageIndex={(activeFilter.pageIndex || 0) + 1}
                    pageSize={pageSize}
                    total={totalPage}
                />
                <List
                    className={styles.membersList}
                    dataSource={users}
                    grid={{
                        gutter: 24,
                        lg: 3,
                        md: 2,
                        sm: 2,
                        xl: 4,
                        xs: 1,
                        xxl: 5,
                    }}
                    loading={loading}
                    pagination={{
                        current: (activeFilter.pageIndex || 0) + 1,
                        hideOnSinglePage: true,
                        onChange: handlePageChange,
                        pageSize: pageSize,
                        showSizeChanger: false,
                        size: 'small',
                        total: totalPage,
                    }}
                    renderItem={(item) => (
                        <List.Item className={styles.memberListItem}>{renderMember(activeFilter, item)}</List.Item>
                    )}
                />
            </Space>
        </Space>
    );
};

export default CommunityMembersPage;
