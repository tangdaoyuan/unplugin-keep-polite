import path from 'path'
import unPlugin from 'unplugin-keep-polite'

const config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  plugins: [unPlugin.webpack()],
}

export default config
