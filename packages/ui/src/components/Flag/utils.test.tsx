import { sortFlags } from './utils';

describe('flags utlis', () => {
    test('should return correct array', () => {
        expect(sortFlags(['pin', 'flag'])).toEqual(['flag', 'pin']);
    });
    test('should return correct array', () => {
        expect(sortFlags(['pin', 'star', 'flag'])).toEqual(['flag', 'pin', 'star']);
    });
});
