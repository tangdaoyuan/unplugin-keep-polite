import { describe, expect, it, vi } from 'vitest'
import { defaultOptions as _options } from '@/options'
import { transform } from '@/transform'

const options = {
  ..._options,
  autoReplace: true,
}

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
    expect((inValidAns as any)?.code).not.toBe(inValid)
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

describe('ignore', () => {
  const valid = '<button>valid button</button>'

  const virtualPath = process.cwd()

  it('valid', async() => {
    const validAns = await transform(valid, virtualPath, options)
    expect((validAns as any)?.code).toBe(valid)
  })
})
