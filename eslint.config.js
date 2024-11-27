import tseslint from 'typescript-eslint'
import eslint from '@eslint/js'
import eslintPluginReact from 'eslint-plugin-react'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintPluginReact.configs.recommended,
  eslintPluginReactHooks.configs.recommended,
  {
    ignores: ['**/build/**', '**/dist/**', 'node_modules']
  }
)
