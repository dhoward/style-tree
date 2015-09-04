var path = require('path');

module.exports = {
  entry: './lib/main.js',
  output: {
      path: __dirname+"/test",
      filename: 'test.js'
  },
  module: {
    loaders: [
      { test: path.join(__dirname, 'lib'),
        loader: 'babel-loader'
      }
    ]
  }
};