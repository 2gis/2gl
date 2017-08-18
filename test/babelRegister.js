require('babel-register')({
    babelrc: false,
    ignore: /node_modules\/(?!@2gis\/gl-matrix)/,
    presets: [['env']],
    plugins: [
        'istanbul',
        ['module-resolver', {
            alias: {
                '@2gis/gl-matrix/common': '@2gis/gl-matrix/src/gl-matrix/common',
                '@2gis/gl-matrix/vec2': '@2gis/gl-matrix/src/gl-matrix/vec2',
                '@2gis/gl-matrix/vec3': '@2gis/gl-matrix/src/gl-matrix/vec3',
                '@2gis/gl-matrix/mat3': '@2gis/gl-matrix/src/gl-matrix/mat3',
                '@2gis/gl-matrix/mat4': '@2gis/gl-matrix/src/gl-matrix/mat4',
                '@2gis/gl-matrix/quat': '@2gis/gl-matrix/src/gl-matrix/quat'
            }
        }],
        'babel-plugin-add-module-exports'
    ],
});
