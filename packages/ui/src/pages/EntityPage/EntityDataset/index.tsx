import React from 'react';
import { FileTextOutlined, UserOutlined } from '@ant-design/icons';
import { Card, Descriptions, Typography } from 'antd';

import { TABLE_EMPTY_PLACE_HOLDER } from '../../../common/constants';
import Collapse, { CollapsePanel } from '../../../components/Collapse';
import { numberFormat } from '../../../utils/numberUtils';
import { IEntityDescriptionsItem } from '../EntityDescriptions';

import styles from './index.module.scss';

const { Title } = Typography;

interface ICountCardProps {
    file_count: number;
    participant_count: number;
    dictionnary?: {
        participants?: string;
        files?: string;
    };
}

const CountCard = ({ dictionnary, file_count = 0, participant_count = 0 }: ICountCardProps) => (
    <Card className={styles.countCardContainer}>
        <div className={styles.rowCountCard}>
            <UserOutlined className={styles.icon} />
            <div className={styles.alignBaseline}>
                <span className={styles.count}>{participant_count ? numberFormat(participant_count) : '-'}</span>
                <span className={styles.name}>{dictionnary?.participants || 'Participants'}</span>
            </div>
        </div>
        <div className={styles.rowCountCard}>
            <FileTextOutlined className={styles.icon} />
            <div className={styles.alignBaseline}>
                <span className={styles.count}>{file_count ? numberFormat(file_count) : '-'}</span>
                <span className={styles.name}>{dictionnary?.files || 'Files'}</span>
            </div>
        </div>
    </Card>
);

export interface IEntityDatasetProps {
    id?: string;
    descriptions: IEntityDescriptionsItem[];
    loading: boolean;
    title?: string;
    titleExtra?: React.ReactNode[];
    header: string;
    participant_count: number;
    file_count: number;
    dictionnary?: {
        participants?: string;
        files?: string;
    };
}

const EntityDataset = ({
    descriptions,
    dictionnary,
    file_count,
    header,
    id = '',
    loading,
    participant_count,
    title,
    titleExtra,
}: IEntityDatasetProps): React.ReactElement => (
    <div className={styles.container} id={id}>
        {title && (
            <Title className={styles.title} level={4}>
                {title}
            </Title>
        )}
        <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['1']}>
            <CollapsePanel className={styles.panel} extra={titleExtra} header={header} key="1">
                <Card className={styles.card} loading={loading}>
                    <div className={styles.rowDataset}>
                        <Descriptions bordered className={styles.descriptionsCard} column={1} size="small">
                            {descriptions.map((description, index) => (
                                <Descriptions.Item key={`${description.label}:${index}`} label={description.label}>
                                    {description.value || TABLE_EMPTY_PLACE_HOLDER}
                                </Descriptions.Item>
                            ))}
                        </Descriptions>
                        <CountCard
                            dictionnary={dictionnary}
                            file_count={file_count}
                            participant_count={participant_count}
                        />
                    </div>
                </Card>
            </CollapsePanel>
        </Collapse>
    </div>
);

export default EntityDataset;
