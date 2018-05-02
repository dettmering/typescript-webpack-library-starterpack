var path = require('path')
var webpack = require('webpack')
const WebpackShellPlugin = require('webpack-shell-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  build: path.join(__dirname, './build')
}

module.exports = {
  mode: 'development',
  entry: {
    'my-lib': PATHS.src + '/index.ts'
  },
  output: {
    path: PATHS.build,
    filename: '[name].js',
    library: 'MyLib',
    libraryTarget: 'umd'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
  
   
    new WebpackShellPlugin({
        onBuildStart:['echo "Webpack Start"'], 
        onBuildEnd:['./deploy.sh'],
        onBuildExit:['./deploy.sh']        
    })
  
  ]
}
