import { PaginationViewPerQuery } from './constants';

export const getPaginationOptions = (labelFormat: string, customPagination?: number[]) => {
    if (customPagination) {
        return customPagination.map((value) => ({
            label: labelFormat.replace('{value}', value.toString()),
            value: value,
        }));
    }

    return [
        {
            label: labelFormat.replace('{value}', PaginationViewPerQuery.Ten.toString()),
            value: PaginationViewPerQuery.Ten,
        },
        {
            label: labelFormat.replace('{value}', PaginationViewPerQuery.Twenty.toString()),
            value: PaginationViewPerQuery.Twenty,
        },
        {
            label: labelFormat.replace('{value}', PaginationViewPerQuery.Fifty.toString()),
            value: PaginationViewPerQuery.Fifty,
        },
        {
            label: labelFormat.replace('{value}', PaginationViewPerQuery.OneHundred.toString()),
            value: PaginationViewPerQuery.OneHundred,
        },
    ];
};
