const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const APP_PATH = path.resolve(__dirname, './app/app.jsx');

module.exports = {
  entry: [
    APP_PATH,
  ],

  output: {
    path: path.resolve(__dirname, 'client'), // 与APP_PATH一致的文件目录
    filename: 'devClient.bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    mainFields: ['jsnext:main', 'main'], // 优先使用外加包的es6版，如redux
    modules: [path.resolve(__dirname, 'node_modules')], // 更快的构建
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, 'app'),
        use: [
          'babel-loader?cacheDirectory',
        ],
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true, // 开启CSS Module
              localIdentName: '[name]__[local]-[hash:base64:5]',
              minimize: true, // 压缩
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() { // 这里配置postcss的插件
                return [autoprefixer];
              },
            },
          },
        ],
      },
      // { // 处理图片
      //   test: /\.(png|jpg|gif|webp')$/,
      //   // include:path.resolve(__dirname,'/client/assets'),
      //   use: [{
      //     loader: 'url-loader',
      //     options: {
      //       limit: 10000,
      //       // 这个是输出的图片文件，跟output一致,生成的是bundleImg目录下的图片文件
      //       name: 'bundleImg/[hash:8].[name].[ext]',
      //     },
      //   }],
      // },

      // { // 处理文字
      //   test: /\.(woff|ttf|svg|eot|woff2)$/,
      //   // include:path.resolve(__dirname,'/client/assets'),
      //   use: [{
      //     loader: 'url-loader',
      //     options: {
      //       limit: 10000,
      //       name: 'bundleFonts/[hash:8]-[name].[ext]',
      //     },
      //   }],
      // },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        WEBPACK: true,
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,
      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      },
    }),
    // new ExtractTextPlugin('bundle.css'),
    new webpack.optimize.CommonsChunkPlugin({ // 多页应用拆分打包文件，出现共用文件则打包进common.js中
      names: ['reactlib', 'manifest'], // 指定公共代码库
      filename: 'common/common-[name].js', // 指定生成的vendor.js名字，不指定也没系，会使用output的配置
      minChunks: Infinity, // 保证不会将业务代码打包进第三方中
    }),
    // // 生成client的html
    // new HtmlWebpackPlugin({
    //   title: '画报',
    //   filename: 'server/view/app.html',
    //   chunks: ['client', 'reactlib'], // 在entry里我定义过了a这个chunk
    // }),
    // // 生成manage的html
    // new HtmlWebpackPlugin({
    //   title: '管理后台',
    //   filename: 'server/view/manage.html',
    //   chunks: ['manage', 'reactlib'], // 在entry里我定义过了b这个chunk
    // }),
    // new CopyWebpackPlugin([
    //   {
    //     from: path.resolve(__dirname, 'build'),
    //     to: path.resolve(__dirname, '../../public/JdBus'),
    //   },
    // ]),
  ],
};
