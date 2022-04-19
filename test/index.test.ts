import { expect, it } from 'vitest'
import plugin from '../src/index'

it('runs', () => {
  expect(plugin).toBeTypeOf('string')
  expect(plugin).toBe('UnPlugin-Keep-Polite')
})
