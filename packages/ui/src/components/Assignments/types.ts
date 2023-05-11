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
