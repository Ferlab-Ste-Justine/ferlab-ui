export const removeUnderscoreAndCapitalize = (word: string) => {
    const frags = word.split('_');
    for (let i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
};

export const titleCase = (word: string) => {
    const frags = word.split(' ');
    for (let i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(' ');
};

const KEBAB_REGEX = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
export const toKebabCase = (str: string) => {
    const match: string[] = (str && str.match(KEBAB_REGEX)) || [];
    return match.map((x: string) => x.toLowerCase()).join('-');
};
