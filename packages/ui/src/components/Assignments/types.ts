import { ReactNode } from 'react';

export type TPractitionnerInfo = {
    practitionerRoles_Id: string;
    name: TPractitionnerName;
    email?: string;
    ldm: string;
};

export type TPractitionnerName = [
    {
        family: string;
        given: string[];
    },
];

export interface IDictionary {
    actions?: IActions;
    select?: ISelectBox;
}

export interface IActions {
    clear: ReactNode;
}

export interface ISelectBox {
    searchPlaceholder: ReactNode;
}
