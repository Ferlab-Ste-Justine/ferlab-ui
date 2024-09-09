import { ReactNode } from 'react';

import { TPractitionnerName } from '../Assignments/types';

export interface IFlagDictionary {
    options?: {
        flag: ReactNode;
        pin: ReactNode;
        star: ReactNode;
        none: ReactNode;
    };
    filter?: {
        actions?: IActions;
    };
    date?: IFlagDate;
    modal?: {
        title: ReactNode;
        close: ReactNode;
        tooltip: ReactNode;
    };
}

export interface IFlagDate {
    now?: string;
    today?: string;
    yesteday?: string;
    thisYear?: string;
    pastYear?: string;
}

export type TFlagHistory = {
    name: TPractitionnerName | undefined;
    options: string[];
    date: string;
};

export interface IActions {
    reset?: ReactNode;
    filter?: ReactNode;
}
