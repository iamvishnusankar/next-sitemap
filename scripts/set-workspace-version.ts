const version = process.argv[2]

if (!version) {
  console.error('Usage: bun ./scripts/set-workspace-version.ts <version>')
  process.exit(1)
}

const manifestPaths = [
  ...new Bun.Glob('packages/*/package.json').scanSync('.'),
  ...new Bun.Glob('examples/*/package.json').scanSync('.'),
]

for (const manifestPath of manifestPaths) {
  const manifestFile = Bun.file(manifestPath)
  const manifest = await manifestFile.json()

  if (!manifest || typeof manifest !== 'object' || !('version' in manifest)) {
    continue
  }

  manifest.version = version

  await Bun.write(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)
}
