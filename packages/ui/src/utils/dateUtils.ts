import { IFlagDate } from '../components/Flag/types';

export default (
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
    const formattedFrTime = date
        .toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            hour12: false,
            minute: '2-digit',
        })
        .replace(':', 'h');
    const formattedEnTime = date
        .toLocaleTimeString('en-US', {
            hour: 'numeric',
            hour12: true,
            minute: '2-digit',
        })
        .replace(' AM', '')
        .replace(' PM', '');
    if (diff < 30) {
        //Now
        return format?.now;
    } else if (date.toDateString() === now.toDateString()) {
        // Today
        if (locale === 'en-US') {
            return format?.today?.replace('{hour}', formattedEnTime).replace('{ampm}', ampm);
        }
        return format?.today?.replace('{hour}', formattedFrTime).replace('{ampm}', '');
    } else if (date.toDateString() === yesteday.toDateString()) {
        //Yesteday
        if (locale === 'en-US') {
            return format?.yesteday?.replace('{hour}', formattedEnTime).replace('{ampm}', ampm);
        }
        return format?.yesteday?.replace('{hour}', formattedFrTime).replace('{ampm}', '');
    } else if (date.getFullYear() === now.getFullYear()) {
        // This year
        const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
        if (locale === 'en-US') {
            return format?.thisYear
                ?.replace('{day}', date.getDate().toString())
                .replace('{month}', month)
                .replace('{time}', formattedEnTime)
                .replace('{ampm}', ampm);
        }
        return format?.thisYear
            ?.replace('{day}', date.getDate().toString())
            .replace('{month}', month)
            .replace('{time}', formattedFrTime)
            .replace('{ampm}', '');
    } else {
        //Past Years
        const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
        return format?.pastYear
            ?.replace('{day}', date.getDate().toString())
            .replace('{month}', month)
            .replace('{year}', date.getFullYear().toString())
            .replace('{ampm}', ampm)
            .replace('{ampm}', '');
    }
};
