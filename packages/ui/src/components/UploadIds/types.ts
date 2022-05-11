import { ReactNode } from 'react';

export interface UploadIdDictionary {
    modalTitle: string;
    collapseTitle?: (matchCount: number, unmatchCount: number) => string;
    matchTabTitle?: (matchCount: number) => string;
    unmatchTabTitle?: (unmatchCount: number) => string;
    submittedColTitle: string;
    modalOkText?: ReactNode;
    modalCancelText?: ReactNode;
    modalUploadBtnText?: string;
    inputLabel?: ReactNode;
    mappedTo?: string;
    uploadBtnText: string;
    matchTable: {
        idColTitle: string;
        matchFieldColTitle: string;
        mappedToFieldColTitle: string;
    };
}

export interface MatchTableItem {
    submittedId: string;
    matchField: string;
    mappedTo: string;
}

export interface UnmatchTableItem {
    submittedId: string;
}
