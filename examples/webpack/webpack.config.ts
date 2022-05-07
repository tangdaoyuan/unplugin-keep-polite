import path from 'path'
import type * as webpack from 'webpack'
import { webpackPlugin } from '../../src/index'

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [webpackPlugin()],
}

export default config
