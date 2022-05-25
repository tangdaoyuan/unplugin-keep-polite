import { describe, expect, it, vi } from 'vitest'
import { defaultOptions as options } from '@/options'
import { transform } from '@/transform'

describe('transform', () => {
  const valid = 'const polite = 1\n'
  const inValid = 'const fuck = 1\n'

  const virtualPath = process.cwd()

  it('base', () => {
    const validAns = transform(valid, virtualPath, options)
    expect(validAns).toBeTypeOf('object')
    expect(validAns).toHaveProperty('code')
  })

  it('valid', () => {
    const validAns = transform(valid, virtualPath, options)
    expect((validAns as any)?.code).toBe(valid)
  })

  it('invalid', () => {
    const inValidAns = transform(inValid, virtualPath, options)
    expect((inValidAns as any)?.code).toBe(inValid)
  })

  it('invalid replace', () => {
    const $console = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    const inValidAns = transform(
      inValid,
      virtualPath,
      { auto: true, replacer: 'polite' },
    )
    expect((inValidAns as any)?.code).toBe(valid)
    expect($console).toBeCalled()
  })
})
