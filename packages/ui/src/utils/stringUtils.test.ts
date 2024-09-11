import { addUnderscoreAndLowercase, removeUnderscoreAndCapitalize, titleCase, toKebabCase, removeAccents } from './stringUtils';

describe('removeUnderscoreAndCapitalize', () => {
    test('removes underscores and capitalizes each word', () => {
        expect(removeUnderscoreAndCapitalize('hello_world')).toBe('Hello World');
        expect(removeUnderscoreAndCapitalize('fooBar')).toBe('FooBar');
    });
});

describe('addUnderscoreAndLowercase', () => {
    test('adds underscores and lowercases each word', () => {
        expect(addUnderscoreAndLowercase('Hello World')).toBe('hello_world');
        expect(addUnderscoreAndLowercase('FooBarBaz')).toBe('fooBarBaz');
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
        expect(toKebabCase('FooBarBaz123')).toBe('foo-bar-baz123');
        expect(toKebabCase('camelCaseString')).toBe('camel-case-string');
        expect(toKebabCase('kebab-case-string')).toBe('kebab-case-string');
        expect(toKebabCase('PascalCaseString')).toBe('pascal-case-string');
        expect(toKebabCase('snake_case_string')).toBe('snake-case-string');
    });
});

describe('removeAccents', () => {
    test('converts accented characters to non accented characters', () => {
        expect(removeAccents('un caractère')).toBe('un caractere');
        expect(removeAccents('message approuvé et bien reçu')).toBe('message approuve et bien recu');
        expect(removeAccents('_test_message_')).toBe('_test_message_');
    })
});
