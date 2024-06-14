import React from 'react';
import { Table } from 'antd';
import { ColumnType } from 'antd/lib/table';

import { ISqonGroupFilter } from '../../data/sqon/types';

import styles from './requestBiospecimen.module.scss';

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
}) => {
    if (!sqon) return <></>;

    return (
        <Table
            columns={columns}
            dataSource={data.map((i) => ({ ...i, key: i.study_code }))}
            data-testid={'reqBioTable'}
            pagination={false}
            size="small"
            rowClassName={styles.notStriped}
            bordered
            loading={loading}
        />
    );
};
export default RequestBiospecimenTable;
