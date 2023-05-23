import { TPractitionnerName } from './types';

export const getPractitionnerName = (name: TPractitionnerName) => `${name[0].given.join(' ')} ${name[0].family}`;
