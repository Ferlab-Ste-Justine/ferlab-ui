import React from 'react';
import { Table, Tooltip } from 'antd';

import { TABLE_EMPTY_PLACE_HOLDER } from '../../../../common/constants';
import { IVariantEntity, IVariantEntityDictionary, IVariantFrequencies } from '../../types';
import { toExponentialNotation } from '../../utils';
import EmptyMessage from '../EmptyMessage';

import styles from '@ferlab/style/pages/variantEntity/CohortsTable.module.scss';

type ExternalCohortDatum = string | number | null;

type Row = {
    cohort: {
        cohortName: string;
        link?: string;
    };
    alt: ExternalCohortDatum;
    altRef: ExternalCohortDatum;
    homozygotes: ExternalCohortDatum;
    frequency: ExternalCohortDatum;
    key: string;
};

const getExternalColumns = (dictionary: IVariantEntityDictionary['frequencies']) => [
    {
        dataIndex: 'cohort',
        key: 'cohort',
        render: (cohort: { cohortName: string; link?: string }) =>
            cohort.link ? (
                <a href={cohort.link} rel="noopener noreferrer" target="_blank">
                    {cohort.cohortName}
                </a>
            ) : (
                cohort.cohortName
            ),
        title: dictionary.cohort,
    },
    {
        dataIndex: 'alt',
        key: 'alt',
        render: (alt: string) => alt || TABLE_EMPTY_PLACE_HOLDER,
        title: (
            <Tooltip className={styles.dotted} title={dictionary.altAllelesTooltip}>
                {dictionary.altAlleles}
            </Tooltip>
        ),
    },
    {
        dataIndex: 'altRef',
        key: 'altRef',
        render: (altRef: string) => altRef || TABLE_EMPTY_PLACE_HOLDER,
        title: (
            <Tooltip className={styles.dotted} title={dictionary.altRefTooltip}>
                {dictionary.altRef}
            </Tooltip>
        ),
    },
    {
        dataIndex: 'homozygotes',
        key: 'homozygotes',
        render: (homozygotes: string) => homozygotes || TABLE_EMPTY_PLACE_HOLDER,
        title: (
            <Tooltip className={styles.dotted} title={dictionary.homozygotesTooltip}>
                {dictionary.homozygotes}
            </Tooltip>
        ),
    },
    {
        dataIndex: 'frequency',
        key: 'frequency',
        render: (frequency: string) => frequency || TABLE_EMPTY_PLACE_HOLDER,
        title: dictionary.frequency,
    },
];

const makeRowFromFrequencies = (frequencies: IVariantFrequencies | undefined, locus: string): Row[] => {
    if (!frequencies) return [];

    const topmed = frequencies.topmed || {};
    const gnomadGenomes3_1_1 = frequencies.gnomad_genomes_3_1_1 || {};
    const gnomadGenomes3 = frequencies.gnomad_genomes_3_0 || {};
    const gnomadGenomes2_1 = frequencies.gnomad_genomes_2_1 || {};
    const gnomadExomes2_1 = frequencies.gnomad_exomes_2_1 || {};
    const oneThousandsGenomes = frequencies.one_thousand_genomes || {};

    return [
        {
            alt: topmed.ac,
            altRef: topmed.an,
            cohort: {
                cohortName: 'TopMed',
                link: `https://bravo.sph.umich.edu/freeze8/hg38/variant/snv/${locus}`,
            },
            frequency: toExponentialNotation(topmed.af),
            homozygotes: topmed.homozygotes,
            key: 'topmed',
        },
        {
            alt: gnomadGenomes3_1_1.ac,
            altRef: gnomadGenomes3_1_1.an,
            cohort: {
                cohortName: 'gnomAD Genomes (v3.1.1)',
                link: `https://gnomad.broadinstitute.org/variant/${locus}?dataset=gnomad_r3`,
            },
            frequency: toExponentialNotation(gnomadGenomes3_1_1.af),
            homozygotes: gnomadGenomes3_1_1.homozygotes,
            key: 'gnomadGenomes3_1_1',
        },
        {
            alt: gnomadGenomes3.ac,
            altRef: gnomadGenomes3.an,
            cohort: {
                cohortName: 'gnomAD Genomes (v3)',
            },
            frequency: toExponentialNotation(gnomadGenomes3.af),
            homozygotes: gnomadGenomes3.homozygotes,
            key: 'gnomadGenomes3',
        },
        {
            alt: gnomadGenomes2_1.ac,
            altRef: gnomadGenomes2_1.an,
            cohort: {
                cohortName: 'gnomAD Genomes (v2.1)',
            },
            frequency: toExponentialNotation(gnomadGenomes2_1.af),
            homozygotes: gnomadGenomes2_1.homozygotes,
            key: 'gnomadGenomes2_1',
        },
        {
            alt: gnomadExomes2_1.ac,
            altRef: gnomadExomes2_1.an,
            cohort: {
                cohortName: 'gnomAD Exomes (v2.1)',
            },
            frequency: toExponentialNotation(gnomadExomes2_1.af),
            homozygotes: gnomadExomes2_1.homozygotes,
            key: 'gnomadExomes2_1',
        },
        {
            alt: oneThousandsGenomes.ac,
            altRef: oneThousandsGenomes.an,
            cohort: {
                cohortName: '1000 Genomes',
            },
            frequency: toExponentialNotation(oneThousandsGenomes.af),
            homozygotes: oneThousandsGenomes.homozygotes,
            key: 'oneThousandsGenomes',
        },
    ];
};

const hasAtLeastOneTruthyProperty = (obj: Omit<Row, 'key' | 'cohort'>) => Object.values(obj).some((e) => e);

const isExternalCohortsTableEmpty = (rows: Row[]) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rows.every(({ cohort, key, ...visibleRow }: Row) => !hasAtLeastOneTruthyProperty(visibleRow));

interface ICohortsTableProps {
    loading: boolean;
    variant?: IVariantEntity;
    dictionary: IVariantEntityDictionary['frequencies'];
}

const CohortsTable: React.FC<ICohortsTableProps> = ({ dictionary, loading, variant }) => {
    const frequencies = variant?.frequencies;
    const locus = variant?.locus || '';
    const externalCohortsRows = makeRowFromFrequencies(frequencies, locus);
    const hasEmptyCohorts = isExternalCohortsTableEmpty(externalCohortsRows);

    if (!loading && hasEmptyCohorts) {
        return <EmptyMessage message={dictionary.noDataAvailable} />;
    }

    return (
        <Table
            bordered
            columns={getExternalColumns(dictionary)}
            dataSource={externalCohortsRows}
            loading={loading}
            pagination={false}
            rowClassName={styles.notStriped}
            size="small"
        />
    );
};

export default CohortsTable;
