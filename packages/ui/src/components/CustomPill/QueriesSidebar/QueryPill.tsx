import React from 'react';
import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';

import { ISavedFilter } from '../../QueryBuilder/types';

import styles from './index.module.scss';

interface IQueryPill {
    queryPill: ISavedFilter;
}

const QueryPill = ({ queryPill }: IQueryPill): JSX.Element => {
    const addPillToQuery = (pillId: string) => {
        console.log('add pill to query', pillId);
    };
    const editPill = (pillId: string) => {
        console.log('edit pill');
    };
    const duplicatePill = (pillId: string) => {
        console.log('duplicate pill');
    };
    const deletePill = (pillId: string) => {
        console.log('delete pill');
    };
    return (
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
};

export default QueryPill;
