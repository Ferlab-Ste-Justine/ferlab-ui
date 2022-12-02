import React from 'react';
import { Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import { updateActiveQueryField } from '../../../../components/QueryBuilder/utils/useQueryBuilderState';
import {
    BoundType,
    IParticipantQueryParams,
    IVariantEntity,
    IVariantEntityDictionary,
    IVariantFrequencies,
    IVariantStudyEntity,
    IVariantStudyFrequencies,
} from '../../types';
import { formatQuotientOrElse, formatQuotientToExponentialOrElse } from '../../utils';
import EmptyMessage from '../EmptyMessage';

import StudiesTableSummary from './StudiesTableSummary';

import styles from '@ferlab/style/pages/variantEntity/StudiesTable.module.scss';

type InternalRow = {
    frequencies: IVariantFrequencies;
    key: string;
    participantTotalNumber: number;
    participant_ids: null | string[];
    participant_number: number;
    study_id: string;
};

const MIN_N_OF_PARTICIPANTS_FOR_LINK = 10;

const canMakeParticipantsLink = (nOfParticipants: number) =>
    nOfParticipants && nOfParticipants >= MIN_N_OF_PARTICIPANTS_FOR_LINK;

const getInternalColumns = (
    participantQueryParams: IParticipantQueryParams,
    dictionary: IVariantEntityDictionary['frequencies'],
): ColumnsType<IVariantStudyEntity> => [
    {
        dataIndex: 'study_id',
        key: 'study_id',
        render: (study_id: string) => study_id,
        title: dictionary.studies,
    },
    {
        key: 'participants',
        render: (row: InternalRow) => {
            const participantsNumber = row.participant_number;
            const participantsTotal = row.participantTotalNumber;
            const { field, index, queryBuilderId, route } = participantQueryParams;

            return canMakeParticipantsLink(participantsNumber) ? (
                <>
                    <a
                        href={route}
                        onClick={() => {
                            updateActiveQueryField({
                                field,
                                index,
                                queryBuilderId,
                                value: row.participant_ids || [],
                            });
                        }}
                    >
                        {participantsNumber}
                    </a>
                    {participantsTotal ? ` / ${participantsTotal}` : ''}
                </>
            ) : (
                formatQuotientOrElse(participantsNumber, participantsTotal)
            );
        },
        title: <Tooltip title={dictionary.participantsTooltip}>{dictionary.participants}</Tooltip>,
    },
    {
        key: 'frequency',
        render: (row: InternalRow) => {
            const participantsNumber = row.participant_number;
            const participantsTotal = row.participantTotalNumber;
            return formatQuotientToExponentialOrElse(participantsNumber, participantsTotal);
        },
        title: <Tooltip title={dictionary.frequencyTooltip}>{dictionary.frequency}</Tooltip>,
    },
    {
        dataIndex: 'frequencies',
        key: 'upper_bound_kf_ac',
        render: (frequencies: IVariantStudyFrequencies) => frequencies?.upper_bound_kf?.ac,
        title: <Tooltip title={dictionary.altAllelesTooltip}>{dictionary.altAlleles}</Tooltip>,
        width: '14%',
    },
    {
        dataIndex: 'frequencies',
        key: 'upper_bound_kf_homozygotes',
        render: (frequencies: IVariantStudyFrequencies) => frequencies?.upper_bound_kf?.homozygotes,
        title: <Tooltip title={dictionary.homozygotesTooltip}>{dictionary.homozygotes}</Tooltip>,
        width: '14%',
    },
];

interface IStudiesTableProps {
    loading: boolean;
    variant?: IVariantEntity;
    participantQueryParams: IParticipantQueryParams;
    dictionary: IVariantEntityDictionary['frequencies'];
}

const StudiesTable: React.FC<IStudiesTableProps> = ({ dictionary, loading, participantQueryParams, variant }) => {
    const variantStudies =
        variant?.studies?.hits?.edges.map((e: any, index: number) => ({
            key: index,
            ...e.node,
            participantTotalNumber: variant?.participant_total_number || 0,
        })) || [];

    if (!loading && !variantStudies.length) {
        return <EmptyMessage message={dictionary.noDataAvailable} />;
    }

    const participantTotalNumber = variant?.participant_total_number || 0;
    const participantNumber = variant?.participant_number || 0;
    const variantFrequencies: BoundType | undefined = variant?.frequencies?.internal?.upper_bound_kf;

    return (
        <Table
            bordered
            columns={getInternalColumns(participantQueryParams, dictionary)}
            dataSource={variantStudies}
            loading={loading}
            pagination={false}
            rowClassName={styles.notStriped}
            size="small"
            summary={() => (
                <StudiesTableSummary
                    altAlleles={variantFrequencies?.ac}
                    dictionary={dictionary}
                    homozygotes={variantFrequencies?.homozygotes}
                    participantNumber={participantNumber}
                    participantQueryParams={participantQueryParams}
                    participantTotalNumber={participantTotalNumber}
                    variantStudies={variantStudies}
                />
            )}
        />
    );
};

export default StudiesTable;
