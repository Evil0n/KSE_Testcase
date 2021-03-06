const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const autoprefixer = require('autoprefixer')
const path = require('path')

module.exports = (env, argv) => {
  return {
    mode: argv.mode,
    entry: {
      main: ['@babel/polyfill', './src/main.js']
    },
    output: {
      filename: '[name].[hash:8].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: argv.mode === 'production' ? 'https://evil0n.github.io/KSE_Testcase/' : '/',
      chunkFilename: '[name].[hash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.s?css$/,
          use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [autoprefixer()]
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
          loader: 'file-loader'
        },
        {
          test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
          loader: 'file-loader',
          options: {
            name: '[name][hash:8].[ext]',
            outputPath: 'assets/img',
            esModule: false
          }
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[hash:8].css',
        chunkFilename: '[name].[hash:8].css'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        favicon: './public/favicon.ico'
      })
    ],
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js'
      },
      extensions: ['*', '.js', '.vue', '.json']
    },
    optimization: {
      moduleIds: 'hashed',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all'
          }
        }
      }
    },
    devServer: {
      clientLogLevel: 'warning',
      historyApiFallback: {
        rewrites: [
          { from: /.*/, to: path.posix.join('/', 'index.html') }
        ]
      },
      hot: true,
      contentBase: false,
      compress: true,
      open: false,
      overlay: { warnings: false, errors: true },
      publicPath: '/'
    }
  }
}
