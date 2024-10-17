const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'), // stream Polyfill 추가
      buffer: require.resolve('buffer/'), // buffer Polyfill 추가
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
