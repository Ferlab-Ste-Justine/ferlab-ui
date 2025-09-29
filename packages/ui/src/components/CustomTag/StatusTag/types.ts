import { ReactNode } from 'react';

export interface IStatusTagDictionary {
    options?: {
        active: string | ReactNode;
        draft: string | ReactNode;
        ['on-hold']: string | ReactNode;
        completed: string | ReactNode;
        unknown: string | ReactNode;
    };
}
