import { ReactNode } from 'react';

export type TPractitionnerInfo = {
    practitionerRoles_Id: string;
    name: TPractitionnerName;
    email?: string;
    ldm: string;
    practitioner?: string;
};

export type TPractitionnerName = [
    {
        family: string;
        given: string[];
    },
];

export interface IAssignmentsDictionary {
    select?: {
        actions?: IActions;
        textInfo?: ITextInfo;
    };
    filter?: {
        actions?: IActions;
        textInfo?: ITextInfo;
    };
}

export interface IFilterDictionary {
    actions?: IActions;
    textInfo?: ITextInfo;
}

export interface IActions {
    clear?: ReactNode;
    reset?: ReactNode;
    filter?: ReactNode;
}

export interface ITextInfo {
    searchPlaceholder?: ReactNode;
    notAssigned?: ReactNode;
}
