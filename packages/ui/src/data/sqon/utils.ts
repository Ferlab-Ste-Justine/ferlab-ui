import { cloneDeep, isEmpty, merge, union } from 'lodash';
import { v4 } from 'uuid';
import { getFiltersQuery, updateQueryParam } from '../filters/utils';

import { BooleanOperators, FieldOperators, RangeOperators, TermOperators } from './operators';
import {
    IMergeOptions,
    ISqonGroupFilter,
    ISyntheticSqon,
    IValueContent,
    IValueFilter,
    MERGE_OPERATOR_STRATEGIES,
    MERGE_VALUES_STRATEGIES,
    TSqonContent,
    TSqonContentValue,
    TSqonGroupOp,
    TSyntheticSqonContent,
    TSyntheticSqonContentValue,
} from './types';

/**
 * Check if a synthetic sqon is empty.
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isEmptySqon = (sqon: ISyntheticSqon | Record<string, never>) =>
    !Object.keys(sqon).length || isEmpty(sqon?.content);

export const isNotEmptySqon = (sqon: ISyntheticSqon | Record<string, never> | TSyntheticSqonContentValue) =>
    !isEmptySqon(sqon as ISyntheticSqon);

/**
 * Check if a synthetic sqon is a reference to another sqon.
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isReference = (sqon: ISyntheticSqon | Record<string, never> | TSyntheticSqonContentValue) =>
    !isNotReference(sqon);

export const isNotReference = (sqon: any) => isNaN(sqon);

/**
 * Check if a synthetic sqon is a boolean operator
 * Operator is either one of the following: 'or', 'and' or 'not'
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isBooleanOperator = (sqon: ISyntheticSqon | Record<string, never> | TSyntheticSqonContentValue) =>
    typeof sqon === 'object' && isNotEmptySqon(sqon) && sqon.op in BooleanOperators;

/**
 * Check if a synthetic sqon is a field operator
 * Operator is either one of the following: '>', '<', 'between', '>=','<=', 'in', 'not-in' or 'all'
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isFieldOperator = (sqon: ISyntheticSqon | Record<string, never> | ISqonGroupFilter) =>
    typeof sqon === 'object' && isNotEmptySqon(sqon) && sqon.op in FieldOperators;

/**
 * Check if a query filter is a boolean one.
 *
 * @param {Boolean}
 */
export const isBooleanFilter = (query: IValueFilter) =>
    query.content.value.every((val) => ['false', 'true'].includes(val.toString().toLowerCase()));

/**
 * Check if a query filter is a range one.
 *
 * @param {Boolean}
 */
export const isRangeFilter = (query: IValueFilter) => query.op in RangeOperators;

/**
 * Generates an empty synthetic sqon
 *
 * @param {ISyntheticSqon} syntheticSqon The empty synthetic sqon
 */
export const generateEmptyQuery = (
    sqon: ISyntheticSqon = { content: [], id: v4(), op: BooleanOperators.and },
    total = 0,
): ISyntheticSqon => ({
    ...sqon,
    content: [],
    total: total,
});

export const getDefaultSyntheticSqon = (id: string = v4()): ISyntheticSqon => ({
    id,
    op: BooleanOperators.and,
    total: 0,
    content: [],
});

/**
 * Convert a synthetic sqon into an executable sqon. Resolve all references if needed.
 *
 * @param {Array<ISyntheticSqon>} sqonsList All synthetic sqons in the query builder
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to resolve
 *
 * @returns {ISqonGroupFilter} An executable sqon
 */
export const resolveSyntheticSqon = (
    sqonsList: ISyntheticSqon[],
    syntheticSqon: ISyntheticSqon | Record<string, never> | TSyntheticSqonContentValue,
    pivot?: string,
): ISqonGroupFilter => {
    const getNewContent = (
        syntheticSqon: ISyntheticSqon | Record<string, never> | TSyntheticSqonContentValue,
    ): TSqonContent =>
        (syntheticSqon as ISyntheticSqon).content
            .map((c: TSyntheticSqonContentValue) => (isReference(c) ? sqonsList[c as number] : c))
            .map((c: ISyntheticSqon | TSyntheticSqonContentValue) => resolveSyntheticSqon(sqonsList, c));

    if (isBooleanOperator(syntheticSqon)) {
        return Object.assign(
            {
                content: getNewContent(syntheticSqon),
                op: (syntheticSqon as ISqonGroupFilter).op,
            },
            pivot ? { pivot: pivot } : null,
        );
    }

    return Object.assign(
        {
            content: (syntheticSqon as ISqonGroupFilter).content as TSqonContent,
            op: (syntheticSqon as ISqonGroupFilter).op,
        },
        pivot ? { pivot: pivot } : null,
    );
};

