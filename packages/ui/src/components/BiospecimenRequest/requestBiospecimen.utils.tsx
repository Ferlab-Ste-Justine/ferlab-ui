export const BIOSPECIMEN_REQUEST_KEY = 'BIOSPECIMEN_REQUEST';
export const SHARED_BIOSPECIMEN_REQUEST_ID_QUERY_PARAM_KEY = 'biospecimenRequestId';
export const BIOSPECIMENT_REQUEST_MAX_TITLE_LENGTH = 200;

export type IUserSetOutput = {
    updated_date?: string;
    id: string;
    tag: string;
    size: number;
    setType: SetType | string;
};

export enum SetType {
    PARTICIPANT = 'participant',
    FILE = 'file',
    BIOSPECIMEN = 'biospecimen',
    BIOSPECIMEN_REQUEST = 'biospecimen-request',
    VARIANT = 'variants',
}

export const isNameExists = (newSetName: string, savedSets: IUserSetOutput[]): boolean => {
    const requestBioNamesExisting = savedSets
        .filter((set) => set.setType === SetType.BIOSPECIMEN_REQUEST)
        .map((s) => s.tag);

    return requestBioNamesExisting.includes(newSetName);
};

export interface IRequestBiospecimenDictionary {
    buttonLabel: string;
    itemSelectionTooltip: string;
    modal: {
        title: string;
        okText: string;
        cancelText: string;
        closeText: string;
        description: string;
        nameForm: {
            title: string;
            note: string;
            placeholder: string;
            requiredError: string;
            existingNameError: string;
            maximumLength: string;
        };
        alert: {
            errorMessage: string;
            errorDescription: string;
            infoMessage: string;
            infoDescription: string;
            limitMessage: string;
            limitDescription: string;
        };
    };
}

export const DEFAULT_REQUEST_BIOSPECIMEN_DICTIONARY: IRequestBiospecimenDictionary = {
    buttonLabel: 'Request biospecimen',
    itemSelectionTooltip: 'You must select at least 1 item',
    modal: {
        alert: {
            errorDescription:
                'An error had occurred and we were unable to retrieve the data for your request. Please cancel and try again.',
            errorMessage: 'Unable to process your request',
            infoDescription:
                'There are no biospecimen samples available for your selection. Please make different selection and try again.',
            infoMessage: 'No available samples',
            limitDescription:
                'A maximum of 10,000 biospecimens can be included at once. Please narrow down your selection and try again.',
            limitMessage: 'Maximum number exceeded',
        },
        cancelText: 'Cancel',
        closeText: 'Close',
        description:
            'You are about to download the manifest and supporting documents needed to request the selected biospecimen. The report will include information on available samples from your selection.',
        nameForm: {
            existingNameError: 'A biospecimen request with this name already exists',
            maximumLength: 'characters maximum',
            note: 'This request will be saved to your dashboard for future reference.',
            placeholder: 'Biospecimen request name',
            requiredError: 'You must provide a name for this request.',
            title: 'Provide a name for your request',
        },
        okText: 'Download manifest',
        title: 'Request biospecimen',
    },
};
