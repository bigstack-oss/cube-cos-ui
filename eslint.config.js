import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import tailwind from 'eslint-plugin-tailwindcss'
import importPlugin from 'eslint-plugin-import'

export default tseslint.config(
  {
    ignores: [
      '**/storybook-static',
      '**/dist',
      '**/keycloak/themes',
      'packages/cube-frontend-api/sdk',
    ],
  },
  {
    extends: [
      js.configs.recommended,
      // TODO (low-priority): Find a way to get rid of the following ignore.
      // eslint-disable-next-line import/no-named-as-default-member
      ...tseslint.configs.recommended,
      ...tailwind.configs['flat/recommended'],
      {
        settings: {
          tailwindcss: {
            whitelist: ['cos\\-.*'],
            callees: ['classnames', 'classNames', 'cva', 'twMerge', 'twJoin'],
            config: 'packages/cube-frontend-web-app/tailwind.config.js',
            classRegex: '^(\\w+)?[cC]lass(Name)?$',
          },
        },
      },
    ],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-console': [
        'error',
        {
          allow: ['error', 'warn'],
        },
      ],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      'tailwindcss/no-custom-classname': 'error',
      'tailwindcss/classnames-order': 'error',
    },
  },
  {
    extends: [
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
    ],
    settings: {
      'import/resolver': {
        typescript: true,
        node: true,
      },
    },
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../**/cube-frontend*', 'packages/**/*'],
              message:
                'Relative package imports are not allowed. Please use path alias imports instead.',
            },
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
)
