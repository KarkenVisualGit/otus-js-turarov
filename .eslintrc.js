module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true,
    node: true,
  },
  extends: ["airbnb-base", "plugin:css/recommended", "prettier"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["jest", "css", "html"],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "always",
      },
    ],
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "import/prefer-default-export": "off",
    "no-console": "off",
    "no-alert": "off",
    "default-case": "off",
    "no-unused-expressions": "off",
    "no-plusplus": "off",
    "no-shadow": "off",
    "no-param-reassign": "off",
    "no-useless-escape": "off",
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    "max-len": [
      "error",
      { ignoreTrailingComments: true },
      {
        ignoreComments: true,
      },
      {
        code: 100,
      },
    ],
  },
};
