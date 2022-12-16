const VALUE_SYMBOLE_LIST = [
    { symbol: 'K', value: 1e3 },
    { symbol: 'M', value: 1e6 },
    { symbol: 'G', value: 1e9 },
    { symbol: 'T', value: 1e12 },
    { symbol: 'P', value: 1e15 },
    { symbol: 'E', value: 1e18 },
];

const BLACK_LIST_LENGTH = [1, 2, 3, 4];
const NUM_FORMAT_REGEX = /\.0+$|(\.[0-9]*[1-9])0+$/;

export const getDefaultDigits = (num: number) => {
    switch (num.toString().length) {
        case 5:
        case 7:
            return 1;
        default:
            return 0;
    }
};

export const numberFormat = (num: number, digits = 0) => {
    if (!num) return 0;

    let index: number;
    digits = digits ? digits : getDefaultDigits(num);

    if (BLACK_LIST_LENGTH.includes(num.toString().length)) {
        return num.toLocaleString();
    } else {
        VALUE_SYMBOLE_LIST.forEach((si: any, i) => {
            if (num >= si.value) {
                index = i;
                return false;
            }
        });

        return (
            (num / VALUE_SYMBOLE_LIST[index!].value).toFixed(digits).replace(NUM_FORMAT_REGEX, '$1') +
            VALUE_SYMBOLE_LIST[index!].symbol
        );
    }
};
