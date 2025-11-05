import { type IStatusTagDictionary } from './types';

/* eslint-disable sort-keys-fix/sort-keys-fix */
export default {
    en: {
        options: {
            active: 'Active',
            draft: 'Draft',
            'on-hold': 'Submitted',
            completed: 'Completed',
            revoked: 'Revoked',
            analysis: 'Analysis',
            're-analysis': 'Reanalysis',
            review: 'In review',
            unknown: 'Unknown',
        },
    } as IStatusTagDictionary,
    fr: {
        options: {
            active: 'Active',
            draft: 'Brouillon',
            'on-hold': 'Soumise',
            completed: 'Complétée',
            revoked: 'Refusée',
            analysis: 'En analyse',
            're-analysis': 'En réanalyse',
            review: 'En révision',
            unknown: 'Inconnu',
        },
    } as IStatusTagDictionary,
};
