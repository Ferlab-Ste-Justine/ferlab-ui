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
            processing: 'Processing',
        },
        date: {
            now: 'Now',
            today: 'Today at {hour}{ampm}',
            yesterday: 'Yesterday at {hour}{ampm}',
            thisYear: '{month} {day}th at {time}{ampm}',
            pastYear: '{month} {day}th {year}',
        },
        modal: {
            title: 'History',
            close: 'Close',
            tooltip: 'View history',
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
            processing: 'En traitement',
        },
        date: {
            now: 'Maintenant',
            today: "Aujourd'hui à {hour}",
            yesterday: 'Hier à {hour}',
            thisYear: 'le {day} {month} à {time}',
            pastYear: 'le {day} {month} {year}',
        },
        modal: {
            title: 'Historique',
            close: 'Fermer',
            tooltip: "Voir l'historique",
        },
    } as IStatusTagDictionary,
};
