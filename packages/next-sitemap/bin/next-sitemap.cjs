#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
const envLoader = require('@next/env')
const { CLI } = require('../dist/cjs/cli.js')

// Load environment variables
envLoader.loadEnvConfig(process.cwd(), process.env.NODE_ENV === 'development')

// Execute CLI
new CLI().execute()
