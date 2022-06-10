import { describe, expect, it, vi } from 'vitest'
import { defaultOptions as options } from '@/options'
import { transform } from '@/transform'

describe('transform', () => {
  const valid = 'const polite = 1\n'
  const inValid = 'const fuck = 1\n'

  const virtualPath = process.cwd()

  it('base', async() => {
    const validAns = await transform(valid, virtualPath, options)
    expect(validAns).toBeTypeOf('object')
    expect(validAns).toHaveProperty('code')
  })

  it('valid', async() => {
    const validAns = await transform(valid, virtualPath, options)
    expect((validAns as any)?.code).toBe(valid)
  })

  it('invalid', async() => {
    const inValidAns = await transform(inValid, virtualPath, options)
    expect((inValidAns as any)?.code).toBe(inValid)
  })

  it('invalid replace', async() => {
    const $console = vi.spyOn(console, 'log').mockImplementation(() => undefined)

    const inValidAns = await transform(
      inValid,
      virtualPath,
      { autoReplace: true, replacer: 'polite' },
    )
    expect((inValidAns as any)?.code).toBe(valid)
    expect($console).toBeCalled()
  })
})
