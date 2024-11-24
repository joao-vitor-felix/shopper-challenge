import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    eslintConfigPrettier
  ],
  plugins: {
    "simple-import-sort": simpleImportSort
  },
  rules: {
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn"
  }
});
