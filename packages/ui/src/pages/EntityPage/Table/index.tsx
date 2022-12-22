import React from 'react';
import { Card, Space } from 'antd';

import Collapse, { CollapsePanel } from '../../../components/Collapse';
import ProTable from '../../../components/ProTable';
import { IEntityTable } from '../type';

import styles from '@ferlab/style/pages/EntityPageWrapper/EntityTable.module.scss';

const EntityTable: React.FC<IEntityTable> = ({ data, defaultColumns, id, loading, subtitle, title }) => (
    <div className={styles.container} id={id}>
        <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['1']}>
            <CollapsePanel className={styles.panel} header={title} key="2">
                <Card className={styles.card} loading={loading}>
                    <Space className={styles.content} direction="vertical" size={12}>
                        {subtitle}
                        <ProTable
                            bordered
                            columns={defaultColumns}
                            dataSource={data}
                            headerConfig={{
                                hideItemsCount: true,
                                itemCount: {
                                    pageIndex: 0,
                                    pageSize: 0,
                                    total: 0,
                                },
                            }}
                            loading={loading}
                            rowClassName={styles.notStriped}
                            size="small"
                            tableId={id}
                        />
                    </Space>
                </Card>
            </CollapsePanel>
        </Collapse>
    </div>
);
export default EntityTable;
