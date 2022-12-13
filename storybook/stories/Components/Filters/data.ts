import {
    IActions, ICheckBox, IDictionary,
    IFilter,
    IFilterCount,
    IFilterRange,
    IGlobalSearch,
    IMessages, 
    IRange
} from "@ferlab/ui/components/filters/types";

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
        name: 'four super long data with very long name',
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

export const filtersWithNoData = [... filters, 
    {
        data: {
            count: 42,
            key: '__missing__',
        },
        name: '__missing__',
        id: '__missing__'
    }
]

export const filtersWithBigCounts: IFilter<IFilterCount>[] = [
    {
        data: {
            count: 345,
            key: 'Two',
        },
        name: 'two',
        id: 'id_two'
    },
    {
        data: {
            count: 3450,
            key: 'three',
        },
        name: 'three',
        id: 'id_three'
    },
    {
        data: {
            count: 34589,
            key: 'three',
        },
        name: 'three',
        id: 'id_three'
    },
    {
        data: {
            count: 345892,
            key: 'Four',
        },
        name: 'four super long data with very long name',
        id: 'id_four'
    },
    {
        data: {
            count: 3458923,
            key: 'Five',
        },
        name: 'five',
        id: 'id_five'
    },
    {
        data: {
            count: 34589236,
            key: 'Six',
        },
        name: 'Six',
        id: 'id_six'
    }
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

export const booleanFiltersBigCount: IFilter<IFilterCount>[] = [
    {
        data: {
            count: 345687,
            key: 'true'
        },
        name: 'true',
        id: 'id_one'
    },
    {
        data: {
            count: 450600700,
            key: 'false'
        },
        name: 'false',
        id: 'id_three'
    },
]

const action: IActions = {
    all: 'tout',
    apply: 'appliquer',
    clear: 'dégager',
    less: 'moins',
    more: 'plus',
    none: 'aucun',
    searchPlaceholder: 'recherche',
}

const globalSearch: IGlobalSearch = {
    infoTooltip: 'info',
    placeholder: 'recherche',
}

const message: IMessages = {
    errorNoData: 'aucune donné',
    errorNotFound: 'rien',
}

const checkBox: ICheckBox = {
    searchPlaceholder: 'recherche',
}

const range: IRange = {
    max: 'FMax',
    min: 'FMin',
    unit: 'Unité'
}

export const dictionaryFrench: IDictionary = {
    actions: action,
    globalSearch: globalSearch,
    messages: message,
    checkBox: checkBox,
    range: range,
    operators: {
        between: "Entre (inclusif)",
        lessThan: "Moins que",
        lessThanOfEqual: "Moins que ou égal",
        greaterThan: "Plus que",
        greaterThanOrEqual: "Plus que ou égal"
    }
}
