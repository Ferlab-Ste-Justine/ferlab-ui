import {IFilter, IFilterCount, IFilterRange} from "@ferlab/ui/components/filters/types";

export const filters: IFilter<IFilterCount>[] = [
    {
        data: {
            count: 1,
            key: 'One',
        },
        name: 'one',
        id: 'id_one'
    },
    {
        data: {
            count: 2,
            key: 'Two',
        },
        name: 'two',
        id: 'id_two'
    },
    {
        data: {
            count: 3,
            key: 'three',
        },
        name: 'three',
        id: 'id_three'
    },
    {
        data: {
            count: 4,
            key: 'Four',
        },
        name: 'four',
        id: 'id_four'
    },
    {
        data: {
            count: 5,
            key: 'Five',
        },
        name: 'five',
        id: 'id_five'
    },
    {
        data: {
            count: 6,
            key: 'Six',
        },
        name: 'six',
        id: 'id_six'
    },
    {
        data: {
            count: 7,
            key: 'Seven',
        },
        name: 'seven',
        id: 'id_seven'
    },
    {
        data: {
            count: 8,
            key: 'Eight',
        },
        name: 'eight',
        id: 'id_eight'
    },
    {
        data: {
            count: 9,
            key: 'Nine',
        },
        name: 'nine',
        id: 'id_nine'
    },

]


export const rangeFilters: IFilter<IFilterRange>[] = [
    {
        data: {
            max: 10,
            min: 1,
            rangeType: '',
        },
        name: 'one',
        id: 'id_one'
    },
    {
        data: {
            max: 5,
            min: 2,
            rangeType: '',
        },
        name: 'two',
        id: 'id_two'
    },
    {
        data: {
            max: 15,
            min: 3,
            rangeType: '',
        },
        name: 'three',
        id: 'id_three'
    },
    {
        data: {
            max: 12,
            min: 4,
            rangeType: '',
        },
        name: 'four',
        id: 'id_four'
    },
    {
        data: {
            max: 17,
            min: 5,
            rangeType: '',
        },
        name: 'five',
        id: 'id_five'
    },
]

export const booleanFilters: IFilter<IFilterCount>[] = [
    {
        data: {
            count: 1000,
            key: 'true'
        },
        name: 'true',
        id: 'id_one'
    },
    {
        data: {
            count: 200,
            key: 'false'
        },
        name: 'false',
        id: 'id_two'
    },
]