import reporter from '@corex/jest/reporter.js'

export default {
  ...reporter,
  verbose: true,
  preset: 'ts-jest',
  projects: ['packages/*'],
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
}
