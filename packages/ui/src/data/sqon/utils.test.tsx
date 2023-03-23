import valueContentMock from '../../mocks/valueContentMock';
import valueFilterMock from '../../mocks/valueFilterMock';

import { generateValueFilter, isUploadedList } from './utils';

describe(`${isUploadedList.name}()`, () => {
    it('should return true when isUploadedList param is true', () => {
        const valueFilter = valueFilterMock({
            content: valueContentMock({ isUploadedList: true }),
        });

        expect(isUploadedList(valueFilter)).toBe(true);
    });

    it('should return false when isUploadedList param is false', () => {
        const valueFilter = valueFilterMock({
            content: valueContentMock({ isUploadedList: false }),
        });

        expect(isUploadedList(valueFilter)).toBe(false);
    });

    it('should return false when isUploadedList param is undefined', () => {
        expect(isUploadedList(valueFilterMock())).toBe(false);
    });

    it('should return complex sqon when rangeFilterNoData is true', () => {
        const props = {
            field: 'test',
            index: 'INDEX',
            operator: '<=',
            rangeFilterNoData: true,
            value: ['1'],
        };

        const results = generateValueFilter(props);
        expect(results).toEqual({
            content: [
                {
                    content: {
                        field: 'test',
                        index: 'INDEX',
                        overrideValuesName: undefined,
                        value: ['1'],
                    },
                    op: '<=',
                },
                {
                    content: {
                        field: 'test',
                        index: 'INDEX',
                        value: ['__missing__'],
                    },
                    op: 'in',
                },
            ],
            op: 'or',
            skipBooleanOperatorCheck: true,
        });
    });
    it('should return basicSqon when rangeFilterNoData is false', () => {
        const props = {
            field: 'test',
            index: 'INDEX',
            value: ['1'],
        };

        const results = generateValueFilter(props);
        expect(results).toEqual({
            content: {
                field: 'test',
                index: 'INDEX',
                value: ['1'],
            },
            op: 'in',
        });
    });
});
