import { FhirApi } from '../api/fhir';
import { HTTP_HEADERS, LANG, MIME_TYPES } from './constants';
import { downloadFile, extractFilename } from './helper';

export const downloadDocuments = (
    prescriptionId: string,
    lang: LANG,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    token?: String,
    errorNotification?: ()=> void,
) => {

    FhirApi.downloadDocuments(prescriptionId, lang, token)
        .then(({ data, error, response }) => {
            if (error) {
                errorNotification && errorNotification()
            } else {
                const fileName = extractFilename(
                    response.headers[HTTP_HEADERS.CONTENT_DISPOSITION],
                    `${prescriptionId}.pdf`,
                );
                const blob = new Blob([data as BlobPart], {
                    type: MIME_TYPES.APPLICATION_PDF,
                });
                downloadFile(blob, fileName);
            }
        })
        .finally(() => {
            setLoading(false);
        });
    setLoading(true);
};
