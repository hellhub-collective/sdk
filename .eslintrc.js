/** @type {import('eslint').ESLint.ConfigData} */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["plugin:prettier/recommended"],
  ignorePatterns: ["node_modules/", "dist/"],
  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "no-shadow": "off",
        "no-undef": "off",
        "prettier/prettier": "error",
        "@typescript-eslint/no-shadow": ["error"],
      },
    },
  ],
};
