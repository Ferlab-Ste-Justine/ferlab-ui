export const setLocale = (locale: string): void => {
    localStorage.setItem('locale', locale || 'en');
};
