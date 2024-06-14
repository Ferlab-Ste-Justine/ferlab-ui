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
    data,
    getDataTypeColumns,
    loading,
    sqon,
}: {
    data: IRequestBioDataRow[];
    getDataTypeColumns: () => ColumnType<any>[];
    loading: boolean;
    sqon?: ISqonGroupFilter;
}) => {
    if (!sqon) return <></>;

    return (
        <Table
            columns={getDataTypeColumns()}
            dataSource={data.map((i) => ({ ...i, key: i.study_code }))}
            pagination={false}
            size="small"
            rowClassName={styles.notStriped}
            bordered
            loading={loading}
        />
    );
};
export default RequestBiospecimenTable;
