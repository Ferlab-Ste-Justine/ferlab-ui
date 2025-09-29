import { type IPriorityTagDictionary } from './types';

/* eslint-disable sort-keys-fix/sort-keys-fix */
export default {
    en: {
        options: {
            asap: 'ASAP',
            routine: 'Routine',
            urgent: 'Urgent',
            stat: 'STAT',
            unknown: 'Unknown',
            tooltip: {
                asap: 'As Soon As Possible',
                routine: 'Routine Service',
                urgent: 'The request should be actioned promptly',
                stat: 'The request should be actioned immediately - highest possible priority',
                unknown: 'unknown priority',
            },
        },
    } as IPriorityTagDictionary,
    fr: {
        options: {
            asap: 'ASAP',
            routine: 'Routine',
            urgent: 'Urgent',
            stat: 'STAT',
            unknown: 'Inconnu',
            tooltip: {
                asap: 'Dès que possible',
                routine: 'Service de routine',
                urgent: 'La demande doit être traitée rapidement',
                stat: 'La demande doit être traitée immédiatement, en priorité la plus élevée possible',
                unknown: 'priorité inconnue',
            },
        },
    } as IPriorityTagDictionary,
};
