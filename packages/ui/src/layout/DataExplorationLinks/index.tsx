import React, { ReactElement, useEffect } from 'react';
import { FileTextOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import get from 'lodash/get';

import CardHeader from '../../components/CardHeader';
import ExternalLink from '../../components/ExternalLink';
import ExternalLinkIcon from '../../components/icons/ExternalLinkIcon';
import LinkBox from '../../components/LinkBox';
import { numberFormat } from '../../utils/numberUtils';
import GridCard from '../../view/v2/GridCard';

import { STATIC_ROUTES } from './routes';
import { IDictionary, IStats } from './types';

import styles from '@ferlab/style/layout/DataExplorationLinks/DataExplorationLinks.module.scss';

export type DataExplirationLinksProps = {
    dictionary?: IDictionary;
    fetchStats: () => void;
    stats: IStats;
};

const formatStorage = (storage: string) => {
    if (!storage) return;
    const parts = storage.split(/\.| /);
    return `${parts[0]}${parts[2]}`;
};

const DataExplorationLinks = ({ dictionary = {}, fetchStats, stats }: DataExplirationLinksProps): ReactElement => {
    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <GridCard
            className={styles.dataExplorationLinksCard}
            content={
                <Row gutter={[16, 16]}>
                    <Col className={styles.customCol} flex="auto">
                        <LinkBox
                            icon={<ReadOutlined className={styles.dataReleaseIcon} />}
                            label={numberFormat(stats?.studies)}
                            multiLabelClassName={styles.dataReleaseStatsLabel}
                            subLabel={get(dictionary, 'studies', 'Studies')}
                            to={STATIC_ROUTES.STUDIES}
                        />
                    </Col>
                    <Col className={styles.customCol} flex="auto">
                        <LinkBox
                            icon={<UserOutlined className={styles.dataReleaseIcon} />}
                            label={numberFormat(stats?.participants)}
                            multiLabelClassName={styles.dataReleaseStatsLabel}
                            subLabel={get(dictionary, 'participants', 'Participants')}
                            to={STATIC_ROUTES.DATA_EXPLORATION_PARTICIPANTS}
                        />
                    </Col>
                    <Col className={styles.customCol} flex="auto">
                        <LinkBox
                            icon={<FileTextOutlined className={styles.dataReleaseIcon} />}
                            label={numberFormat(stats?.samples)}
                            multiLabelClassName={styles.dataReleaseStatsLabel}
                            subLabel={get(dictionary, 'biospecimens', 'Biospecimens')}
                            to={STATIC_ROUTES.DATA_EXPLORATION_BIOSPECIMENS}
                        />
                    </Col>
                    <Col className={styles.customCol} flex="auto">
                        <LinkBox
                            icon={<FileTextOutlined className={styles.dataReleaseIcon} />}
                            label={formatStorage(stats?.fileSize) || '0TB'}
                            multiLabelClassName={styles.dataReleaseStatsLabel}
                            subLabel={get(dictionary, 'datafiles', 'Data files')}
                            to={STATIC_ROUTES.DATA_EXPLORATION_DATAFILES}
                        />
                    </Col>
                </Row>
            }
            title={
                <CardHeader
                    extra={[
                        <ExternalLink href="" key="data-release">
                            <Button className={styles.releaseNoteBtn} type="link">
                                Data release 1.0
                                <ExternalLinkIcon />
                            </Button>
                        </ExternalLink>,
                    ]}
                    id="data-exploration"
                    title="Data Exploration"
                />
            }
            wrapperClassName={styles.dataExplorationLinksWrapper}
        />
    );
};

export default DataExplorationLinks;
