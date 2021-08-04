import { v4 } from 'uuid';
import { ISqonGroupFilter, ISyntheticSqon, IValueFilter, TSqonGroupOp } from './types';
import { BOOLEAN_OPS, FIELD_OPS } from './operators';

/**
 * Check if a synthetic sqon is empty.
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isEmptySqon = (sqon: ISyntheticSqon | Record<string, never>) => {
    if (!sqon?.op && !sqon?.content) {
        return true;
    }

    return sqon ? BOOLEAN_OPS.includes(sqon?.op) && !Boolean(sqon?.content?.length) : true;
};

export const isNotEmptySqon = (sqon: ISyntheticSqon | Record<string, never>) => {
    return !isEmptySqon(sqon);
};

/**
 * Check if a synthetic sqon is a reference to another sqon.
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isReference = (sqon: ISyntheticSqon | Record<string, never>) => {
    return !isNotReference(sqon);
};

export const isNotReference = (sqon: any) => {
    return isNaN(sqon);
};

/**
 * Check if a synthetic sqon is a value object (IValueContent)
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isValueObject = (sqon: ISyntheticSqon | Record<string, never>) => {
    return typeof sqon === 'object' && !isEmptySqon(sqon) && 'value' in sqon && 'field' in sqon;
};

/**
 * Check if a synthetic sqon is a boolean operator
 * Operator is either one of the following: 'or', 'and' or 'not'
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isBooleanOperator = (sqon: ISyntheticSqon | Record<string, never>) => {
    return typeof sqon === 'object' && !isEmptySqon(sqon) && BOOLEAN_OPS.includes(sqon.op);
};

/**
 * Check if a synthetic sqon is a field operator
 * Operator is either one of the following: '>', '<', 'between', '>=','<=', 'in', 'not-in' or 'all'
 *
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to check
 */
export const isFieldOperator = (sqon: ISyntheticSqon | Record<string, never>) => {
    return typeof sqon === 'object' && !isEmptySqon(sqon) && FIELD_OPS.includes(sqon.op);
};

/**
 * Combine 2 or more synthetic sqons with their index.
 *
 * @param {Array<number>} sqonIndexList Sqon selected reference index list
 * @param {Array<ISyntheticSqon>} sqonsList All synthetic sqons in the query builder
 * @param {TSqonGroupOp} combineOperator The operator for the combine
 *
 * @returns {ISyntheticSqon} The new created sqon
 */
export const combineSyntheticSqons = (
    sqonIndexList: number[],
    sqonsList: ISyntheticSqon[],
    combineOperator: TSqonGroupOp = 'and',
): ISyntheticSqon => {
    let total = 0;
    sqonsList.map((sqon: ISyntheticSqon, i) => {
        if (sqonIndexList.includes(i)) {
            return (total += sqon.total!);
        }
    });

    return {
        id: v4(),
        op: combineOperator,
        content: sqonIndexList.sort(),
        total: total,
    };
};

/**
 * Convert a synthetic sqon into a executable sqon. Resolve all reference if needed.
 *
 * @param {Array<ISyntheticSqon>} sqonsList All synthetic sqons in the query builder
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to resolve
 *
 * @returns {ISqonGroupFilter} An executable sqon
 */
export const resolveSyntheticSqon = (
    sqonsList: ISyntheticSqon[],
    syntheticSqon: ISyntheticSqon | Record<string, never>,
): ISqonGroupFilter => {
    const getNewContent = (syntheticSqon: any): Array<ISqonGroupFilter | IValueFilter> => {
        return syntheticSqon.content
            .map((c: any) => (isReference(c) ? sqonsList[c] : c))
            .map((c: any) => resolveSyntheticSqon(sqonsList, c));
    };

    if (isBooleanOperator(syntheticSqon)) {
        return {
            op: syntheticSqon.op,
            content: getNewContent(syntheticSqon),
        };
    }

    return {
        op: syntheticSqon.op,
        content: syntheticSqon.content as Array<ISqonGroupFilter | IValueFilter>,
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
    const getNewContent = (indexToRemove: number, content: any) => {
        return content
            .filter((content: any) => content !== indexToRemove)
            .map((s: any) => (isReference(s) ? (s > indexToRemove ? s - 1 : s) : s));
    };

    return sqonsList
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
};

/**
 * Recursively change the operator throughout a given synthetic sqon
 *
 * @param {TSqonGroupOp} operator The new operator
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to update
 *
 * @returns {ISyntheticSqon} The modified synthetic sqon
 */
export const changeCombineOperator = (operator: TSqonGroupOp, syntheticSqon: ISyntheticSqon): ISyntheticSqon => {
    const changeSubContentOperator = (content: any) => {
        return content.map((subContent: any) => {
            if (isBooleanOperator(subContent)) {
                return changeCombineOperator(operator, subContent);
            }

            return subContent;
        });
    };

    return {
        ...syntheticSqon,
        op: operator,
        content: changeSubContentOperator(syntheticSqon.content),
    };
};

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
): boolean => {
    const reduceContent = (content: any) => {
        return content.reduce(
            (acc: any, contentSqon: ISyntheticSqon) => acc || isIndexReferencedInSqon(indexReference, contentSqon),
            false,
        );
    };

    if (isBooleanOperator(syntheticSqon)) {
        return reduceContent(syntheticSqon.content);
    } else {
        return typeof syntheticSqon === 'number' && syntheticSqon === indexReference;
    }
};

/**
 * Remove a value from a given synthetic sqon
 *
 * @param {*} contentToRemove The content/value to remove
 * @param {ISyntheticSqon} syntheticSqon The synthetic sqon to update
 *
 * @returns {ISyntheticSqon} The modified synthetic sqon
 */
export const removeContentFromSqon = (
    contentToRemove: any,
    syntheticSqon: ISyntheticSqon | Record<string, never>,
): ISyntheticSqon => {
    return {
        ...syntheticSqon,
        op: syntheticSqon.op,
        content: syntheticSqon.content.filter((content: any) => content !== contentToRemove),
    };
};
