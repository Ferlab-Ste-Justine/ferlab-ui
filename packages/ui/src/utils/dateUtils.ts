import { IFlagDate } from '../components/Flag/types';

export const getRelativeDate = (
    date: Date,
    format: IFlagDate = {
        now: 'Now',
        pastYear: '{month} {day}th {year}',
        thisYear: '{month} {day}th at {time}{ampm}',
        today: 'Today at {hour}{ampm}',
        yesteday: 'Yesterday at {hour}{ampm}',
    },
): string | undefined => {
    const diff = Math.round((new Date().getTime() - new Date(date).getTime()) / 1000);
    const now = new Date();
    const hours = date.getHours();
    const yesteday = new Date();
    yesteday.setDate(yesteday.getDate() - 1);
    const locale = localStorage.getItem('locale') === 'fr' ? 'fr-CA' : 'en-US';
    const ampm = hours >= 12 ? 'pm' : 'am';
    if (diff < 30) {
        return format?.now;
    } else if (date.toDateString() === now.toDateString()) {
        if (locale === 'en-US') {
            const time = date.toLocaleString(undefined, { hour12: true });
            return format?.today?.replace('{hour}', time.slice(11, 15)).replace('{ampm}', ampm);
        }
        return format?.today?.replace('{hour}', date.toTimeString().slice(0, 5)).replace('{ampm}', '');
    } else if (date.toDateString() === yesteday.toDateString()) {
        if (locale === 'en-US') {
            const time = date.toLocaleString(undefined, { hour12: true });
            return format?.yesteday?.replace('{hour}', time.slice(11, 15)).replace('{ampm}', ampm);
        }
        return format?.yesteday?.replace('{hour}', date.toTimeString().slice(0, 5)).replace('{ampm}', '');
    } else if (date.getFullYear() === now.getFullYear()) {
        const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
        if (locale === 'en-US') {
            const time = date.toLocaleString(undefined, { hour12: true });
            return format?.thisYear
                ?.replace('{day}', date.getDate().toString())
                .replace('{month}', month)
                .replace('{time}', time.slice(11, 15))
                .replace('{ampm}', ampm);
        }
        return format?.thisYear
            ?.replace('{day}', date.getDate().toString())
            .replace('{month}', month)
            .replace('{time}', date.toTimeString().slice(0, 5))
            .replace('{ampm}', '');
    } else {
        const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
        return format?.pastYear
            ?.replace('{day}', date.getDate().toString())
            .replace('{month}', month)
            .replace('{year}', date.getFullYear().toString())
            .replace('{ampm}', ampm)
            .replace('{ampm}', '');
    }
};
