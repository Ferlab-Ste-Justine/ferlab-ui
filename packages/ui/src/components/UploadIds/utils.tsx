import { MatchTableItem } from './types';

export const extractUploadValues = (arr: MatchTableItem[], key: string | any): string[] =>
    arr.reduce((filtered: string[], o: any) => {
        if (o[key]) filtered.push(o[key]);
        return filtered;
    }, []);
