module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        },
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ['.eslintrc.js'],
    settings: {
        react: {
            version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    },
    extends: ['plugin:@typescript-eslint/recommended', 'prettier', 'prettier/react', 'prettier/@typescript-eslint', 'plugin:prettier/recommended', 'plugin:storybook/recommended'],
    plugins: [
        'react',
        '@typescript-eslint',
        'simple-import-sort',
        'prefer-arrow',
        'sort-destructure-keys',
        'sort-keys-fix'
    ],
    rules: {
        // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
        // e.g. "@typescript-eslint/explicit-function-return-type": "off",

        'linebreak-style': 'off',
        'simple-import-sort/imports': ['error', {
            groups: [
                // Side effect imports.
                ['^\\u0000'],
                // Packages. `react` related packages come first.
                ['^react', '^@?\\w'],
                // Internal packages.
                ['^(@|@company|@ui|components|utils|config|vendored-lib|layouts|pages|providers|routes|assets|locales|services|store|style|types)(/.*|$)'],
                // Parent imports. Put `..` last.
                ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                // Other relative imports. Put same-folder imports and `.` last.
                ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                // Style imports.
                ['^.+\\.s?css$'],
            ],
        }],
        'simple-import-sort/exports': 'error',
        'sort-keys-fix/sort-keys-fix': ['error', 'asc', {
            'caseSensitive': false,
            'natural': true
        }],
        'sort-destructure-keys/sort-destructure-keys': ['error', {
            'caseSensitive': false
        }],
        'sort-vars': 'error',
        'no-nested-ternary': 0,
        'prefer-arrow/prefer-arrow-functions': [
            'error',
            {
                'disallowPrototype': true,
                'singleReturnOnly': true,
                'classPropertiesAllowed': false
            }
        ],
        'arrow-body-style': ['error', 'as-needed'],

        'react/jsx-sort-default-props': 'error',
        'react/jsx-sort-props': 'error',
        'react/jsx-props-no-spreading': 'off',

        'prefer-destructuring': ['error', {
            'array': false,
            'object': true
        }],
        'no-console': 'warn',
        '@typescript-eslint/no-explicit-any': 'off'
    },
};