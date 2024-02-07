import { sendRequestWithRpt } from "..";

const downloadDocuments = (url: string, token?: string) =>
    sendRequestWithRpt({
        method: 'GET',
        url: url,
        responseType: 'blob',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

export const FhirApi = {
    downloadDocuments,
};