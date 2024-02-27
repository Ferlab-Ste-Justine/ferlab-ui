import { addUnderscoreAndLowercase, removeUnderscoreAndCapitalize, titleCase, toKebabCase } from './stringUtils';

describe('removeUnderscoreAndCapitalize', () => {
    test('removes underscores and capitalizes each word', () => {
        expect(removeUnderscoreAndCapitalize('hello_world')).toBe('Hello World');
        expect(removeUnderscoreAndCapitalize('_foo_bar_')).toBe('Foo Bar');
    });
});

describe('addUnderscoreAndLowercase', () => {
    test('adds underscores and lowercases each word', () => {
        expect(addUnderscoreAndLowercase('Hello World')).toBe('hello_world');
        expect(addUnderscoreAndLowercase('FooBarBaz')).toBe('foo_bar_baz');
    });
});

describe('titleCase', () => {
    test('capitalizes the first letter of each word', () => {
        expect(titleCase('hello world')).toBe('Hello World');
        expect(titleCase('foo bar baz')).toBe('Foo Bar Baz');
    });
});

describe('toKebabCase', () => {
    test('converts string to kebab case', () => {
        expect(toKebabCase('helloWorld')).toBe('hello-world');
        expect(toKebabCase('FooBarBaz123')).toBe('foo-bar-baz-123');
        expect(toKebabCase('camelCaseString')).toBe('camel-case-string');
        expect(toKebabCase('kebab-case-string')).toBe('kebab-case-string');
        expect(toKebabCase('PascalCaseString')).toBe('pascal-case-string');
        expect(toKebabCase('snake_case_string')).toBe('snake-case-string');
    });
});
