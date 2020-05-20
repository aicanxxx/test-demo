const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: {
        // indexA:'./src/demo/a.js',
        // indexB:'./src/demo/b.js',
        // indexC:'./src/demo/c.js'
        index: './src/index.js'
    },
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname,'dist'),
        publicPath: '/'
    },
    optimization:{
        minimize:false,
        runtimeChunk:{
            name:'manifest'
        },
        splitChunks:{
            chunks:'initial'
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test:/\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options: { limit: 8192, outputPath: 'img' }
                    }
                ] 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title:'production',
            template:'./index.html'
        }),
        // 展示热加载时文件名
        new webpack.NamedModulesPlugin(),
        // 模块热替换
        new webpack.HotModuleReplacementPlugin(),
        // // 打包文件分析工具
        // new BundleAnalyzerPlugin({}),
        // // 清除旧版本
        new CleanWebpackPlugin()
    ],
    devServer: {
        contentBase: './',
        hot: true,
        historyApiFallback: true
    }
}