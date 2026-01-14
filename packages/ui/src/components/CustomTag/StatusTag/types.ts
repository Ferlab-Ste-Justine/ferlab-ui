import { ReactNode } from 'react';

export interface IStatusTagDictionary {
    options?: {
        active: string | ReactNode;
        draft: string | ReactNode;
        ['on-hold']: string | ReactNode;
        completed: string | ReactNode;
        unknown: string | ReactNode;
    };
    date?: {
        now?: string;
        today?: string;
        yesteday?: string;
        thisYear?: string;
        pastYear?: string;
    };
    modal?: {
        title: ReactNode;
        close: ReactNode;
        tooltip: ReactNode;
    };
}
