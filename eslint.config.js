import js from '@eslint/js';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'tmp/**'] },
  js.configs.recommended,
  {
    files: ['src/**/*.js'],
    languageOptions: { globals: globals.browser },
  },
  {
    files: ['*.config.js', 'test/**/*.js'],
    languageOptions: { globals: globals.node },
  },
];
