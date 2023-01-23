import React from 'react';
import { Card, Descriptions, Space, Typography } from 'antd';

import { TABLE_EMPTY_PLACE_HOLDER } from '../../../common/constants';
import Collapse, { CollapsePanel } from '../../../components/Collapse';

import styles from '@ferlab/style/pages/EntityPage/EntityDescriptions.module.scss';

const { Title } = Typography;

export interface IEntityDescriptions {
    id: string;
    descriptions: IEntityDescriptionsItem[];
    loading: boolean;
    title?: string;
    header: string;
    subheader?: React.ReactNode;
}

export interface IEntityDescriptionsItem {
    label: React.ReactNode;
    value: React.ReactNode;
}

const EntityDescriptions: React.FC<IEntityDescriptions> = ({ descriptions, header, id, loading, subheader, title }) => (
    <div className={styles.container} id={id}>
        {title && (
            <Title className={styles.title} level={4}>
                {title}
            </Title>
        )}
        <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['1']}>
            <CollapsePanel className={styles.panel} header={header} key="1">
                <Card className={styles.card} loading={loading}>
                    <Space className={styles.content} direction="vertical" size={0}>
                        {subheader}
                        <Descriptions bordered column={1} size="small">
                            {descriptions.map((description, index) => (
                                <Descriptions.Item key={`${description.label}:${index}`} label={description.label}>
                                    {description.value || TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                            ))}
                        </Descriptions>
                    </Space>
                </Card>
            </CollapsePanel>
        </Collapse>
    </div>
);
export default EntityDescriptions;
