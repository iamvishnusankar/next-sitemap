#!/usr/bin/env node
import { loadEnvConfig } from '@next/env'
import { CLI } from '../dist/esm/cli.js'

// Load environment variables
loadEnvConfig(process.cwd(), process.env.NODE_ENV === 'development')

// Execute CLI
new CLI().execute()
