import { TPractitionnerName } from './types';

export const getPractitionnerName = (name: TPractitionnerName): string =>
    `${name[0].given.join(' ')} ${name[0].family}`;
