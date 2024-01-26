/* import { getPositionAt } from '../../utils/helper';


export const FHIR_SR_ID_PREFIX = 'ServiceRequest/';
const extractIdIfThere = (id: string, prefix: string) =>
    id && id.startsWith(prefix)
        ? id.substring(prefix.length, getPositionAt(id, '/', 2) ?? prefix.length)
        : id;

export const extractServiceRequestId = (srId: string) => extractIdIfThere(srId, FHIR_SR_ID_PREFIX);
 */