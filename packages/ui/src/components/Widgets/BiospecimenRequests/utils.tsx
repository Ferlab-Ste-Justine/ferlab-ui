import { TBiospecimenRequests } from '.';

export const BIOSPECIMEN_REQUEST_KEY = 'BIOSPECIMEN_REQUEST';
export const SHARED_BIOSPECIMEN_REQUEST_ID_QUERY_PARAM_KEY = 'biospecimenRequestId';

export const BIOSPECIMENT_REQUEST_MAX_TITLE_LENGTH = 200;

export enum SetType {
    PARTICIPANT = 'participant',
    FILE = 'file',
    BIOSPECIMEN = 'biospecimen',
    BIOSPECIMEN_REQUEST = 'biospecimen-request',
    VARIANT = 'variants',
}

export const isNameExists = (newSetName: string, savedSets: TBiospecimenRequests[]): boolean => {
    const requestBioNamesExisting = savedSets
        .filter((set) => set.setType === SetType.BIOSPECIMEN_REQUEST)
        .map((s) => s.tag);

    return requestBioNamesExisting.includes(newSetName);
};
