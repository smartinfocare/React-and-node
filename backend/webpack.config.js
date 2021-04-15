const path = require('path');

module.exports = {
  entry: './api.js',
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve(__dirname, '.'),
    filename: 'api.bundle.js'
  }
};