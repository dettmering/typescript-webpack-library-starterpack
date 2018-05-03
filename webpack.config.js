var path = require('path')
var webpack = require('webpack')
var WebpackCopyOnBuildPlugin = require('webpack-copy-on-build-plugin');

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
                test: /\.(css|scss)$/,               
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },

     {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    esModule: true
                }
            },
      {
        test: /\.ts$/,
        
        // NOTE: I couldn't get Vue.js integration to work with 'awesome-typescript-loader'
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
            appendTsSuffixTo: [/\.vue$/],
        }
      },           
        {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader'
        }
      
      
      
    ]
  },
  resolve: {
    //extensions: ['.ts', '.js']
       extensions: ['.ts', '.js', '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        } 
      
  },
  plugins: [
  
   new WebpackCopyOnBuildPlugin([
         {
           from: 'build/my-lib.js',
           to: 'build/my-lib-deployed.js'
         },
         {
           from: 'build/my-lib.js',
           to: 'build/my-lib-deployed-min.js'
         },
		  {
           from: 'build/my-lib.js.map',
           to: 'build/my-lib-deployed.map'
         }
        ])
  ]
}
