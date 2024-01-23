import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Button, List, Progress, Space, Typography } from 'antd';
import cx from 'classnames';

import { generateQuery, generateValueFilter } from '../../../data/sqon/utils';
import { numberWithCommas } from '../../../utils/numberUtils';
import { addQuery } from '../../QueryBuilder/utils/useQueryBuilderState';

import { IAuthorizedStudy } from '.';

import styles from './AuthorizedStudiesListItem.module.scss';

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
    const authorizedAndUncontrolledFilesCount =
        data.authorized_controlled_files_count + data.total_uncontrolled_files_count;

    return (
        <List.Item className={cx('wrapped', styles.list)}>
            <List.Item.Meta
                className={styles.itemMeta}
                description={
                    <BrowserRouter>
                        <div className={styles.filesCount}>
                            <Space size={4}>
                                <span>{dictionary.authorization}</span>
                                <Link
                                    onClick={() => {
                                        addQuery({
                                            query: generateQuery({
                                                newFilters: [
                                                    generateValueFilter({
                                                        field: 'study_id',
                                                        index: queryProps.participantIndex,
                                                        value: [data.study_id],
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
                                    to={queryProps.to}
                                >
                                    <Button className={styles.fileLink} type="link">
                                        <span>{numberWithCommas(authorizedAndUncontrolledFilesCount)}</span>
                                    </Button>
                                </Link>
                                <span className={styles.of}>{dictionary.of}</span>
                                <Link
                                    onClick={() => {
                                        addQuery({
                                            query: generateQuery({
                                                newFilters: [
                                                    generateValueFilter({
                                                        field: 'study_id',
                                                        index: queryProps.participantIndex,
                                                        value: [data.study_id],
                                                    }),
                                                ],
                                            }),
                                            queryBuilderId: queryProps.queryBuilderId,
                                            setAsActive: true,
                                        });
                                    }}
                                    to={queryProps.to}
                                >
                                    <Button className={styles.fileLink} type="link">
                                        <span>{numberWithCommas(data.total_files_count)}</span>
                                    </Button>
                                </Link>
                                <span>{dictionary.files}</span>
                            </Space>
                        </div>
                    </BrowserRouter>
                }
                title={
                    <Text ellipsis title={data.title}>
                        {data.title}
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
                percent={Math.round((authorizedAndUncontrolledFilesCount / data.total_files_count) * 100)}
                size="small"
            ></Progress>
        </List.Item>
    );
};

export default AuthorizedStudiesListItem;
