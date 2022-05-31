/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const escapeStringRegexp = (text: string): string => {
  if (typeof text !== 'string') {
    throw new TypeError('Expected a string')
  }

  // Escape characters with special meaning either inside or outside character sets.
  // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
  return text?.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
}

const regexpCache = new Map()

const sanitizeArray = <T>(input: T[], inputName: any) => {
  if (!Array.isArray(input)) {
    switch (typeof input) {
      case 'string':
        input = [input]
        break
      case 'undefined':
        input = []
        break
      default:
        throw new TypeError(
          `Expected '${inputName}' to be a string or an array, but got a type of '${typeof input}'`
        )
    }
  }

  return input.filter((string) => {
    if (typeof string !== 'string') {
      if (typeof string === 'undefined') {
        return false
      }

      throw new TypeError(
        `Expected '${inputName}' to be an array of strings, but found a type of '${typeof string}' in the array`
      )
    }

    return true
  })
}

const makeRegexp = <T>(pattern: T, options = {}) => {
  options = {
    caseSensitive: false,
    ...options,
  }

  const cacheKey = pattern + JSON.stringify(options)

  if (regexpCache.has(cacheKey)) {
    return regexpCache.get(cacheKey)
  }

  const negated = (pattern as any)[0] === '!'

  if (negated) {
    pattern = (pattern as any).slice(1)
  }

  pattern = escapeStringRegexp(pattern as any).replace(
    /\\\*/g,
    '[\\s\\S]*'
  ) as any

  const regexp = new RegExp(
    `^${pattern}$`,
    (options as any).caseSensitive ? '' : 'i'
  )
  ;(regexp as any).negated = negated
  regexpCache.set(cacheKey, regexp)

  return regexp
}

const baseMatcher = <T>(
  inputs: T[],
  patterns: T[],
  options: any = {},
  firstMatchOnly = false
) => {
  inputs = sanitizeArray(inputs, 'inputs')
  patterns = sanitizeArray(patterns, 'patterns')

  if (patterns.length === 0) {
    return []
  }

  patterns = patterns.map((pattern) => makeRegexp(pattern, options))

  const { allPatterns } = options || {}
  const result: T[] = []

  for (const input of inputs) {
    // String is included only if it matches at least one non-negated pattern supplied.
    // Note: the `allPatterns` option requires every non-negated pattern to be matched once.
    // Matching a negated pattern excludes the string.
    let matches
    const didFit: T[] = [...patterns].fill(false as unknown as T)

    for (const [index, pattern] of (patterns as any).entries()) {
      if ((pattern as any).test(input)) {
        didFit[index] = true as unknown as T
        matches = !(pattern as any).negated

        if (!matches) {
          break
        }
      }
    }

    if (
      !(
        matches === false ||
        (matches === undefined &&
          patterns.some((pattern) => !(pattern as any).negated)) ||
        (allPatterns &&
          didFit.some(
            (yes, index) => !yes && !(patterns[index] as any).negated
          ))
      )
    ) {
      result.push(input)

      if (firstMatchOnly) {
        break
      }
    }
  }

  return result
}

export const matcher = <T>(inputs: T[], patterns: T[], options = {}) => {
  return baseMatcher(inputs, patterns, options, false)
}

export const isMatch = <T>(inputs: T[], patterns: T[], options = {}) => {
  return baseMatcher(inputs, patterns, options, true).length > 0
}
