module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest", "import", "react", "react-hooks", "simple-import-sort"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      modules: true,
      jsx: true
    }
  },
  settings: {
    "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    react: {
      version: "detect"
    }
  },
  rules: {
    "arrow-body-style": ["error", "as-needed"],
    complexity: ["warn", 16],
    "template-curly-spacing": "off",
    indent: [0],
    "default-case": 0,
    "max-len": [
      "error",
      {
        code: 130,
        ignoreComments: true
      }
    ],
    "no-console": ["error", { "allow": ["warn", "error"] }],
    "@typescript-eslint/no-unused-vars": "error",
    "prefer-spread": "error",
    "prettier/prettier": ["error"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    "simple-import-sort/imports": ["error", {
      groups: [
        // Side effect imports.
        ["^\\u0000"],
        // Packages. `react` related packages come first.
        ["^react", "^@?\\w"],
        // Internal packages.
        ["^(@|assets|charkit|common|components|utils|hooks|icons|pages|services|assets|shapes|stateProviders|store|style|theme|ui|uikit)(/.*|$)"],
        // Parent imports. Put `..` last.
        ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
        // Other relative imports. Put same-folder imports and `.` last.
        ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
        // Style imports.
        ["^.+\\.s?css$"]
      ]
    }]
  },
  overrides: [
    {
      files: ["**/*.tsx"],
      rules: {
        "react/prop-types": "off"
      }
    }
  ],
  ignorePatterns: ["*.scss", "*.css", "*.less"]
};