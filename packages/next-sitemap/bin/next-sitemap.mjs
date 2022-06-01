#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
// Load next.js env
require('@next/env').loadEnvConfig(
  process.cwd(),
  process.env.NODE_ENV === 'development'
)

// Load cli
require('../dist/cjs/cli')
