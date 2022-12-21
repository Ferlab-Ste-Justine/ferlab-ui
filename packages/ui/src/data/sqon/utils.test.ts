import valueContentMock from '../../mocks/valueContentMock';
import valueFilterMock from '../../mocks/valueFilterMock';

import { isUploadedList } from './utils';

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
});
