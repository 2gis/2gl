'use strict';

const path = require('path');
const fs = require('fs');

getFilesByExtName(path.join(__dirname, 'src'), '.glsl')
    .then(files => {
        return Promise.all(files.map(file => {
            const newFileSrc = file.replace('glsl', 'js');

            return readFile(file)
                .then(convertGLSL)
                .then(writeFile(newFileSrc));
        }));
    })
    .catch(error => console.error(error));

function getFilesByExtName(src, extName) {
    return getAllFiles(src)
        .then(res => res.filter(src => {
            return path.extname(src) === extName;
        }));
}

function getAllFiles(src) {
    return readDir(src)
        .then(files => {
            return Promise.all(files.map(file => {
                const fileSrc = path.join(src, file);

                return stat(fileSrc)
                    .then(file => {
                        if (file.isDirectory()) {
                            return getAllFiles(fileSrc);
                        }

                        return fileSrc;
                    });
            }));
        })
        .then(result => result.reduce((array, el) => {
            return array.concat(el);
        }, []));
}

function readDir(src) {
    return new Promise((resolve, reject) => {
        fs.readdir(src, callback(resolve, reject));
    });
}

function stat(src) {
    return new Promise((resolve, reject) => {
        fs.stat(src, callback(resolve, reject));
    });
}

function readFile(src) {
    return new Promise((resolve, reject) => {
        fs.readFile(src, 'utf8', callback(resolve, reject));
    });
}

function writeFile(src) {
    return text => new Promise((resolve, reject) => {
        fs.writeFile(src, text, 'utf8', callback(resolve, reject));
    });
}

function callback(resolve, reject) {
    return (error, data) => {
        if (error) {
            return reject(error);
        }
        resolve(data);
    };
}

function convertGLSL(code) {
    return 'module.exports = `\n' + code + '`;';
}
