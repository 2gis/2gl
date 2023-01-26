require('@babel/register')({
    ignore: [/node_modules\/(?!@2gis\/gl-matrix)/],
    plugins: ['istanbul']
});
