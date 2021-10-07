const path = require('path')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  target: 'node',
  mode: isProd ? 'production' : 'development',
  entry: {
    jiti: './src/jiti.ts',
    babel: './src/babel.ts',
    sucrase: './src/sucrase.ts'
  },
  devtool: false,
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
    libraryExport: 'default'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.mjs'],
    alias: {
      '@babel/code-frame': require.resolve('./stubs/babel_codeframe'),
      '@babel/helper-compilation-targets': require.resolve('./stubs/helper_compilation_targets')
    }
  },
  ignoreWarnings: [/critical dependency:/i],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.m?js/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
  },
  node: false,
  optimization: {
    nodeEnv: false,
    moduleIds: 'named',
    chunkIds: 'named'
  }
}
