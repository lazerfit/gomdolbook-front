import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  {
    ignores: ['**/build/**', '**/dist/**', '**/*.mjs']
  },
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  }
)
