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

export const formatUserName = (user: { first_name: string; last_name: string; email: string }): string =>
    user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.email;
