const path = require(`path`);

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: `./src/client/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `dist`),
    publicPath: `/`
  },
  devServer: {
    contentBase: path.join(__dirname, `dist`),
    port: 1337,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': `http://localhost:5000`
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.(ts|tsx)$/,
        use: {
          loader: `awesome-typescript-loader`,
        },
      },
      {
        test: /\.scss$/,
        use: [
          devMode
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  resolve: {
    extensions: [`.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.scss`],
    alias: {
      '@core': path.resolve(__dirname, `src/client/core`),
      '@components': path.resolve(__dirname, `src/client/components`),
      '@reducer': path.resolve(__dirname, `src/client/reducer`),
      '@stub': path.resolve(__dirname, `src/stub`)
    }
  },
};
