# unplugin-keep-polite

>  Warning you impolite words in the development console for Vite, Webpack, and Rollup

## Install

```bash
npm i unplugin-keep-polite --save-dev
```

## Usage
  
<details open>
  <summary>Vite</summary>

```ts
import { vitePlugin as VitePluginPolite } from 'unplugin-keep-polite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // ...
    VitePluginPolite(),
  ],
  // ...
})
```
</details>

<details>
  <summary>Webpack</summary>

```ts
import unPluginPolite from 'unplugin-keep-polite'

export default {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [unPlugin.webpack()],
}
```
</details>

<details>
  <summary>Rollup</summary>

```ts
import { defineConfig } from 'rollup'
import { rollupPlugin } from 'unplugin-keep-polite'

export default defineConfig({
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
  },
  plugins: [
    rollupPlugin(),
  ],
})
```
</details>



## Options

### autoReplace

  - Auto-replace impolite words
  - Type: Boolean
  - Default: `false`

### replacer
  
  - Replace impolite words
  - Type: String
  - Default: `true`

### customDict
  
  - Custom dictionary for impolite words
  - Type: String[] | { path: string }
  - Default: `undefined`
  - Example: `{ path: 'dict.json' }`

### extraDict

  - Add extra dictionary for impolite words
  - Type: String[]
  - Default: `[]`
  - Example: `[]`

