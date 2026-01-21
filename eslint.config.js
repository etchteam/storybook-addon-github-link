import etchConfig from '@etchteam/eslint-config';
import globals from 'globals';

export default [
  {
    ignores: ['dist/**', '.github/**', '**/*.yml', '**/*.yaml'],
  },
  ...etchConfig,
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      'import/default': 'off',
    },
  },
  {
    files: ['**/*.cjs'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
