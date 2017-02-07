var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(__dirname, './app/main.jsx');
var BUILD_PATH = path.resolve(__dirname, './build');


module.exports = {
    entry: [
        // 'webpack/hot/dev-server',
        // 'webpack-dev-server/client?http://localhost:8080', //实现自动刷新
        'whatwg-fetch',
        APP_PATH,
    ],
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js',
    },
    module: {
        loaders: [{
                test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['es2015', 'react','stage-1']
                } // 加载模块 "babel" 是 "babel-loader" 的缩写
            },
            // css
            // {
            //     test: /\.css$/,
            //     loader: 'style!css'
            // },
            // {
            //     test: /\.(png|jpg)$/,
            //     loader: 'url?limit=100000' //100K
            // },
            // { //内联字体
            //     test: /\.woff$/,
            //     loader: 'url?limit=100000' //100K
            // }
        ]
    },
    plugins: [//用于压缩
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({//production版，消除警告
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
 })
    ]

}