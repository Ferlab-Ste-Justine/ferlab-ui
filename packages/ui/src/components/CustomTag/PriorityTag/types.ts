import { ReactNode } from 'react';

export interface IPriorityTagDictionary {
    options?: {
        asap: string | ReactNode;
        routine: string | ReactNode;
        urgent: string | ReactNode;
        stat: string | ReactNode;
        unknown: string | ReactNode;
        tooltip: {
            asap: string | ReactNode;
            routine: string | ReactNode;
            urgent: string | ReactNode;
            stat: string | ReactNode;
            unknown: string | ReactNode;
        };
    };
}
