const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          timers: require.resolve('timers-browserify'), // timers Polyfill
        },
      },
    },
  },
};
