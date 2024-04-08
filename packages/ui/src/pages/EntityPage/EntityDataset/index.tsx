import React, { ReactNode } from 'react';
import { Card, Descriptions, Typography } from 'antd';
import cx from 'classnames';

import { TABLE_EMPTY_PLACE_HOLDER } from '../../../common/constants';
import Collapse, { CollapsePanel } from '../../../components/Collapse';
import FamilyIcon from '../../../components/Icons/Futuro/FamilyIcon';
import FileIcon from '../../../components/Icons/Futuro/FileIcon';
import StatisticIcon from '../../../components/StatisticIcon';
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
            <StatisticIcon
                count={participant_count}
                icon={<FamilyIcon />}
                label={dictionnary?.participants || 'Participants'}
            />
        </div>
        <div className={styles.rowCountCard}>
            <StatisticIcon count={file_count} icon={<FileIcon />} label={dictionnary?.files || 'Files'} />
        </div>
    </Card>
);

export interface IEntityDatasetProps {
    id?: string;
    descriptions: IEntityDescriptionsItem[];
    loading: boolean;
    title?: string;
    titleExtra?: ReactNode[];
    header: ReactNode;
    participant_count: number;
    file_count: number;
    dictionnary?: {
        participants?: string;
        files?: string;
    };
    containerClassName?: string;
}

const EntityDataset = ({
    containerClassName,
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
    <div className={cx(styles.container, containerClassName)} id={id}>
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
