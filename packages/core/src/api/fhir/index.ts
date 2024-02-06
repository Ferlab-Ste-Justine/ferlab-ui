import { sendRequestWithRpt } from "..";

const downloadDocuments = (file_id: string, lang:string , url: string, token?: string) =>
    sendRequestWithRpt({
        method: 'GET',
        url: `${url}/render/${file_id}?format=pdf&lang=${lang}`,
        responseType: 'blob',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

export const FhirApi = {
    downloadDocuments,
};