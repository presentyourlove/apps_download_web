import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import globals from 'globals';

export default [
  // 通用設定
  {
    ignores: ['dist', 'node_modules', '.astro', '.github'],
  },

  // JavaScript 推薦規則
  eslint.configs.recommended,

  // TypeScript 推薦規則
  ...tseslint.configs.recommended,

  // Astro 推薦規則
  ...astro.configs.recommended,

  // 全域變數設定
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
  },

  // 規則覆寫
  {
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
