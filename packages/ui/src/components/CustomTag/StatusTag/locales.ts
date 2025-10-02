import { type IStatusTagDictionary } from './types';

/* eslint-disable sort-keys-fix/sort-keys-fix */
export default {
    en: {
        options: {
            active: 'Completed',
            draft: 'Draft',
            'on-hold': 'Submitted',
            onhold: 'Submitted',
            completed: 'Completed',
            unknown: 'Unknown',
        },
    } as IStatusTagDictionary,
    fr: {
        options: {
            active: 'Complétée',
            draft: 'Brouillon',
            'on-hold': 'Soumise',
            onhold: 'Soumise',
            completed: 'Complétée',
            unknown: 'Inconnu',
        },
    } as IStatusTagDictionary,
};
