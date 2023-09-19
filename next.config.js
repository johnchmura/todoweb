const path = require('path');

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // Add a rule to handle .mp3 files
    config.module.rules.push({
      test: /\.mp3$/,
      use: {
        loader: 'file-loader',
        options: {
          // Output path (public directory)
          publicPath: '/_next/static/sounds/',
          outputPath: 'static/sounds/',
          name: '[name].[ext]',
        },
      },
    });

    return config;
  },
};
