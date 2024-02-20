import { TABLE_EMPTY_PLACE_HOLDER } from '@ferlab/ui/core/common/constants';
import EntityPublicCohortTable, {
    IEntityPublicCohortTable,
} from '@ferlab/ui/core/pages/EntityPage/EntityPublicCohortTable';
import { numberWithCommas } from '@ferlab/ui/core/utils/numberUtils';
import { Meta } from '@storybook/react';
import React from 'react';

export default {
    title: '@ferlab/Pages/EntityPage/EntityPublicCohortTable',
    component: EntityPublicCohortTable,
    decorators: [
        (Story) => (
            <>
                <h2>{Story}</h2>
                <Story />
            </>
        ),
    ],
} as Meta;

const EntityPublicCohortTableStory = ({
    storyTitle,
    ...props
}: {
    storyTitle: string;
    props: IEntityPublicCohortTable;
}) => (
    <>
        <h3>{storyTitle}</h3>
        <EntityPublicCohortTable {...props} />
    </>
);

export const BasicEntityPublicCohortTable = EntityPublicCohortTableStory.bind({});
BasicEntityPublicCohortTable.args = {
    bordered: true,
    columns: [
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
            title: 'Cohort',
        },
        {
            dataIndex: 'alt',
            key: 'alt',
            render: (alt: string | number | null) => {
                if (!alt) {
                    return TABLE_EMPTY_PLACE_HOLDER;
                }
                return typeof alt === 'number' ? numberWithCommas(alt) : alt;
            },
            title: 'ALT Alleles',
            tooltip: 'Number of alternative alleles',
        },
        {
            dataIndex: 'altRef',
            key: 'altRef',
            render: (altRef: string | number | null) => {
                if (!altRef) {
                    return TABLE_EMPTY_PLACE_HOLDER;
                }
                return typeof altRef === 'number' ? numberWithCommas(altRef) : altRef;
            },
            title: 'Alleles (ALT + REF)',
            tooltip: 'Alternative alleles + Reference alleles',
        },
        {
            dataIndex: 'homozygotes',
            key: 'homozygotes',
            render: (homozygotes: string | number | null) => {
                if (!homozygotes) {
                    return TABLE_EMPTY_PLACE_HOLDER;
                }
                return typeof homozygotes === 'number' ? numberWithCommas(homozygotes) : homozygotes;
            },
            title: 'Homozygotes',
            tooltip: 'Number of homozygote variants',
        },
        {
            dataIndex: 'frequency',
            key: 'frequency',
            render: (frequency: string) => frequency || TABLE_EMPTY_PLACE_HOLDER,
            title: 'Frequency',
        },
    ],
    frequencies: {
        topmed_bravo: {
            ac: 28645,
            af: 0.228123,
            an: 125568,
            hom: 3811,
            het: 21023,
        },
        gnomad_exomes_2_1_1: {
            ac: 59311,
            af: 0.23611254866678874,
            an: 251198,
            hom: 8416,
        },
        gnomad_genomes_2_1_1: {
            ac: 6178,
            af: 0.19711569140450513,
            an: 31342,
            hom: 730,
        },
        gnomad_genomes_3: {
            ac: 32856,
            af: 0.21622,
            an: 151956,
            hom: 4159,
        },
        thousand_genomes: null,
    },
    locus: '1-152350656-G-T',
    header: 'Public Cohorts',
    id: '',
    loading: false,
    emptyMessage: 'No data available',
};
