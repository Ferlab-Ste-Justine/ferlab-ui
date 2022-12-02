export const toExponentialNotation = (numberCandidate?: number, fractionDigits = 2): string =>
    numberCandidate ? numberCandidate.toExponential(fractionDigits) : '';

const canQuotientBeComputed = (num: number, denum: number) => {
    const areNumbers = !isNaN(num) && !isNaN(denum);
    return areNumbers && denum !== 0;
};

export const formatQuotientOrElse = (num: number, denum: number, defaultValue = '') =>
    canQuotientBeComputed(num, denum) ? `${num} / ${denum}` : defaultValue;

export const formatQuotientToExponentialOrElse = (num: number, denum: number, defaultValue = '') =>
    canQuotientBeComputed(num, denum) ? `${toExponentialNotation(num / denum)}` : defaultValue;

const KEBAB_REGEX = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
export const toKebabCase = (str: string) => {
    const match: string[] = (str && str.match(KEBAB_REGEX)) || [];
    return match.map((x: string) => x.toLowerCase()).join('-');
};
