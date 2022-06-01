#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
// Load next.js env
const { loadEnvConfig } = require('@next/env')
const { CLI } = require('../dist/cjs/cli')

// Load environment variables
loadEnvConfig(process.cwd(), process.env.NODE_ENV === 'development')

// Execute CLI
new CLI().execute()
