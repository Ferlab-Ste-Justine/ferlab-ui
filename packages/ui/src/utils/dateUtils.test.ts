import getRelativeDate from './dateUtils';
import { setLocale } from './localeUtils';

describe('Relative date', () => {
    const format = {
        now: 'now',
        pastYear: 'Past Years',
        thisYear: 'This Years',
        today: 'today',
        yesterday: 'yesterday',
    };
    test('should return now', () => {
        const date = new Date();
        expect(getRelativeDate(date, format)).toEqual('now');
    });
    test('should return today', () => {
        const date = new Date(Date.now() - 1000 * 60);
        expect(getRelativeDate(date, format)).toEqual('today');
    });
    test('should return yesterday', () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        expect(getRelativeDate(yesterday, format)).toEqual('yesterday');
    });
    test('should return this years date', () => {
        const today = new Date();
        const startYear = new Date(today.getFullYear(), 0, 1);
        const endPeriodTime = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);

        const randomDate = new Date(
            startYear.getTime() + Math.random() * (endPeriodTime.getTime() - startYear.getTime()),
        );

        expect(getRelativeDate(randomDate, format)).toEqual('This Years');
    });
    test('should return past years date', () => {
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setFullYear(today.getFullYear() - 1);
        expect(getRelativeDate(pastDate, format)).toEqual('Past Years');
    });
    test('should return am', () => {
        const formatAm = {
            today: 'today {ampm}',
        };
        setLocale('en');
        const today = new Date();
        today.setHours(9, 0, 0, 0);
        expect(getRelativeDate(today, formatAm)).toMatch(/am/);
    });
    test('should return am', () => {
        const formatAm = {
            today: 'today {ampm}',
        };
        setLocale('fr');
        const today = new Date();
        today.setHours(9, 0, 0, 0);
        expect(getRelativeDate(today, formatAm)).not.toMatch(/am/);
    });
    test('should return correct time am en', () => {
        const formatTime = {
            yesterday: 'Yesterday at {hour}{ampm}',
        };
        setLocale('en');

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(11);
        yesterday.setMinutes(52);

        expect(getRelativeDate(yesterday, formatTime)).toEqual('Yesterday at 11:52am');
    });
    test('should return correct time am fr', () => {
        const formatTime = {
            yesterday: 'Hier à {hour}{ampm}',
        };
        setLocale('fr');

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(11);
        yesterday.setMinutes(52);

        expect(getRelativeDate(yesterday, formatTime)).toEqual('Hier à 11h52');
    });

    test('should return correct time pm en', () => {
        const formatTime = {
            yesterday: 'Yesterday at {hour}{ampm}',
        };
        setLocale('en');

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(16);
        yesterday.setMinutes(52);

        expect(getRelativeDate(yesterday, formatTime)).toEqual('Yesterday at 4:52pm');
    });

    test('should return correct time pm fr', () => {
        const formatTime = {
            yesterday: 'Hier à {hour}{ampm}',
        };
        setLocale('fr');

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(16);
        yesterday.setMinutes(52);

        expect(getRelativeDate(yesterday, formatTime)).toEqual('Hier à 16h52');
    });
});
