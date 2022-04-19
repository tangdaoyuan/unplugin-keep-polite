import { expect, it } from 'vitest'
import plugin from '..'

it('runs', () => {
  expect(plugin).toBeTypeOf('string')
  expect(plugin).toBe('UnPlugin-Keep-Polite')
})