/**
 * Remove recursively a sqon using its index.
 *
 * @param {number} indexToRemove Index of the synthetic sqon to remove
 * @param {Array<ISyntheticSqon>} sqonsList All synthetic sqons in the query builder
 *
 * @returns {Array<ISyntheticSqon>} The new synthetic sqons list
 */
export const removeSqonAtIndex = (indexToRemove: number, sqonsList: ISyntheticSqon[]): Array<ISyntheticSqon> => {
    const getNewContent = (indexToRemove: number, content: TSyntheticSqonContent) =>
        content
            .filter((content: TSyntheticSqonContentValue | TSqonContentValue) => content !== indexToRemove)
            .map((s: TSyntheticSqonContentValue | TSqonContentValue) =>
                isReference(s) ? (s > indexToRemove ? (s as number) - 1 : s) : s,
            );

    const result = sqonsList
        .filter((s, i) => i !== indexToRemove)
        .map((sqon) => {
            if (isEmptySqon(sqon)) {
                return sqon;
            }

            return {
                ...sqon,
                content: getNewContent(indexToRemove, sqon.content),
            };
        });

    const emptyQueries = result.filter((s) => isEmpty(s.content));

    if (emptyQueries.length) {
        return removeSqonAtIndex(
            result.findIndex((s) => s.id == emptyQueries[0].id),
            result,
        );
    }

    return result;
};

/**
 * Recursively change the operator throughout a given synthetic sqon
 *
 * @param {TSqonGroupOp} operator The new operator
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to update
 *
 * @returns {ISyntheticSqon} The modified synthetic sqon
 */
export const changeCombineOperator = (operator: TSqonGroupOp, syntheticSqon: ISyntheticSqon): ISyntheticSqon => ({
    ...syntheticSqon,
    content: syntheticSqon.content.map((subContent: TSyntheticSqonContentValue) =>
        isBooleanOperator(subContent) ? changeCombineOperator(operator, subContent as ISyntheticSqon) : subContent,
    ) as TSyntheticSqonContent,
    op: operator,
});

/**
 * Recursively check if a synthetic sqon index is referenced inside a given synthetic sqon
 *
 * @param {number} indexReference The index of the synthetic sqon to check
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon from which to verified
 *
 * @returns {boolean} If the index is referenced or not
 */
export const isIndexReferencedInSqon = (
    indexReference: number,
    syntheticSqon: ISyntheticSqon | Record<string, never>,
): boolean =>
    isBooleanOperator(syntheticSqon)
        ? syntheticSqon.content.reduce(
              (acc: boolean, contentSqon: TSyntheticSqonContentValue) =>
                  acc || isIndexReferencedInSqon(indexReference, contentSqon as ISyntheticSqon),
              false,
          )
        : typeof syntheticSqon === 'number' && syntheticSqon === indexReference;

/**
 * Remove a value from a given synthetic sqon
 *
 * @param {*} contentToRemove The content/value to remove
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to update
 *
 * @returns {ISyntheticSqon} The modified synthetic sqon
 */
export const removeContentFromSqon = (
    contentToRemove: TSyntheticSqonContentValue,
    syntheticSqon: ISyntheticSqon | Record<string, never>,
) => ({
    ...syntheticSqon,
    content: syntheticSqon.content.filter((content: TSyntheticSqonContentValue) => content !== contentToRemove),
    op: syntheticSqon.op,
});

export const termToSqon = ({ field, value }: IValueContent) => ({
    content: {
        field: field,
        value: [value].flat(),
    },
    op: 'in',
});

export const addToSqons = ({ fieldsWValues, sqons }: { fieldsWValues: IValueContent[]; sqons: ISyntheticSqon[] }) => {
    const currentSqon = {
        content: fieldsWValues.map(({ field, value }) => ({ ...termToSqon({ field, value }) })),
        op: 'and',
    };

    if (!sqons || sqons.length === 0) {
        return [currentSqon];
    }

    if (isEmptySqon(sqons[sqons.length - 1])) {
        return [...sqons.slice(0, sqons.length - 1), currentSqon];
    }

    return [...sqons, currentSqon];
};

export const deepMergeSqonValue = (sourceSqon: ISyntheticSqon, newSqon: IValueFilter, opts: IMergeOptions) => {
    const clonedSqons = cloneDeep(sourceSqon);

    opts = merge(
        {},
        {
            values: MERGE_VALUES_STRATEGIES.DEFAULT,
            operator: MERGE_OPERATOR_STRATEGIES.DEFAULT,
        },
        opts,
    );

    const found = deeplySetSqonValue(clonedSqons, newSqon, opts);

    return found
        ? clonedSqons
        : {
              ...clonedSqons,
              content: [...clonedSqons.content, newSqon],
          };
};

