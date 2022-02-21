import {fileURLToPath} from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const config = {
  entry: './index.ts',
  devtool: 'source-map',
  module: {
    rules: [{
      test: /\.ts?$/,
      use: {
        loader: 'swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: false,
            },
            target: 'es2015',
            loose: false,
            minify: {
              compress: true,
              mangle: true,
            },
          },
          module: {
            type: 'es6',
          },
          sourceMaps: true,
        },
      },
      exclude: /node_modules/,
    }],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    library: {
      type: 'module',
    },
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  experiments: {
    outputModule: true,
  },
}

export default config
