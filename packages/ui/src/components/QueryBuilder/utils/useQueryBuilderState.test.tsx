require('data/sqon/utils');
import { BooleanOperators } from '../../../data/sqon/operators';

const defaultSyntheticSqon = {
    content: [],
    id: '2cc69418-78a6-4ce2-98b2-17269a4d5f73',
    op: BooleanOperators.and,
};

jest.mock('data/sqon/utils', () => ({
    deepMergeFieldInActiveQuery: jest.fn(),
    getDefaultSyntheticSqon: jest.fn(() => defaultSyntheticSqon),
    getUpdatedActiveQueryByFilterGroup: jest.fn(),
    removeFieldFromActiveQuery: jest.fn(),
}));

import { IQueryBuilderState } from '../types';

import { getQueryBuilderState, QB_CACHE_KEY_PREFIX, setQueryBuilderState } from './useQueryBuilderState';

describe('Querybuilder : getQueryBuilderState', () => {
    beforeEach(() => {
        window.localStorage.clear();
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    it('should return default when queryBuilderState does not exist in localStorage', () => {
        window.localStorage.clear();
        const queryBuilderId = 'test-query-builder-id-undefined';
        const result = getQueryBuilderState(queryBuilderId);
        const expectState = {
            active: defaultSyntheticSqon.id,
            state: [defaultSyntheticSqon],
        };
        expect(result).toEqual(expectState);
    });

    it('should return the queryBuilderState when it exists in localStorage', () => {
        const queryBuilderId = 'test-query-builder-id';
        const sqon = defaultSyntheticSqon;
        const queryBuilderState = {
            active: sqon.id,
            state: [sqon],
        };
        setQueryBuilderState(queryBuilderId, queryBuilderState);
        const { active, state } = getQueryBuilderState(queryBuilderId) as IQueryBuilderState;
        expect(active).toBe(sqon.id);
        expect(state).toHaveLength(1);
        expect(state && state[0]).toEqual(sqon);
    });

    it('should return a new queryBuilderState when the json is currupt', () => {
        const queryBuilderId = 'test';
        window.localStorage.setItem(`${QB_CACHE_KEY_PREFIX}-${queryBuilderId}`, '{test: }');
        const result = getQueryBuilderState(queryBuilderId);
        const expectState = {
            active: defaultSyntheticSqon.id,
            state: [defaultSyntheticSqon],
        };
        expect(result).toEqual(expectState);
    });
});
