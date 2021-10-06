import { v4 } from 'uuid';
import {
    ISqonGroupFilter,
    ISyntheticSqon,
    IValueFilter,
    TSqonContent,
    TSqonContentValue,
    TSqonGroupOp,
    TSyntheticSqonContent,
    TSyntheticSqonContentValue,
} from './types';
import { BooleanOperators, FieldOperators, RangeOperators } from './operators';
import { isEmpty } from 'lodash';

/**
 * Check if a synthetic sqon is empty.
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isEmptySqon = (sqon: ISyntheticSqon | Record<string, never>) => {
    return !Object.keys(sqon).length || isEmpty(sqon?.content);
};

export const isNotEmptySqon = (sqon: ISyntheticSqon | Record<string, never> | TSyntheticSqonContentValue) => {
    return !isEmptySqon(sqon as ISyntheticSqon);
};

/**
 * Check if a synthetic sqon is a reference to another sqon.
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isReference = (sqon: ISyntheticSqon | Record<string, never> | TSyntheticSqonContentValue) => {
    return !isNotReference(sqon);
};

export const isNotReference = (sqon: any) => {
    return isNaN(sqon);
};

/**
 * Check if a synthetic sqon is a boolean operator
 * Operator is either one of the following: 'or', 'and' or 'not'
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isBooleanOperator = (sqon: ISyntheticSqon | Record<string, never> | TSyntheticSqonContentValue) => {
    return typeof sqon === 'object' && isNotEmptySqon(sqon) && sqon.op in BooleanOperators;
};

/**
 * Check if a synthetic sqon is a field operator
 * Operator is either one of the following: '>', '<', 'between', '>=','<=', 'in', 'not-in' or 'all'
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isFieldOperator = (sqon: ISyntheticSqon | Record<string, never> | ISqonGroupFilter) => {
    return typeof sqon === 'object' && isNotEmptySqon(sqon) && sqon.op in FieldOperators;
};

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
    sqon: ISyntheticSqon = { id: v4(), op: BooleanOperators.and, content: [] },
    total: number = 0,
): ISyntheticSqon => ({
    ...sqon,
    total: total,
    content: [],
});

/**
 * Get default sqon
 *
 * @param {ISyntheticSqon} syntheticSqon The default synthetic sqon
 */
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
): ISqonGroupFilter => {
    const getNewContent = (
        syntheticSqon: ISyntheticSqon | Record<string, never> | TSyntheticSqonContentValue,
    ): TSqonContent => {
        return (syntheticSqon as ISyntheticSqon).content
            .map((c: TSyntheticSqonContentValue) => (isReference(c) ? sqonsList[c as number] : c))
            .map((c: ISyntheticSqon | TSyntheticSqonContentValue) => resolveSyntheticSqon(sqonsList, c));
    };

    if (isBooleanOperator(syntheticSqon)) {
        return {
            op: (syntheticSqon as ISqonGroupFilter).op,
            content: getNewContent(syntheticSqon),
        };
    }

    return {
        op: (syntheticSqon as ISqonGroupFilter).op,
        content: (syntheticSqon as ISqonGroupFilter).content as TSqonContent,
    };
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
    const getNewContent = (indexToRemove: number, content: TSyntheticSqonContent) => {
        return content
            .filter((content: TSyntheticSqonContentValue | TSqonContentValue) => content !== indexToRemove)
            .map((s: TSyntheticSqonContentValue | TSqonContentValue) =>
                isReference(s) ? (s > indexToRemove ? (s as number) - 1 : s) : s,
            );
    };

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
    op: operator,
    content: syntheticSqon.content.map((subContent: TSyntheticSqonContentValue) =>
        isBooleanOperator(subContent) ? changeCombineOperator(operator, subContent as ISyntheticSqon) : subContent,
    ) as TSyntheticSqonContent,
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
) => {
    return {
        ...syntheticSqon,
        op: syntheticSqon.op,
        content: syntheticSqon.content.filter((content: TSyntheticSqonContentValue) => content !== contentToRemove),
    };
};
