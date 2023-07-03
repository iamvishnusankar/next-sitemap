import reporter from '@corex/jest/reporter.js'

process.env.TZ = 'UTC'

const config = {
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

export default config
