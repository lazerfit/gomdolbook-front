import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import { fixupPluginRules } from "@eslint/compat";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettierPluginRecommended from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";
import vitest from "eslint-plugin-vitest";

export default tseslint.config(
  {
    ignores: ["**/build/**", "**/dist/**", "**/*.mjs", "**/*.config.ts"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.recommended,
  prettierPluginRecommended,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        project: "./tsconfig.json",
        sourceType: "module",
      },
      globals: { ...globals.browser },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}", "**/*.test.{tsx,ts,jsx,js}"],
    extends: [tseslint.configs.disableTypeChecked],
  },
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": fixupPluginRules(reactHooksPlugin),
      "react-refresh": reactRefresh,
      vitest,
    },
    settings: {
      react: { version: "detect" },
      "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "vitest/consistent-test-it": ["error", { fn: "it", withinDescribe: "it" }],
      "vitest/max-nested-describe": ["error", { max: 3 }],
      "vitest/prefer-lowercase-title": "warn",
      "vitest/no-focused-tests": "error",
      "vitest/no-conditional-expect": "warn",
      "vitest/prefer-hooks-in-order": "warn",
      ...reactPlugin.configs["recommended"].rules,
      ...reactPlugin.configs["jsx-runtime"].rules,
      ...reactHooksPlugin.configs.recommended.rules,

      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      "react-refresh/only-export-components": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
);
