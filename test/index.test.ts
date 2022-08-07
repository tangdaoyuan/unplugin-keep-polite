import { expect, it } from 'vitest'
import { vitePlugin } from '@/vite'

it('runs', () => {
  expect(vitePlugin).toBeTypeOf('function')
})