/**
  * Recursively traverse the `sourceSqon` and mutate the matching field's value and, optionaly, it's operator.
  
  * @param {Object} sourceSqon - a sqon object to traverse recursively and mutate
  * @param {Object} newSqon - a sqon, that may omit the operator,
  * that provide the field name searched and value to be set
  * @param {Object} opts - options to handle merging the values.
  * 
  * @returns `true` if the field was found; `false` otherwise.
  */
const deeplySetSqonValue = (sourceSqon: ISyntheticSqon, newSqon: IValueFilter, opts: IMergeOptions) => {
    let found = false;

    sourceSqon.content.forEach((sqon) => {
        // dont follow references
        if (isReference(sqon)) return;

        const castedSqon = sqon as TSqonContentValue;

        // traverse nested sqons recursively
        if (isBooleanOperator(castedSqon)) {
            found = deeplySetSqonValue(castedSqon as ISyntheticSqon, newSqon, opts);
            return;
        }

        const castedValueSqon = castedSqon as IValueFilter;

        // field found, set the value and operator
        if (castedValueSqon.content.field === newSqon.content.field) {
            found = true;

            if (newSqon.op) {
                if (opts.operator !== MERGE_OPERATOR_STRATEGIES.KEEP_OPERATOR) {
                    castedValueSqon.op = newSqon.op;
                }
            }

            if (opts.values === MERGE_VALUES_STRATEGIES.APPEND_VALUES) {
                castedValueSqon.content.value = union([], castedValueSqon.content.value, newSqon.content.value);
            }

            if (opts.values === MERGE_VALUES_STRATEGIES.OVERRIDE_VALUES) {
                castedValueSqon.content.value = newSqon.content.value;
            }
        }
    });

    return found;
};

export const addFieldToActiveQuery = ({
    field,
    value,
    history,
    index,
    merge_stategy = MERGE_VALUES_STRATEGIES.APPEND_VALUES,
    operator = TermOperators.in,
}: {
    field: string;
    value: Array<string | number | boolean>;
    history: any;
    index?: string;
    merge_stategy?: MERGE_VALUES_STRATEGIES;
    operator?: TermOperators;
}) => {
    let newSqon;
    const filter = getFiltersQuery();
    const newSqonContent = {
        content: {
            field,
            index,
            value,
        },
        op: operator,
    };

    if (!isEmpty(filter)) {
        newSqon = deepMergeSqonValue(filter, newSqonContent, {
            values: merge_stategy,
            operator: MERGE_OPERATOR_STRATEGIES.OVERRIDE_OPERATOR,
        });
    } else {
        newSqon = getDefaultSyntheticSqon();
        newSqon.content = [newSqonContent];
    }

    updateQueryParam(history, 'filters', newSqon);
};

export const generateFilters = ({
    filters,
    newFilters,
    operator = BooleanOperators.and,
}: {
    newFilters: IValueFilter[];
    filters?: ISyntheticSqon;
    operator?: BooleanOperators;
}): ISyntheticSqon => {
    if (isEmpty(filters)) {
        return {
            id: v4(),
            content: newFilters,
            op: operator,
        };
    }

    return {
        id: filters?.id || v4(),
        op: filters?.op || operator,
        content: [...filters!.content, ...newFilters],
    };
};

export const generateValueFilter = ({
    field,
    value,
    index = '',
    operator = TermOperators.in,
}: {
    field: string;
    value: string[];
    index?: string;
    operator?: TermOperators;
}) => ({
    content: { field, value, index },
    op: operator,
});

export const findSqonValueByField = (field: string, sqon: ISqonGroupFilter, prevValue: any = undefined) => {
    let value: any = prevValue;
    sqon.content.forEach((content) => {
        if (isBooleanOperator(content)) {
            value = value || findSqonValueByField(field, content as ISqonGroupFilter, prevValue);
        } else {
            const valueContent = content as IValueFilter;

            if (valueContent.content.field === field) {
                value = value || valueContent.content.value;
            }
        }
    });
    return value;
};

export const removeValueFilterFromSqon = (field: string, sqon: ISqonGroupFilter) => ({
    ...sqon,
    content: sqon.content.filter(function f(sqon: any): boolean {
        if (isBooleanOperator(sqon)) {
            return (sqon.content as TSqonContent).filter(f).length > 0;
        }

        return !((sqon as IValueFilter).content.field === field);
    }),
});
