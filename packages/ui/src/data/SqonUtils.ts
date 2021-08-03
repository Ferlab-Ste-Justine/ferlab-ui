import { v4 } from 'uuid';
import { ISyntheticSqon, TSqonGroupOp } from './types';
import { BOOLEAN_OPS, FIELD_OPS } from './operators';

export const isEmptySqon = (sqon: ISyntheticSqon | Record<string, never>) => {
    if (!sqon?.op && !sqon?.content) {
        return true;
    }

    return sqon ? BOOLEAN_OPS.includes(sqon?.op) && !Boolean(sqon?.content?.length) : true;
};

export const isNotEmptySqon = (sqon: ISyntheticSqon | Record<string, never>) => {
    return !isEmptySqon(sqon);
};

export const isReference = (sqon: ISyntheticSqon | Record<string, never>) => {
    return !isNotReference(sqon);
};

export const isNotReference = (sqon: any) => {
    return isNaN(sqon);
};

export const isValueObject = (sqon: ISyntheticSqon | Record<string, never>) => {
    return typeof sqon === 'object' && !isEmptySqon(sqon) && 'value' in sqon && 'field' in sqon;
};

export const isBooleanOperator = (sqon: ISyntheticSqon | Record<string, never>) => {
    return typeof sqon === 'object' && !isEmptySqon(sqon) && BOOLEAN_OPS.includes(sqon.op);
};

export const isFieldOperator = (sqon: ISyntheticSqon | Record<string, never>) => {
    return typeof sqon === 'object' && !isEmptySqon(sqon) && FIELD_OPS.includes(sqon.op);
};

export const combineSyntheticSqons = (
    sqonIndexList: number[],
    sqonsList: ISyntheticSqon[],
    combineOperator: TSqonGroupOp = 'and',
) => {
    let total = 0;
    sqonsList.map((sqon: ISyntheticSqon) => {
        total += sqon.total!;
    });

    return {
        id: v4(),
        op: combineOperator,
        content: sqonIndexList.sort(),
        total: total,
    };
};

export const resolveSyntheticSqon = (
    sqonsList: ISyntheticSqon[],
    syntheticSqon: ISyntheticSqon | Record<string, never>,
) => {
    const getNewContent = (syntheticSqon: any) => {
        return syntheticSqon.content
            .map((c: any) => (isReference(c) ? sqonsList[c] : c))
            .map((c: any) => resolveSyntheticSqon(sqonsList, c));
    };

    if (isEmptySqon(syntheticSqon)) {
        return syntheticSqon;
    } else if (isBooleanOperator(syntheticSqon)) {
        return {
            op: syntheticSqon.op,
            content: getNewContent(syntheticSqon),
        };
    } else {
        return syntheticSqon;
    }
};

export const removeSqonAtIndex = (indexToRemove: number, sqonsList: ISyntheticSqon[]) => {
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

export const isIndexReferencedInSqon = (
    indexReference: number,
    syntheticSqon: ISyntheticSqon | Record<string, never>,
) => {
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

export const removeContentFromSqon = (contentToRemove: any, syntheticSqon: ISyntheticSqon | Record<string, never>) => {
    return {
        ...syntheticSqon,
        op: syntheticSqon.op,
        content: syntheticSqon.content.filter((content: any) => content !== contentToRemove),
    };
};
