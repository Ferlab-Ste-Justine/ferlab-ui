import { PaginationViewPerQuery } from '../../components/ProTable/Pagination/constants';
import { TColumnStates } from '../../components/ProTable/types';
import { TSerializedResizableGridLayoutConfig } from '../../layout/ResizableGridLayout';

export interface IUser {
    id: string;
    keycloak_id: string;
    first_name: string;
    last_name: string;
    era_commons_id?: string;
    nih_ned_id?: string;
    email?: string;
    public_email?: string;
    external_individual_fullname?: string;
    external_individual_email?: string;
    roles?: string[];
    affiliation?: string;
    research_area?: string;
    portal_usages?: string[];
    creation_date: Date;
    updated_date: Date;
    consent_date?: Date;
    accepted_terms: boolean;
    understand_disclaimer: boolean;
    completed_registration: boolean;
    commercial_use_reason: string;
    config: TUserConfig;
    linkedin?: string;
    website?: string;
    areas_of_interest?: string[];
    research_area_description?: string;
    profile_image_key?: string | null;
    location_state?: string;
    location_country?: string;
}

export type TUserTableConfig = {
    columns?: TColumnStates;
    viewPerQuery?: PaginationViewPerQuery;
};

export type TUserConfig = {
    data_exploration?: {
        tables?: {
            participants?: TUserTableConfig;
            biospecimens?: TUserTableConfig;
            datafiles?: TUserTableConfig;
            imaging?: TUserTableConfig;
        };
        summary?: {
            layouts?: TSerializedResizableGridLayoutConfig[];
        };
    };
    files?: {
        tables?: {
            biospecimens?: TUserTableConfig;
            experimental_procedures?: TUserTableConfig;
        };
    };
    participants?: {
        tables?: {
            diagnosis?: TUserTableConfig;
            family?: TUserTableConfig;
            phenotype?: TUserTableConfig;
            biospecimens?: TUserTableConfig;
        };
    };
    dashboard?: {
        cards?: {
            order?: string[];
        };
    };
    variants?: {
        tables?: {
            variants?: TUserTableConfig;
        };
    };
    variants_somatic?: {
        tables?: {
            variants?: TUserTableConfig;
        };
    };
    study?: {
        tables?: {
            study?: TUserTableConfig;
        };
    };
};
