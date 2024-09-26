import eslintJs from '@eslint/js'
import reactQuery from '@tanstack/eslint-plugin-query'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-plugin-prettier'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tailwindcss from 'eslint-plugin-tailwindcss'
import globals from 'globals'
import eslintTs from 'typescript-eslint'
// import importPlugin from 'eslint-plugin-import' TODO: wait for package to be updated

export default eslintTs.config(
  { ignores: ['dist', 'public'] },
  {
    extends: [
      eslintJs.configs.recommended,
      ...eslintTs.configs.recommended,
      /*importPlugin.flatConfigs.recommended TODO: wait for package to be updated */
    ],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'jsx-a11y': jsxA11y,
      '@tanstack/query': reactQuery,
      prettier: prettier,
      tailwindcss: tailwindcss,
    },
    settings: {
      react: { version: 'detect' },
      tailwindcss: {
        callees: ['classnames', 'clsx', 'cx', 'cn', 'ctl'],
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      ...prettier.configs.recommended.rules,
      ...tailwindcss.configs.recommended.rules,
      ...reactQuery.configs.recommended.rules,
      // ...importPlugin.flatConfigs.recommended.rules, TODO: wait for package to be updated

      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      'prettier/prettier': ['error', {}, { usePrettierrc: true }],

      'linebreak-style': ['error', 'unix'],

      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      '@typescript-eslint/explicit-function-return-type': ['off', {}],
      '@typescript-eslint/explicit-module-boundary-types': ['off', {}],
      '@typescript-eslint/no-empty-function': ['off', {}],
      '@typescript-eslint/no-explicit-any': ['off', {}],
      '@typescript-eslint/no-empty-object-type': ['off', {}],
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // TODO: wait for package to be updated
      // 'import/default': 'off',
      // 'import/no-named-as-default-member': 'off',
      // 'import/no-named-as-default': 'off',
      // 'import/order': [
      //   'error',
      //   {
      //     groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
      //     'newlines-between': 'always',
      //     alphabetize: { order: 'asc', caseInsensitive: true },
      //   },
      // ],
      // 'import/no-restricted-paths': [
      //   'error',
      //   {
      //     zones: [
      //       // disables cross-feature imports:
      //       // eg. src/features/discussions should not import from src/features/comments, etc.
      //       {
      //         target: './src/features/auth',
      //         from: './src/features',
      //         except: ['./auth'],
      //       },
      //       // enforce unidirectional codebase:

      //       // e.g. src/app can import from src/features but not the other way around
      //       {
      //         target: './src/features',
      //         from: './src/app',
      //       },

      //       // e.g src/features and src/app can import from these shared modules but not the other way around
      //       {
      //         target: ['./src/components', './src/hooks', './src/lib', './src/types'],
      //         from: ['./src/features', './src/app'],
      //       },
      //     ],
      //   },
      // ],
    },
  },
)
