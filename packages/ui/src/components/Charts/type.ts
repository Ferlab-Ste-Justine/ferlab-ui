export interface RawDatum {
    id: string | number;
    x: number;
    y: number;
}

export type TRegion = {
    range: {
        x: number;
        y: number;
    };
    center: {
        x: number;
        y: number;
    };
};

export type TRange = {
    min: number;
    max: number;
    valueScale?: {
        min: number;
        max: number;
    };
};
