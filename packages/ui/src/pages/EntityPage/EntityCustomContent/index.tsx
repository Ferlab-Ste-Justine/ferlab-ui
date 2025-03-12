import React, { ReactNode } from 'react';
import { Card, Space, Typography } from 'antd';

import Collapse, { CollapsePanel } from '../../../components/Collapse';
import Empty from '../../../components/Empty';

import styles from './index.module.css';
const { Title } = Typography;

export interface IEntityCustomContent {
    customContent: ReactNode;
    header: React.ReactNode;
    id: string;
    loading: boolean;
    title?: string;
    titleExtra?: ReactNode[];
    emptyMessage?: string;
    total?: number;
}

const EntityCustomContent = ({
    customContent,
    emptyMessage = 'No data available',
    header,
    id,
    loading,
    title,
    titleExtra,
    total = 0,
}: IEntityCustomContent): React.ReactElement => (
    <div className={styles.container} id={id}>
        {title && (
            <Title className={styles.title} level={4}>
                {title}
            </Title>
        )}
        <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['1']}>
            <CollapsePanel
                className={styles.panel}
                extra={titleExtra}
                header={
                    <Space size={2}>
                        {header} {total > 0 && <span>({total})</span>}
                    </Space>
                }
                key="1"
            >
                <Card className={styles.card} loading={loading}>
                    {!loading && customContent ? (
                        <Space className={styles.content} direction="vertical" size={0}>
                            {customContent}
                        </Space>
                    ) : (
                        <Space className={styles.content} direction="vertical" size={12}>
                            <Empty align="left" description={emptyMessage} noPadding showImage={false} size="mini" />
                        </Space>
                    )}
                </Card>
            </CollapsePanel>
        </Collapse>
    </div>
);

export default EntityCustomContent;
