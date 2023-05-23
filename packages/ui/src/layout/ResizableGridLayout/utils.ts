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
