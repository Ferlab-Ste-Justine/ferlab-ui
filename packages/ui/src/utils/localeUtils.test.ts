import { setLocale } from './localeUtils';

export const localStorageMock = (function () {
    let store: any = {};
    return {
        clear: function () {
            store = {};
        },
        getItem: (key: string) => store[key],
        removeItem: function (key: string) {
            delete store[key];
        },
        setItem: function (key: string, value: string) {
            store[key] = value.toString();
        },
    };
})();

describe(`${setLocale.name}()`, () => {
    beforeEach(() => {
        window.localStorage.clear();
        Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    });
    it('should setItem with "fr" if locale is "fr"', () => {
        setLocale('fr');
        expect(localStorage.getItem('locale')).toStrictEqual('fr');
    });
    it('should setItem with "en" if locale is "en"', () => {
        setLocale('en');
        expect(localStorage.getItem('locale')).toStrictEqual('en');
    });
    it('should setItem with "en" if locale is undefined', () => {
        setLocale(undefined as never);
        expect(localStorage.getItem('locale')).toStrictEqual('en');
    });
    it('should setItem with "en" if locale is null', () => {
        setLocale(null as never);
        expect(localStorage.getItem('locale')).toStrictEqual('en');
    });
    it('should setItem with "en" if locale is an empty string', () => {
        setLocale('');
        expect(localStorage.getItem('locale')).toStrictEqual('en');
    });
});
