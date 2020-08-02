module.exports = {
  ...require('@corex/jest/reporter'),
  verbose: true,
  preset: 'ts-jest',
  projects: ['packages/*'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**', '!**/vendor/**']
}
