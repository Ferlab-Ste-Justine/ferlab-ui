import { toExponentialNotation } from '../../../utils/numberUtils';
import { IPublicCohortRow, IVariantFrequencies } from '../type';

export const makeRowFromFrequencies = (
    frequencies?: IVariantFrequencies | undefined,
    locus?: string,
): IPublicCohortRow[] => {
    if (!frequencies || !locus) return [];

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

const hasAtLeastOneTruthyProperty = (obj: Omit<IPublicCohortRow, 'key' | 'cohort'>) =>
    Object.values(obj).some((e) => e);

export const isExternalCohortsTableEmpty = (rows: IPublicCohortRow[]): boolean =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    rows.every(({ cohort, key, ...visibleRow }: IPublicCohortRow) => !hasAtLeastOneTruthyProperty(visibleRow));
