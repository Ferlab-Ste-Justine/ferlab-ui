import React, { ReactElement } from 'react';
import { Table } from 'antd';
import { get } from 'lodash';

import Empty from '../../Empty';
import { UnmatchTableItem, UploadIdDictionary } from '../types';

import styles from './index.module.scss';

interface OwnProps {
    unmatchItems: UnmatchTableItem[];
    loading?: boolean;
    dictionary: UploadIdDictionary;
}

const UnmatchTable = ({ dictionary, loading = false, unmatchItems }: OwnProps): ReactElement => (
    <Table
        bordered
        className={styles.resultsTable}
        columns={[
            {
                dataIndex: 'submittedId',
                title: dictionary.submittedColTitle,
            },
        ]}
        dataSource={unmatchItems}
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
    ></Table>
);

export default UnmatchTable;
