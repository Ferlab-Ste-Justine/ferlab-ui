import { ReactNode } from 'react';

export interface UploadIdDictionary {
    modalTitle: string;
    collapseTitle?: (matchCount: number, unmatchCount: number) => ReactNode;
    matchTabTitle?: (matchCount: number) => ReactNode;
    unmatchTabTitle?: (unmatchCount: number) => ReactNode;
    tablesMessage?: (submittedCount: number, mappedCount: number) => ReactNode;
    submittedColTitle: ReactNode;
    modalOkText?: ReactNode;
    modalCancelText?: ReactNode;
    modalUploadBtnText?: ReactNode;
    inputLabel?: ReactNode;
    mappedTo?: string;
    uploadBtnText: string;
    clear?: string;
    matchTable: {
        idColTitle: string;
        matchToFieldColTitle: string;
        mappedToFieldColTitle: string;
    };
}

export type TOnUpload = (match: MatchTableItem[]) => void;

export interface MatchTableItem {
    submittedId: string;
    matchTo: string;
    mappedTo: string;
}

export interface UnmatchTableItem {
    submittedId: string;
}

export type TFetchMatchFunc = (ids: string[]) => Promise<MatchTableItem[]>;
