const path = require('path');

module.exports = function(env) {
    return {
        mode: env.production ? 'production' : 'development',
        entry: './src/index.js',
        devtool: env.production ? 'source-map' : 'eval-source-map',
        output: {
            filename: '2gl.js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/dist/',
            library: {
                type: env.production ? 'umd' : 'module',
            },
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true,
                        },
                    },
                },
            ],
        },
        resolve: {
            alias: {
                '@2gis/gl-matrix': '@2gis/gl-matrix/src/gl-matrix',
            },
            symlinks: false,
        },
        watch: env.development,
        experiments: {
            outputModule: true,
        }
    };
};
