import { removeUnderscoreAndCapitalize } from './stringUtils';

describe('String Utils', () => {
    test('removeUnderscoreAndCapitalize should capitalize and remove underscore', () => {
        expect(removeUnderscoreAndCapitalize('hello_python_style')).toBe('Hello Python Style');
    });
});
