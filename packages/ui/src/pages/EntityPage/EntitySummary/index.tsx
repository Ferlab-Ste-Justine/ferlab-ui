import React from 'react';
import { Card, Col, Descriptions, Row } from 'antd';

import Collapse, { CollapsePanel } from '../../../components/Collapse';
import { IEntityDescriptionsItem } from '../EntityDescriptions';

import styles from './index.module.css';

export interface ISummaryProps {
    header?: React.ReactNode;
    title: string;
    data?: any;
    loading: boolean;
    id: string;
}

export interface IEntitySummaryRows {
    title: string;
    data: IEntityDescriptionsItem[];
}

export interface IEntitySummaryColumns {
    column: {
        lg: number;
        md: number;
        xs: number;
    };
    rows: IEntitySummaryRows[];
}

const EntitySummary: React.FC<ISummaryProps> = ({ data, header, id, loading, title }) => (
    <div className={styles.container} id={id}>
        <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['1']}>
            <CollapsePanel className={styles.panel} header={title} key="1">
                <Card className={styles.card} loading={loading}>
                    {header}
                    <Row gutter={[16, 16]}>
                        {data.map((e: IEntitySummaryColumns, index: number) => (
                            <Col {...e.column} className={styles.column} key={index}>
                                {e.rows.map((row: IEntitySummaryRows) => (
                                    <Descriptions bordered column={1} key={row.title} size="small" title={row.title}>
                                        {row.data.map((item: IEntityDescriptionsItem, index) => (
                                            <Descriptions.Item key={index} label={item.label}>
                                                {item.value}
                                            </Descriptions.Item>
                                        ))}
                                    </Descriptions>
                                ))}
                            </Col>
                        ))}
                    </Row>
                </Card>
            </CollapsePanel>
        </Collapse>
    </div>
);

export default EntitySummary;
