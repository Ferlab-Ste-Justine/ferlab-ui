import React from 'react';
import { FhirApi } from '../api/download';

import { HTTP_HEADERS, MIME_TYPES } from './constants';
import { downloadFile, extractFilename } from './helper';

export const downloadDocuments = (
    fileID: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    config: {
        token?: string,
        url: string,
        type: string,
        format: string
    },
    errorNotification?: ()=> void,
) => {
    const {token, url, type, format} = config;
    FhirApi.downloadDocuments(url, token)
        .then(({ data, error, response }) => {
            if (error) {
                errorNotification && errorNotification()
            } else {
                const fileName = extractFilename(
                    response.headers[HTTP_HEADERS.CONTENT_DISPOSITION],
                    `${fileID}.${format}`,
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
