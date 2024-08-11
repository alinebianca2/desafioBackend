// eslint.config.js
import pkg from 'eslint';
const { defineConfig } = pkg;
import airbnb from 'eslint-config-airbnb';
import prettier from 'eslint-config-prettier';
import typescript from '@typescript-eslint/eslint-plugin';

export default defineConfig({
  root: true,
  extends: [
    'airbnb',
    'airbnb/hooks',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
});
