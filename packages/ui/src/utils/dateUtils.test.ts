import { getRelativeDate } from './dateUtils';
import { setLocale } from './localeUtils';

describe('Relative date', () => {
    const format = {
        now: 'now',
        pastYear: 'Past Years',
        thisYear: 'This Years',
        today: 'today',
        yesteday: 'yesteday',
    };
    test('should return now', () => {
        const date = new Date();
        expect(getRelativeDate(date, format)).toEqual('now');
    });
    test('should return today', () => {
        const date = new Date(Date.now() - 1000 * 60);
        expect(getRelativeDate(date, format)).toEqual('today');
    });
    test('should return yesteday', () => {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        expect(getRelativeDate(yesterday, format)).toEqual('yesteday');
    });
    test('should return this years date', () => {
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - 7);
        expect(getRelativeDate(pastDate, format)).toEqual('This Years');
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
        const today = new Date();
        today.setHours(9, 0, 0, 0);
        expect(getRelativeDate(today, formatAm)).not.toMatch(/am/);
    });
});
