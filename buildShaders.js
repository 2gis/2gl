#! /usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');

const args = process.argv.slice(2);

const inputPath = path.join(process.cwd(), args[0] || '');
const outputPath = args[1] ? path.join(process.cwd(), args[1]) : inputPath;

/**
 * Модуль конвертирует GLSL код в js файл со следующим содержимым:
 *
 * export default `ваш GLSL код`;
 *
 * Вызывается из командной строки, на вход принимает 2 параметра:
 * 1. Путь в котором искать файлы шейдеров (ищет вложенно)
 * 2. Путь куда сохранять js файлы шейдеров. Если параметр не указан,
 * то файлы кладутся рядом с оригинальными.
 *
 * Например: buildShaders src/shaders /src/compiledShaders
 */
getGLSLFiles(inputPath)
    .then(files => {
        return Promise.all(files.map(filePath => {
            const newFilePath = filePath.replace(inputPath, outputPath) + '.js';

            return mkdirp(path.dirname(newFilePath))
                .then(() => readFile(filePath))
                .then(convertGLSL)
                .then(writeFile(newFilePath))
                .catch(error => console.error(error));
        }));
    })
    .catch(error => console.error(error));

function getGLSLFiles(src) {
    return getAllFiles(src)
        .then(res => res.filter(src => {
            const extName = path.extname(src);
            return extName === '.glsl' ||
                extName === '.frag' || extName === '.vert' ||
                extName === '.vsh' || extName === '.fsh';
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

function mkdirp(src) {
    return new Promise((resolve, reject) => {
        fs.mkdir(src, err => {
            if (!err) {
                return resolve();
            }

            switch (err.code) {
                case 'ENOENT':
                    return mkdirp(path.dirname(src))
                        .then(() => mkdirp(src))
                        .then(resolve);

                case 'EEXIST':
                    resolve();
                    break;

                default:
                    reject(err);
            }
        });
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
    if (process.env.NODE_ENV === 'production') {
        // todo find or create minifier
        return 'export default `' + minifyGlsl(code) + '`;';
    }
    return 'export default `\n' + escape(code) + '`;\n';
}

function escape(code) {
    return code.replace(/(\\[ntrbvf])/g, '\\$1');
}

function minifyGlsl(code) {
    const multiLineComments = /\/\*[^]*?\*\//g;
    const singleLineComments = /\/\/(.)*/g;
    const tabs = /\t/g;
    const multiNewLines = /\n[\n]*\n/g;

    return code
        .replace(multiLineComments, '')
        .replace(singleLineComments, '')
        .replace(tabs, '')
        .replace(multiNewLines, '\n');
}
