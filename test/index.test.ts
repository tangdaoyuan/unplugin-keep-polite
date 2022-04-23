import { expect, it } from 'vitest'
import { vitePlugin } from '../src/index'

it('runs', () => {
  expect(vitePlugin).toBeTypeOf('function')
})
