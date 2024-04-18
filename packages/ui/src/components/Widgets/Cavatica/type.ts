export enum CavaticaAnalyticsAction {
    ANALYSE = 'ANALYSE',
    PROJECT_CREATED = 'PROJECT_CREATED',
}

export enum PASSPORT_AUTHENTIFICATION_STATUS {
    connected = 'connected',
    disconnected = 'disconnected',
    unknown = 'unknown',
}

export enum CAVATICA_ANALYSE_STATUS {
    unauthorize = 'unauthorize_files',
    upload_limit_reached = 'upload_limit_reached',
    pending_analyse = 'pending_analyse',
    pending_copy = 'pending_copy',
    copied = 'copied',
    analyzed = 'analyzed',
    unknow = 'unknow',
    generic_error = 'generic_error',
}

export interface ICavaticaAuthentification {
    status: PASSPORT_AUTHENTIFICATION_STATUS;
    error: boolean;
    loading: boolean;
}

export interface ICavaticaProject {
    href: string;
    id: string;
    name: string;
    category: string;
    created_by: string;
    created_on: string;
    modified_on: string;
    memberCount?: number;
}

export interface ICavaticaProjects {
    data: ICavaticaProject[];
    loading: boolean;
    error?: any;
}

export interface ICavaticaBillingGroup {
    id: string;
    href: string;
    name: string;
}

export interface IBillingGroups {
    data: ICavaticaBillingGroup[];
    loading: boolean;
    error?: any;
}

export interface ICavaticaBulkImportData {
    files: ICavaticaFileEntity[];
    authorizedFiles: ICavaticaFileEntity[];
    loading: boolean;
    status?: CAVATICA_ANALYSE_STATUS;
}

export interface ICavaticaFileEntity {
    study: {
        study_name: string;
    };
}
