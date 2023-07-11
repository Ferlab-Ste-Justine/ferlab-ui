import React from 'react';
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';

import { ISavedFilter } from '../../QueryBuilder/types';

import styles from './index.module.scss';

interface IQueryPill {
    queryPill: ISavedFilter;
    addPillToQuery: (queryPillId: string) => void;
    editPill: (queryPillId: string) => void;
    duplicatePill: (queryPillId: string) => void;
    deletePill: (queryPillId: string) => void;
}

const QueryPill = ({ addPillToQuery, deletePill, duplicatePill, editPill, queryPill }: IQueryPill): JSX.Element => (
    <div className={styles.queryPillWrapper}>
        <Button className={styles.queryPill} onClick={() => addPillToQuery(queryPill.id)}>
            <Typography.Text ellipsis={{ tooltip: queryPill.title }}>{queryPill.title}</Typography.Text>
        </Button>
        <div className={styles.queryPillEditionWrapper}>
            <Button
                className={styles.queryPillEditionButton}
                icon={<EditOutlined />}
                onClick={() => editPill(queryPill.id)}
                size="small"
            />
            <Button
                className={styles.queryPillEditionButton}
                icon={<CopyOutlined />}
                onClick={() => duplicatePill(queryPill.id)}
                size="small"
            />
            <Button
                className={styles.queryPillEditionButton}
                icon={<DeleteOutlined />}
                onClick={() => deletePill(queryPill.id)}
                size="small"
            />
        </div>
    </div>
);

export default QueryPill;
