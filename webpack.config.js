const webpack = require('webpack');
const path = require('path');

module.exports = function(env = {}) {
    /*
    const config = {
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            presets: [['env', {'modules': false}]],
                            plugins: ['babel-plugin-add-module-exports'],
                            cacheDirectory: true
                        }
                    }
                }
            ]
        },
        resolve: {
            alias: {
                '@2gis/gl-matrix': '@2gis/gl-matrix/src/gl-matrix'
            },
            symlinks: false
        }
    };

    if (env.production) {
        Object.assign(config, {
            devtool: 'source-map',
            entry: './src/index.js',
            output: {
                filename: '2gl.js',
                path: path.resolve(__dirname, 'dist'),
                publicPath: '/dist/',
                libraryTarget: 'umd',
                library: 'dgl'
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    sourceMap: true
                })
            ]
        });
    } else {
        Object.assign(config, {
            devtool: 'eval-source-map',
            entry: './src/index.js',
            output: {
                filename: '2gl.js',
                path: path.resolve(__dirname, 'dist'),
                publicPath: '/dist/'
            },
            watch: true
        });
    }

    return config;
    */

    const config = {
        mode: 'development',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '2gl.js',
            libraryTarget: 'umd',
            library: 'dgl'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"]
                }
            ]
        },
        watch: true,
    }
    return config;
};
