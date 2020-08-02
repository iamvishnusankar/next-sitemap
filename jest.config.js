module.exports = {
  ...require('@corex/jest/reporter'),
  preset: 'ts-jest',
  projects: ['packages/*'],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/*.d.ts', '!**/node_modules/**', '!**/vendor/**']
}
