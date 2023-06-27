import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import jsdoc from 'eslint-plugin-jsdoc';
import globals from 'globals';

export default [
  {
    files: ['packages/**/*.ts', 'docs-builder/scripts/*.ts', 'docs-builder/scripts/**/*.ts'],
    ignores: ['build/*', 'node_modules/*', 'packages/**/*.(mjs|cjs|js|d.ts)'],

    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        project: './tsconfig.json',
      },
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
        ...globals.es2021,
        ...globals.jest,
      },
    },
    plugins: {
      jsdoc,
      jest,
      '@typescript-eslint': typescriptEslint,
    },

    rules: {
      ...typescriptEslint.configs.recommended.rules,
      ...typescriptEslint.configs['recommended-requiring-type-checking'].rules,
      ...prettierConfig.rules,
      'no-console': 2,
      'no-duplicate-imports': 2,
      'prefer-const': 2,
      '@typescript-eslint/consistent-type-imports': [
        2,
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: true,
          fixStyle: 'inline-type-imports',
        },
      ],
    },
  },
];
