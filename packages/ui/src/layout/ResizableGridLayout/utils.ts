import { ArrangerValues } from '../../data/arranger/formatting';

export const aggregationToChartData = (buckets: any[] = [], total?: number) =>
    buckets.map(({ doc_count, key }) => {
        const dataKey = key === ArrangerValues.missing ? 'No Data' : key;
        return {
            frequency: total ? (doc_count * 100) / total : '',
            id: dataKey,
            label: dataKey,
            value: doc_count,
        };
    });

export const observedPhenotypeDefaultGridConfig = {
    base: {
        h: 4,
        isResizable: false,
        w: 8,
        x: 0,
        y: 0,
    },
    lg: {
        h: 4,
        w: 8,
        x: 0,
        y: 0,
    },
    md: {
        h: 4,
        w: 6,
        x: 0,
        y: 0,
    },
    sm: {
        h: 4,
        w: 5,
        x: 0,
        y: 0,
    },
    xs: {
        h: 4,
        w: 6,
        x: 0,
        y: 0,
    },
    xss: {
        h: 4,
        w: 4,
        x: 0,
        y: 0,
    },
};

export const mondoDefaultGridConfig = {
    base: {
        h: 4,
        isResizable: false,
        w: 8,
        x: 8,
        y: 0,
    },
    lg: {
        h: 4,
        w: 8,
        x: 8,
        y: 0,
    },
    md: {
        h: 4,
        w: 6,
        x: 6,
        y: 0,
    },
    sm: {
        h: 4,
        w: 5,
        x: 5,
        y: 0,
    },
    xs: {
        h: 4,
        w: 6,
        x: 0,
        y: 4,
    },
    xss: {
        h: 4,
        w: 4,
        x: 0,
        y: 4,
    },
};

export const demographicsDefaultGridConfig = {
    base: {
        h: 2,
        minH: 2,
        minW: 4,
        w: 16,
        x: 0,
        y: 4,
    },
    lg: {
        h: 2,
        w: 16,
        x: 0,
        y: 4,
    },
    md: {
        h: 2,
        w: 12,
        x: 0,
        y: 4,
    },
    sm: {
        h: 2,
        w: 10,
        x: 0,
        y: 4,
    },
    xs: {
        h: 2,
        w: 6,
        x: 0,
        y: 8,
    },
    xss: {
        h: 2,
        w: 4,
        x: 0,
        y: 8,
    },
};

export const ageAtDiagnosisDefaultGridConfig = {
    base: {
        h: 2,
        minH: 2,
        minW: 3,
        w: 8,
        x: 0,
        y: 6,
    },
    lg: {
        h: 2,
        w: 8,
        x: 0,
        y: 6,
    },
    md: {
        h: 2,
        w: 6,
        x: 0,
        y: 6,
    },
    sm: {
        h: 2,
        w: 5,
        x: 0,
        y: 6,
    },
    xs: {
        h: 2,
        w: 6,
        x: 0,
        y: 10,
    },
    xss: {
        h: 2,
        w: 4,
        x: 0,
        y: 10,
    },
};

export const dataCategoryDefaultGridConfig = {
    base: {
        h: 2,
        minH: 2,
        minW: 2,
        w: 8,
        x: 8,
        y: 6,
    },
    lg: {
        h: 2,
        w: 8,
        x: 8,
        y: 6,
    },
    md: {
        h: 2,
        w: 6,
        x: 6,
        y: 6,
    },
    sm: {
        h: 2,
        w: 5,
        x: 5,
        y: 6,
    },
    xs: {
        h: 2,
        w: 6,
        x: 0,
        y: 12,
    },
    xss: {
        h: 2,
        w: 4,
        x: 0,
        y: 12,
    },
};

export const studiesDefaultGridConfig = {
    base: {
        h: 3,
        minH: 2,
        minW: 2,
        w: 4,
        x: 0,
        y: 8,
    },
    lg: {
        h: 3,
        w: 4,
        x: 0,
        y: 8,
    },
    md: {
        h: 3,
        w: 4,
        x: 0,
        y: 8,
    },
    sm: {
        h: 3,
        w: 5,
        x: 0,
        y: 8,
    },
    xs: {
        h: 3,
        w: 6,
        x: 0,
        y: 14,
    },
    xss: {
        h: 3,
        w: 4,
        x: 0,
        y: 14,
    },
};

export const dataTypeDefaultGridConfig = {
    base: {
        h: 3,
        minH: 2,
        minW: 2,
        w: 6,
        x: 4,
        y: 8,
    },
    lg: {
        h: 3,
        w: 6,
        x: 4,
        y: 8,
    },
    md: {
        h: 3,
        w: 7,
        x: 4,
        y: 8,
    },
    sm: {
        h: 4,
        w: 10,
        x: 0,
        y: 12,
    },
    xs: {
        h: 4,
        w: 6,
        x: 0,
        y: 17,
    },
    xss: {
        h: 4,
        w: 4,
        x: 0,
        y: 17,
    },
};
