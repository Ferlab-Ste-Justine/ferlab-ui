import React from 'react';
import { FhirApi } from '../api/fhir';

import { HTTP_HEADERS, MIME_TYPES } from './constants';
import { downloadFile, extractFilename } from './helper';

export const downloadDocuments = (
    fileID: string,
    lang: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    url: string,
    token?: string,
    errorNotification?: ()=> void,
) => {

    FhirApi.downloadDocuments(fileID, lang, url, token)
        .then(({ data, error, response }) => {
            if (error) {
                errorNotification && errorNotification()
            } else {
                const fileName = extractFilename(
                    response.headers[HTTP_HEADERS.CONTENT_DISPOSITION],
                    `${fileID}.pdf`,
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
