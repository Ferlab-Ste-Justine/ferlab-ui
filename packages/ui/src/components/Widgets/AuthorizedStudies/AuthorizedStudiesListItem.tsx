import React from 'react';
import { List, Progress, Space, Typography } from 'antd';
import cx from 'classnames';

import { generateQuery, generateValueFilter } from '../../../data/sqon/utils';
import { numberWithCommas } from '../../../utils/numberUtils';
import { addQuery } from '../../QueryBuilder/utils/useQueryBuilderState';

import { IAuthorizedStudy } from '.';

import styles from './AuthorizedStudiesListItem.module.css';

export const DEFAULT_AUTHORIZED_STUDIES_LIST_ITEM_DICTIONARY = {
    authorization: 'Authorization :',
    dataGroups: 'Data use groups:',
    files: 'files',
    of: 'of',
};

export type TAuthorizedStudiesListItemDictionary = {
    authorization?: string;
    of?: string;
    dataGroups?: string;
    files?: string;
};

export interface IAuthorizedStudyQueryProps {
    to: string;
    queryBuilderId: string;
    participantIndex: string;
    fileIndex: string;
}

interface IAuthorizedStudiesListItem {
    data: IAuthorizedStudy;
    dictionary?: TAuthorizedStudiesListItemDictionary;
    queryProps: IAuthorizedStudyQueryProps;
}

const { Text } = Typography;

const AuthorizedStudiesListItem = ({
    data,
    dictionary = DEFAULT_AUTHORIZED_STUDIES_LIST_ITEM_DICTIONARY,
    queryProps,
}: IAuthorizedStudiesListItem): JSX.Element => {
    const title = `${data.title} (${data.study_code})`;

    return (
        <List.Item className={cx('wrapped', styles.list)}>
            <List.Item.Meta
                className={styles.itemMeta}
                description={
                    <div className={styles.filesCount}>
                        <Space size={4}>
                            <span>{dictionary.authorization}</span>
                            <a
                                className={styles.fileLink}
                                href={queryProps.to}
                                onClick={() => {
                                    addQuery({
                                        query: generateQuery({
                                            newFilters: [
                                                generateValueFilter({
                                                    field: 'study.study_code',
                                                    index: queryProps.participantIndex,
                                                    value: [data.study_code],
                                                }),
                                                generateValueFilter({
                                                    field: 'acl',
                                                    index: queryProps.fileIndex,
                                                    value: data.user_acl_in_study,
                                                }),
                                            ],
                                        }),
                                        queryBuilderId: queryProps.queryBuilderId,
                                        setAsActive: true,
                                    });
                                }}
                            >
                                <span>{numberWithCommas(data.total_authorized_files_count)}</span>
                            </a>
                            <span className={styles.of}>{dictionary.of}</span>
                            <a
                                className={styles.fileLink}
                                href={queryProps.to}
                                onClick={() => {
                                    addQuery({
                                        query: generateQuery({
                                            newFilters: [
                                                generateValueFilter({
                                                    field: 'study.study_code',
                                                    index: queryProps.participantIndex,
                                                    value: [data.study_code],
                                                }),
                                            ],
                                        }),
                                        queryBuilderId: queryProps.queryBuilderId,
                                        setAsActive: true,
                                    });
                                }}
                            >
                                <span>{numberWithCommas(data.total_files_count)}</span>
                            </a>
                            <span>{dictionary.files}</span>
                        </Space>
                    </div>
                }
                title={
                    <Text className={styles.title} ellipsis={{ tooltip: title }}>
                        {title}
                    </Text>
                }
            />
            <Text className={styles.dataUseGroups} type="secondary">
                <Space size={4}>
                    <span>{dictionary.dataGroups}</span>
                    <span>{data.user_acl_in_study.join(', ')}</span>
                </Space>
            </Text>
            <Progress
                className={styles.progress}
                percent={Math.round((data.total_authorized_files_count / data.total_files_count) * 100)}
                size="small"
            ></Progress>
        </List.Item>
    );
};

export default AuthorizedStudiesListItem;
