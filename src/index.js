/**
 * Модуль подключает только основные компоненты 2gl
 */

import libConstants from './libConstants';
import Renderer from './renderer/Renderer';
import Object3D from './Object3D';
import Buffer from './Buffer';
import Geometry from './Geometry';
import ShaderProgram from './ShaderProgram';
import Mesh from './Mesh';
import Scene from './Scene';
import Texture from './Texture';
import * as math from './math/Math';
import {vec3, mat3, vec2, mat4, quat, glMatrix} from 'gl-matrix';

// with Float32Array we have errors with raycast
glMatrix.ARRAY_TYPE = (typeof Float64Array !== 'undefined') ? Float64Array : Array;

const dgl = {
    libConstants,
    Renderer,
    Object3D,
    Buffer,
    Geometry,
    Mesh,
    ShaderProgram,
    Scene,
    Texture,
    Math: math,
    vec3,
    mat3,
    vec2,
    mat4,
    quat
};

module.exports = dgl;
