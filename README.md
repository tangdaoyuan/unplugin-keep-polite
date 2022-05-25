# unplugin-keep-polite

>  Warning you impolite words in the development console for Vite, Webpack, and Rollup

## Install

```bash
npm i unplugin-keep-polite --save-dev
```

## Usage
  
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

## Options

### auto

  - Auto-replace impolite words
  - Type: Boolean
  - Default: `false`

### replace
  
  - Replace impolite words
  - Type: String
  - Default: `true`


## TODO

  - [x] `replacer` support function
  - [ ] Custom words dictionary ([current dict](https://github.com/tangdaoyuan/impolite-words/blob/master/src/dict/en.json))
  - [ ] support for webpack-dev-server
  - [ ] support for rollup
