module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["airbnb", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": ["warn", { trailingComma: "all" }],
    "no-underscore-dangle": "off",
    "no-plusplus": "off",
    "react/forbid-prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/jsx-one-expression-per-line": "off",
    "no-nested-ternary": 0,
    "no-unused-vars": "warn",
    "no-console": "off",
    quotes: 0,
    indent: 0,
  },
};
