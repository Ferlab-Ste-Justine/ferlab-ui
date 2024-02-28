import React, { ReactNode } from 'react';
import { Card, Space, Table, Typography } from 'antd';

import Collapse, { CollapsePanel } from '../../../components/Collapse';
import Empty from '../../../components/Empty';
import { ProColumnType } from '../../../components/ProTable/types';

import style from './index.module.scss';

const { Title } = Typography;

export interface IEntityNestedTableProps {
    columns: ProColumnType[];
    data: any;
    expandedRowRender: (record: any) => ReactNode;
    expandedRowKeys?: string[];
    header: React.ReactNode;
    id: string;
    loading: boolean;
    noDataLabel: string;
    title?: string;
    titleExtra?: ReactNode[];
    total?: number;
}

export const EntityNestedTable = ({
    columns,
    data,
    expandedRowRender,
    expandedRowKeys = undefined,
    header,
    id,
    loading,
    noDataLabel,
    title,
    titleExtra,
    total = 0,
}: IEntityNestedTableProps): JSX.Element => (
    <div className={style.container} id={id}>
        {title && (
            <Title className={style.title} level={4}>
                {title}
            </Title>
        )}
        <Collapse arrowIcon="caretFilled" className={style.collapse} defaultActiveKey={['1']}>
            <CollapsePanel
                className={style.panel}
                extra={titleExtra}
                header={
                    <Space size={2}>
                        {header} {total > 0 && <span>({total})</span>}{' '}
                    </Space>
                }
                key="1"
            >
                <Card className={style.card} loading={loading}>
                    {data ? (
                        <Table
                            bordered
                            columns={columns}
                            dataSource={data}
                            expandable={{
                                defaultExpandedRowKeys: expandedRowKeys,
                                expandedRowRender: (record) => expandedRowRender(record),
                            }}
                            pagination={false}
                            size="small"
                        />
                    ) : (
                        <Empty align="left" description={noDataLabel} noPadding showImage={false} />
                    )}
                </Card>
            </CollapsePanel>
        </Collapse>
    </div>
);

export default EntityNestedTable;
