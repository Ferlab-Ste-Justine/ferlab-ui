import { getDefaultDigits, numberFormat } from './numberUtils';

describe(`${getDefaultDigits.name}()`, () => {
    it('should return 0 for numbers with fewer than 5 digits', () => {
        expect(getDefaultDigits(1)).toBe(0);
        expect(getDefaultDigits(12)).toBe(0);
        expect(getDefaultDigits(123)).toBe(0);
        expect(getDefaultDigits(1234)).toBe(0);
    });

    it('should return 1 for numbers with 5 or 7 digits', () => {
        expect(getDefaultDigits(12345)).toBe(1);
        expect(getDefaultDigits(1234567)).toBe(1);
    });

    it('should return 0 for numbers with more than 7 digits', () => {
        expect(getDefaultDigits(12345678)).toBe(0);
    });

    it('should return 0 for negative numbers', () => {
        expect(getDefaultDigits(-123)).toBe(0);
        expect(getDefaultDigits(-12345)).toBe(0);
        expect(getDefaultDigits(-12345678)).toBe(0);
    });
});

describe(`${numberFormat.name}()`, () => {
    it('should return 0 if num is falsy', () => {
        // @ts-expect-error intentional wrong type
        expect(numberFormat(null)).toBe(0);
        // @ts-expect-error intentional wrong type
        expect(numberFormat(undefined)).toBe(0);
        expect(numberFormat(0)).toBe(0);
    });

    it('should return the english localized string if num is in BLACK_LIST_LENGTH and locale is en', () => {
        localStorage.setItem('locale', 'en');
        expect(numberFormat(1)).toBe('1');
        expect(numberFormat(10)).toBe('10');
        expect(numberFormat(100)).toBe('100');
        expect(numberFormat(1000)).toBe('1,000');
    });

    it('should return the french localized string if num is in BLACK_LIST_LENGTH and locale is fr', () => {
        localStorage.setItem('locale', 'fr');
        expect(numberFormat(1)).toBe('1');
        expect(numberFormat(10)).toBe('10');
        expect(numberFormat(100)).toBe('100');
        expect(numberFormat(1000)).toEqual('1\xa0000');
    });

    it('should return the default localized string if num is in BLACK_LIST_LENGTH and locale is not defined', () => {
        localStorage.setItem('locale', undefined as never);
        expect(numberFormat(1000)).toBe('1,000');
    });

    it('should return the default localized string if num is in BLACK_LIST_LENGTH and locale is null', () => {
        localStorage.setItem('locale', null as never);
        expect(numberFormat(1000)).toBe('1,000');
    });

    it('should return the default localized string if num is in BLACK_LIST_LENGTH and locale is an empty string', () => {
        localStorage.setItem('locale', '');
        expect(numberFormat(1000)).toBe('1,000');
    });

    it('should return the symbolized value if num is not in BLACK_LIST_LENGTH', () => {
        expect(numberFormat(10000)).toBe('10K');
        expect(numberFormat(100000)).toBe('100K');
        expect(numberFormat(1000000)).toBe('1M');
        expect(numberFormat(10000000)).toBe('10M');
        expect(numberFormat(100000000)).toBe('100M');
        expect(numberFormat(1000000000)).toBe('1G');
        expect(numberFormat(10000000000)).toBe('10G');
        expect(numberFormat(100000000000)).toBe('100G');
        expect(numberFormat(1000000000000)).toBe('1T');
        expect(numberFormat(10000000000000)).toBe('10T');
        expect(numberFormat(100000000000000)).toBe('100T');
        expect(numberFormat(1000000000000000)).toBe('1P');
        expect(numberFormat(10000000000000000)).toBe('10P');
        expect(numberFormat(100000000000000000)).toBe('100P');
        expect(numberFormat(1000000000000000000)).toBe('1E');
        expect(numberFormat(10000000000000000000)).toBe('10E');
        expect(numberFormat(100000000000000000000)).toBe('100E');
    });

    it('should use the provided digits if passed as an argument', () => {
        expect(numberFormat(12345, 1)).toBe('12.3K');
        expect(numberFormat(123456, 2)).toBe('123.46K');
        expect(numberFormat(1234567, 3)).toBe('1.235M');
        expect(numberFormat(12345678, 4)).toBe('12.3457M');
    });
});
