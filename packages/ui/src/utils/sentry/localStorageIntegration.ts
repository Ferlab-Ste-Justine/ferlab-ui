import type { Event, EventHint } from '@sentry/react';

const getLocalStorageObject = () => {
    const data: Record<string, any> = {};
    Object.keys(localStorage).forEach((value) => {
        data[value] = localStorage.getItem(value);
    });
    return data;
};

export const localStorageIntegration = (name: string) => ({
    name,
    processEvent(event: Event, hint: EventHint | undefined) {
        const date = new Date();
        const today = date.toLocaleDateString().replaceAll('/', '_');
        if (hint) {
            hint.attachments = [
                {
                    data: JSON.stringify(getLocalStorageObject()),
                    filename: `local_storage_${today}_${date.getHours()}h_${date.getMinutes()}m.json`,
                },
            ];
        }
        return event;
    },
});
