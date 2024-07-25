module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended", // Додає налаштування Prettier
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    // Додаткові правила ESLint
    "prettier/prettier": "error", // Вказує ESLint використовувати Prettier для перевірки форматування
  },
};
