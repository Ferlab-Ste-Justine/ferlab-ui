import { ISyntheticSqon } from './types';
import { BOOLEAN_OPS, FIELD_OPS } from './operators';

export const isEmptySqon = (sqon: ISyntheticSqon) => {
    return sqon ? BOOLEAN_OPS.includes(sqon?.op) && !Boolean(sqon.content.length) : true;
};

export const isReference = (sqon: any) => {
    return !isNotReference(sqon);
};

export const isNotReference = (sqon: any) => {
    return isNaN(sqon);
};

export const isValueObject = (sqon: ISyntheticSqon) => {
    return typeof sqon === 'object' && !isEmptySqon(sqon) && 'value' in sqon && 'field' in sqon;
};

export const isBooleanOperator = (sqon: ISyntheticSqon) => {
    return typeof sqon === 'object' && !isEmptySqon(sqon) && BOOLEAN_OPS.includes(sqon.op);
};

export const isFieldOperator = (sqon: ISyntheticSqon) => {
    return typeof sqon === 'object' && !isEmptySqon(sqon) && FIELD_OPS.includes(sqon.op);
};

export const resolveSyntheticSqon = (sqonsList: ISyntheticSqon[]) => (syntheticSqon: ISyntheticSqon) => {
    const getNewContent = (syntheticSqon: any) => {
        return syntheticSqon.content
            .map((c: any) => (isReference(c) ? sqonsList[c] : c))
            .map(resolveSyntheticSqon(sqonsList));
    };

    if (isEmptySqon(syntheticSqon)) {
        return syntheticSqon;
    } else if (isBooleanOperator(syntheticSqon)) {
        return {
            ...syntheticSqon,
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

export const isIndexReferencedInSqon = (syntheticSqon: ISyntheticSqon) => (indexReference: number) => {
    const reduceContent = (content: any) => {
        return content.reduce(
            (acc: any, contentSqon: ISyntheticSqon) => acc || isIndexReferencedInSqon(contentSqon)(indexReference),
            false,
        );
    };

    if (isBooleanOperator(syntheticSqon)) {
        return reduceContent(syntheticSqon.content);
    } else {
        return typeof syntheticSqon === 'number' && syntheticSqon === indexReference;
    }
};
