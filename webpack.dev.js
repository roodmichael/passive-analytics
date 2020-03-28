const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/analytics.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },
};