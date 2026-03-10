import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const config = [
  {
    ignores: [
      '**/dist/**',
      '**/.next/**',
      '**/out/**',
      '**/.yarn/**',
      '.yarnrc.yml',
      '**/.contentlayer/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [
      '**/__tests__/**/*.{js,jsx,ts,tsx,mjs,cjs,mts,cts}',
      '**/*.{test,spec}.{js,jsx,ts,tsx,mjs,cjs,mts,cts}',
    ],
    languageOptions: {
      globals: globals.jest,
    },
  },
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-undef': 'off',
    },
  },
  {
    files: ['**/*.cjs', '**/*.config.js'],
    languageOptions: {
      globals: globals.node,
      sourceType: 'commonjs',
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['packages/next-sitemap/bin/**/*.{js,mjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },
]

export default config
