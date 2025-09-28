module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        buffer: require.resolve('buffer/'),
        process: require.resolve('process/browser'),
        crypto: false,
        stream: false,
        util: false,
        path: false,
        fs: false,
      };
      return webpackConfig;
    },
  },
};