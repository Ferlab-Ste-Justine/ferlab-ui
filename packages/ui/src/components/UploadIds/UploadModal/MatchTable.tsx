import React from 'react';
import { Table } from 'antd';
import { get } from 'lodash';
import Empty from '../../Empty';
import { MatchTableItem, UploadIdDictionary } from '../types';

import styles from '@ferlab/style/components/uploadids/UploadIdsModal.module.scss';

interface OwnProps {
    matchItems: MatchTableItem[];
    loading?: boolean;
    dictionary: UploadIdDictionary;
}

const MatchTable = ({ matchItems, loading = false, dictionary }: OwnProps) => (
    <Table
        bordered
        size="small"
        className={styles.resultsTable}
        dataSource={matchItems}
        pagination={{
            pageSize: 5,
            hideOnSinglePage: true,
            className: styles.tablePagination,
            showSizeChanger: false,
        }}
        loading={loading}
        locale={{
            emptyText: <Empty showImage={false} description={get(dictionary, 'emptyTableDescription', 'No data')} />,
        }}
        columns={[
            {
                key: 'submitted_id',
                title: dictionary.submittedColTitle,
                dataIndex: 'submittedId',
                align: 'center',
                className: styles.tableCell,
            },
            {
                key: 'mapped_to',
                title: get(dictionary, 'mappedTo', 'Mapped To'),
                align: 'center',
                children: [
                    {
                        key: 'match_field',
                        title: dictionary.matchTable.matchToFieldColTitle,
                        dataIndex: 'matchTo',
                    },
                    {
                        key: 'mapped_to_field',
                        title: dictionary.matchTable.mappedToFieldColTitle,
                        dataIndex: 'mappedTo',
                    },
                ],
            },
        ]}
    />
);

export default MatchTable;
