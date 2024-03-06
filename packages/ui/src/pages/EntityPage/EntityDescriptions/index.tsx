import React, { ReactNode } from 'react';
import { Card, Descriptions, Space, Typography } from 'antd';

import { TABLE_EMPTY_PLACE_HOLDER } from '../../../common/constants';
import Collapse, { CollapsePanel } from '../../../components/Collapse';
import Empty from '../../../components/Empty';

import styles from './index.module.scss';

const { Title } = Typography;

export interface IEntityDescriptions {
    descriptions: IEntityDescriptionsItem[];
    header: string;
    id?: string;
    loading: boolean;
    noDataLabel?: string;
    subheader?: React.ReactNode;
    title?: string;
    titleExtra?: ReactNode[];
}

export interface IEntityDescriptionsItem {
    label: React.ReactNode;
    value?: React.ReactNode | string;
    separator?: boolean;
}

const EntityDescriptions: React.FC<IEntityDescriptions> = ({
    descriptions,
    header,
    id = '',
    loading,
    noDataLabel = 'No data available',
    subheader,
    title,
    titleExtra,
}) => (
    <div className={styles.container} id={id}>
        {title && (
            <Title className={styles.title} level={4}>
                {title}
            </Title>
        )}
        <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['1']}>
            <CollapsePanel className={styles.panel} extra={titleExtra} header={header} key="1">
                <Card className={styles.card} loading={loading}>
                    {descriptions.length > 0 ? (
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
                    ) : (
                        <Empty align="left" description={noDataLabel} noPadding showImage={false} />
                    )}
                </Card>
            </CollapsePanel>
        </Collapse>
    </div>
);
export default EntityDescriptions;
