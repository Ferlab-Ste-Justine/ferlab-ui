import React, { ReactNode } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Badge, Card, Dropdown, Space, Table, Typography } from 'antd';

import style from './index.module.scss';

import { ProColumnType } from '../../../components/ProTable/types';
import Collapse, { CollapsePanel } from '../../../components/Collapse';
import Empty from '../../../components/Empty';

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
}: IEntityNestedTableProps) => {
    return (
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
                                columns={columns}
                                expandable={{
                                    expandedRowRender: (record) => expandedRowRender(record),
                                    defaultExpandedRowKeys: expandedRowKeys,
                                }}
                                dataSource={data}
                                size="small"
                                pagination={false}
                                bordered
                            />
                        ) : (
                            <Empty align="left" description={noDataLabel} noPadding showImage={false} />
                        )}
                    </Card>
                </CollapsePanel>
            </Collapse>
        </div>
    );
};

export default EntityNestedTable;
