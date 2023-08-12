const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    target:'web',
    devtool:'source-map',
    entry: {
        main: path.resolve(__dirname, './src/main.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash:8].js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
        new CopyWebpackPlugin({
            patterns: [
              {
                from: path.resolve(__dirname, './src/images'),
                to: path.resolve(__dirname, './dist/images')
              },
            ]
          })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', "css-loader"],
                },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                      presets: [
                        ['@babel/preset-env', { targets: "defaults" }]
                      ]
                    }
            }},
            {
                test: /\.(jpe?g|png|gif|svg|webp)$/,
                type: 'asset/inline',
                generator:  {
                    filename: 'images/[name]-[contenthash][ext]',
                }
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator:  {
                    filename: 'fonts/[name]-[contenthash][ext]',
                }
            }
        ]
    },
    devServer: {
        compress: false,
        open: true,
        port: 3000,
        hot: true,
    },
}