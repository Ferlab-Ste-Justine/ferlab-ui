import React from 'react';
import { Typography } from 'antd';

import Collapse, { CollapsePanel } from '../../../components/Collapse';
import { IParticipantQueryParams, IVariantEntity, IVariantEntityDictionary } from '../types';

import CohortsTable from './CohortsTable';
import StudiesTable from './StudiesTable';

import styles from '@ferlab/style/pages/variantEntity/Frequencies.module.scss';

const { Title } = Typography;

interface IFrequenciesProps {
    variant?: IVariantEntity;
    loading: boolean;
    id: string;
    participantQueryParams: IParticipantQueryParams;
    dictionary: IVariantEntityDictionary['frequencies'];
}

const Frequencies: React.FC<IFrequenciesProps> = ({ dictionary, id, loading, participantQueryParams, variant }) => (
    <div className={styles.container} id={id}>
        <Title className={styles.title} level={4}>
            {dictionary.frequence}
        </Title>
        <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['1']}>
            <CollapsePanel className={styles.panel} header={dictionary.kfStudies} key="1">
                <StudiesTable
                    dictionary={dictionary}
                    loading={loading}
                    participantQueryParams={participantQueryParams}
                    variant={variant}
                />
            </CollapsePanel>
        </Collapse>
        <Collapse arrowIcon="caretFilled" className={styles.collapse} defaultActiveKey={['2']}>
            <CollapsePanel className={styles.panel} header={dictionary.publicCohorts} key="2">
                <CohortsTable dictionary={dictionary} loading={loading} variant={variant} />
            </CollapsePanel>
        </Collapse>
    </div>
);
export default Frequencies;
