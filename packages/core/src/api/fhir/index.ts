/* import { sendRequestWithRpt } from "..";

import { LANG } from '../../utils/constants';

const FORM_API_URL = "https://forms.qa.cqgc.hsj.rtss.qc.ca"

const downloadDocuments = (analysis_id: string, lang = LANG.FR) =>
    sendRequestWithRpt({
        method: 'GET',
        url: `${FORM_API_URL}/render/${analysis_id}?format=pdf&lang=${lang}`,
        responseType: 'blob',
    });

export const FhirApi = {
    downloadDocuments,
}; */