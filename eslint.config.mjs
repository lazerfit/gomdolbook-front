import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import prettierPluginRecommended from 'eslint-plugin-prettier/recommended';
import { fixupConfigRules } from '@eslint/compat';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default tseslint.config(
	{
		ignores: ['**/build/**', '**/dist/**', '**/*.mjs'],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommendedTypeChecked,
	...tseslint.configs.stylisticTypeChecked,
	jsxA11y.flatConfigs.recommended,
	prettierPluginRecommended,
	{
		languageOptions: {
			parserOptions: {
				ecmaFeatures: { jsx: true },
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
			globals: { ...globals.browser },
		},
	},
	{
		files: ['**/*.{js,mjs,cjs,jsx}'],
		extends: [tseslint.configs.disableTypeChecked],
	},
	{
		plugins: {
			react: reactPlugin,
			'react-hooks': fixupConfigRules(reactHooksPlugin),
			'react-refresh': reactRefresh,
		},
		settings: { react: { version: 'detect' } },
		rules: {
			...reactPlugin.configs['recommended'].rules,
			...reactPlugin.configs['jsx-runtime'].rules,
			...reactHooksPlugin.configs.recommended.rules,

			'react-refresh/only-export-components': 'warn',
			'@typescript-eslint/no-unused-vars': 'warn',
		},
	}
);
