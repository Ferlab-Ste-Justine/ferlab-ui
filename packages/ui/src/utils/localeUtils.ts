export const setLocale = (locale: string): void => {
    localStorage.setItem('locale', locale || 'en');
};

export function getComponentDictionnary(
    intl: any,
    defaultDictionary: Record<string, any> = {},
    dictionary: Record<string, any> = {},
): Record<string, any> {
    const { currentLocale } = intl?.getInitOptions() || { currentLocale: 'fr' };
    return {
        ...defaultDictionary[currentLocale],
        ...dictionary,
    };
}
