var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    bail: true,
    devtool: 'source-map',
    entry: './src/index',
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.html$/,
                loader: 'vue-html-loader'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader?limit=10000&minetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|jpe?g|png|gif|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file-loader"
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[chunkhash].js',
        pathinfo: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            'template': './src/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, './node_modules')],
        alias: {
            'assets': path.resolve(__dirname, './src/assets'),
            'data': path.resolve(__dirname, './src/data'),
            'state': path.resolve(__dirname, './src/state'),
            'styles': path.resolve(__dirname, './src/styles'),
            'utils': path.resolve(__dirname, './src/utils'),
            'view': path.resolve(__dirname, './src/view'),
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, './node_modules')]
    },
    vue: {
        loaders: {
            css: 'vue-style-loader!css-loader!postcss-loader',
            scss: 'vue-style-loader!css-loader!postcss-loader!sass-loader'
        }
    }
};
