import React, { ReactElement } from 'react';
import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';

import { ISqonGroupFilter } from '../../data/sqon/types';

import styles from './requestBiospecimen.module.css';

export interface IRequestBioDataRow {
    study_code: string;
    study_name?: string;
    nb_participants: number;
    nb_available_samples: number;
    nb_containers?: number;
}

const RequestBiospecimenTable = ({
    columns,
    data,
    loading,
    sqon,
}: {
    columns: ColumnType<any>[];
    data: IRequestBioDataRow[];
    loading: boolean;
    sqon?: ISqonGroupFilter;
}): ReactElement => {
    if (!sqon) return <></>;

    return (
        <Table
            bordered
            columns={columns}
            data-testid={'reqBioTable'}
            dataSource={data.map((i) => ({ ...i, key: i.study_code }))}
            loading={loading}
            pagination={false}
            rowClassName={styles.notStriped}
            size="small"
        />
    );
};
export default RequestBiospecimenTable;
