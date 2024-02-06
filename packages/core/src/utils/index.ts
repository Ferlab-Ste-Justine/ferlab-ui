import React from 'react';
import { FhirApi } from '../api/fhir';

import { HTTP_HEADERS, MIME_TYPES } from './constants';
import { downloadFile, extractFilename } from './helper';

export const downloadDocuments = (
    fileID: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    config: {
        token?: string,
        url: string,
        lang: string,
        type: string,
    },
    errorNotification?: ()=> void,
) => {
    const {token, url, lang, type} = config;
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
                    type,
                });
                downloadFile(blob, fileName);
            }
        })
        .finally(() => {
            setLoading(false);
        });
    setLoading(true);
};
