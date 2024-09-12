import { IUser } from '../pages/CommunityPage/type';

export const removeUnderscoreAndCapitalize = (word: string): string => {
    const frags = word.split('_');
    for (let i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
};

export const addUnderscoreAndLowercase = (phrase: string): string => {
    const words = phrase.split(' ');
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toLowerCase() + words[i].slice(1);
    }
    return words.join('_');
};

export const titleCase = (word: string): string => {
    const frags = word.split(' ');
    for (let i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
};

const KEBAB_REGEX = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
export const toKebabCase = (str: string): string => {
    const match: string[] = (str && str.match(KEBAB_REGEX)) || [];
    return match.map((x: string) => x.toLowerCase()).join('-');
};

export const truncateString = (text: string, maxLength: number) =>
    `${text.substring(0, maxLength)}${text.length > maxLength ? '...' : ''}`;

export const formatUserName = (user: IUser): string =>
    user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.email ?? '';

export const formatCountryAndState = (user: IUser): string => {
    if (user.location_state && user.location_country) {
        return `${user.location_state}, ${user.location_country}`;
    }

    if (user.location_state) {
        return `${user.location_state}`;
    }

    return `${user.location_country}`;
};

export const removeAccents = (text: string): string => {
    const accentsMap: Map<string, RegExp> = new Map([
        ['a', new RegExp('á|à|ã|â|ä', 'g')],
        ['e', new RegExp('é|è|ê|ë', 'g')],
        ['i', new RegExp('í|ì|î|ï', 'g')],
        ['o', new RegExp('ó|ò|ô|õ|ö', 'g')],
        ['u', new RegExp('ú|ù|û|ü', 'g')],
        ['c', new RegExp('ç', 'g')],
        ['n', new RegExp('ñ', 'g')],
    ]);

    let result = text;

    accentsMap.forEach((value, key) => {
        result = result.replaceAll(value, key);
    });

    return result;
};
