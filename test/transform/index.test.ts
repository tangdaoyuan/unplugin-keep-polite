import path from 'path'
import { describe, expect, it, vi } from 'vitest'
import { defaultOptions as _options } from '@/options'
import { transform } from '@/transform'

const options = {
  ..._options,
  autoReplace: true,
}

describe('OptionsApi', () => {
  const virtualPath = path.join(process.cwd(), 'virtual.ts')
  it('extraDict', async() => {
    const word = 'extraFuck'
    const inValid = `const ${word} = 1\n`
    const inValidAns = await transform(inValid, virtualPath, {
      ..._options,
      extraDict: ['extraFuck'],
    })

    expect(inValidAns).toBeTypeOf('object')
    expect(inValidAns).toHaveProperty('code')
    expect((inValidAns as { code: string })?.code).contain(word)
  })
})
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
