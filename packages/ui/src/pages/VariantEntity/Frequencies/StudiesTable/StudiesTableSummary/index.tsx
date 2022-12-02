import React from 'react';
import { Table } from 'antd';

import { updateActiveQueryField } from '../../../../../components/QueryBuilder/utils/useQueryBuilderState';
import { ISyntheticSqon } from '../../../../../data/sqon/types';
import { IParticipantQueryParams, IVariantEntityDictionary, IVariantStudyEntity } from '../../../types';
import { formatQuotientOrElse, formatQuotientToExponentialOrElse } from '../../../utils';

import styles from '@ferlab/style/pages/variantEntity/StudiesTableSummary.module.scss';

type EnhancedVariantStudy = IVariantStudyEntity & { participantTotalNumber: number };

type OwnProps = {
    variantStudies: EnhancedVariantStudy[];
    onClickStudyLink?: (sqons: ISyntheticSqon[]) => void;
    currentVirtualStudy?: ISyntheticSqon[];
    participantNumber: number;
    altAlleles: number | undefined;
    homozygotes: number | undefined;
    participantTotalNumber: number;
    participantQueryParams: IParticipantQueryParams;
    dictionary: IVariantEntityDictionary['frequencies'];
};

const MIN_N_OF_PARTICIPANTS_FOR_LINK = 10;

const StudiesTableSummary: React.FC<OwnProps> = (props) => {
    const {
        altAlleles,
        dictionary,
        homozygotes,
        participantNumber,
        participantQueryParams,
        participantTotalNumber,
        variantStudies,
    } = props;

    const hasParticipantLink: boolean = variantStudies.some(
        (s: IVariantStudyEntity) => s.participant_number >= MIN_N_OF_PARTICIPANTS_FOR_LINK,
    );

    const allParticipants: string[] = [
        ...variantStudies.map((s: EnhancedVariantStudy) => s.participant_ids || []),
    ].flat();

    const { field, index, queryBuilderId, route } = participantQueryParams;

    return (
        <Table.Summary.Row className={styles.row}>
            <Table.Summary.Cell className={styles.cell} index={0}>
                {dictionary.total}
            </Table.Summary.Cell>
            <Table.Summary.Cell className={styles.cell} index={1}>
                {hasParticipantLink ? (
                    <>
                        <a
                            className={styles.participantNumLink}
                            href={route}
                            onClick={() => {
                                updateActiveQueryField({
                                    field,
                                    index,
                                    queryBuilderId,
                                    value: allParticipants,
                                });
                            }}
                        >
                            {participantNumber}
                        </a>
                        {participantTotalNumber ? ` / ${participantTotalNumber}` : ''}
                    </>
                ) : (
                    formatQuotientOrElse(participantNumber, participantTotalNumber)
                )}
            </Table.Summary.Cell>
            <Table.Summary.Cell className={styles.cell} index={2}>
                {formatQuotientToExponentialOrElse(participantNumber, participantTotalNumber)}
            </Table.Summary.Cell>
            <Table.Summary.Cell className={styles.cell} index={3}>
                {altAlleles}
            </Table.Summary.Cell>
            <Table.Summary.Cell className={styles.cell} index={4}>
                {homozygotes}
            </Table.Summary.Cell>
        </Table.Summary.Row>
    );
};

export default StudiesTableSummary;
