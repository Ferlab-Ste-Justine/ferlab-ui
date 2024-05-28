import { TABLE_EMPTY_PLACE_HOLDER } from '../../common/constants';
import { IVariantEntity } from '../../pages/EntityPage/type';

import { IConsequenceEntity } from './Cell';

// FIXME: SKFP-1104 To remove once aa_change is fixed
export const renderTemporaryAAChange = (hgvsp: string) => {
    if (!hgvsp) return TABLE_EMPTY_PLACE_HOLDER;

    return hgvsp.split(':')[1];
};

// FIXME: SKFP-1104 To remove once coding_dna_change is fixed
export const renderTemporaryCodingDnaChange = (consequence: IConsequenceEntity, variant: IVariantEntity) => {
    if (!consequence.cds_position || !variant.reference || !variant.alternate) return TABLE_EMPTY_PLACE_HOLDER;

    return `c.${consequence.cds_position.split('/')[0]}${variant.reference}>${variant.alternate}`;
};
