import React from 'react';
import { Table } from 'antd';
import { get } from 'lodash';

import Empty from '../../Empty';
import { MatchTableItem, UploadIdDictionary } from '../types';

import styles from './index.module.scss';

interface OwnProps {
    matchItems: MatchTableItem[];
    loading?: boolean;
    dictionary: UploadIdDictionary;
}

const MatchTable = ({ dictionary, loading = false, matchItems }: OwnProps) => (
    <Table
        bordered
        className={styles.resultsTable}
        columns={[
            {
                align: 'center',
                className: styles.tableCell,
                dataIndex: 'submittedId',
                key: 'submitted_id',
                title: dictionary.submittedColTitle,
            },
            {
                align: 'center',
                children: [
                    {
                        dataIndex: 'matchTo',
                        key: 'match_field',
                        render: (field) => field ?? '-',
                        title: dictionary.matchTable.matchToFieldColTitle,
                    },
                    {
                        dataIndex: 'mappedTo',
                        key: 'mapped_to_field',
                        render: (field) => field ?? '-',
                        title: dictionary.matchTable.mappedToFieldColTitle,
                    },
                ],
                key: 'mapped_to',
                title: get(dictionary, 'mappedTo', 'Mapped To'),
            },
        ]}
        dataSource={matchItems}
        loading={loading}
        locale={{
            emptyText: <Empty description={get(dictionary, 'emptyTableDescription', 'No data')} showImage={false} />,
        }}
        pagination={{
            className: styles.tablePagination,
            hideOnSinglePage: true,
            pageSize: 5,
            showSizeChanger: false,
        }}
        size="small"
    />
);

export default MatchTable;
