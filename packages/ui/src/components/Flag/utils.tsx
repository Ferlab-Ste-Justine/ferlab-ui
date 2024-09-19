import { FlagOption } from './FlagDropdown';

export const sortFlags = (flags: string[]): string[] => {
    const newArray = [];
    if (flags.includes(FlagOption.FLAG)) {
        newArray.push(FlagOption.FLAG);
    }
    if (flags.includes(FlagOption.PIN)) {
        newArray.push(FlagOption.PIN);
    }
    if (flags.includes(FlagOption.STAR)) {
        newArray.push(FlagOption.STAR);
    }

    return newArray;
};
