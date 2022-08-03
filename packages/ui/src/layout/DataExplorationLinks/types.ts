export interface IStats {
    studies: number;
    fileSize: string;
    samples: number;
    participants: number;
}

export interface IDictionary {
    studies?: string;
    participants?: string;
    biospecimens?: string;
    datafiles?: string;
}
