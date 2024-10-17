const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          stream: require.resolve('stream-browserify'), // stream Polyfill 추가
          buffer: require.resolve('buffer/'), // buffer Polyfill 추가
          timers: require.resolve('timers-browserify'), // timers Polyfill
        },
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),
    ],
  },
};
