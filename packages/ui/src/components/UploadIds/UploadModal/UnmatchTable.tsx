import React from 'react';
import { Table } from 'antd';
import { get } from 'lodash';
import Empty from '../../Empty';
import { UnmatchTableItem, UploadIdDictionary } from '../types';

import styles from '@ferlab/style/components/uploadids/UploadIdsModal.module.scss';

interface OwnProps {
    unmatchItems: UnmatchTableItem[];
    loading?: boolean;
    dictionary: UploadIdDictionary;
}

const UnmatchTable = ({ unmatchItems, loading = false, dictionary }: OwnProps) => (
    <Table
        bordered
        size="small"
        dataSource={unmatchItems}
        loading={loading}
        pagination={{
            pageSize: 5,
            hideOnSinglePage: true,
            className: styles.tablePagination,
        }}
        locale={{
            emptyText: <Empty showImage={false} description={get(dictionary, 'emptyTableDescription', 'No data')} />,
        }}
        className={styles.resultsTable}
        columns={[
            {
                title: dictionary.submittedColTitle,
                dataIndex: 'submittedId',
            },
        ]}
    ></Table>
);

export default UnmatchTable;
