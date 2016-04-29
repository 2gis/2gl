/**
 * Модуль подключает только основные компоненты 2gl
 */

import enums from './enums';
import Renderer from './renderer/Renderer';
import Object3D from './Object3D';
import Buffer from './Buffer';
import Geometry from './Geometry';
import ShaderProgram from './ShaderProgram';
import BasicMeshMaterial from './materials/BasicMeshMaterial';
import ComplexMeshMaterial from './materials/ComplexMeshMaterial';
import SpriteMaterial from './materials/SpriteMaterial';
import MultiSpriteMaterial from './materials/MultiSpriteMaterial';
import Mesh from './Mesh';
import Sprite from './Sprite';
import MultiSprite from './MultiSprite';
import Scene from './Scene';
import Texture from './Texture';
import Raycaster from './Raycaster';
import RenderTarget from './RenderTarget';
import Ray from './math/Ray';
import Plane from './math/Plane';
import Box from './math/Box';
import Frustum from './math/Frustum';
import * as math from './math/Math';
import Line3 from './math/Line3';
import {vec3, mat3, vec2, mat4, quat, glMatrix} from 'gl-matrix';

// with Float32Array we have errors with raycast
glMatrix.ARRAY_TYPE = (typeof Float64Array !== 'undefined') ? Float64Array : Array;

const dgl = {
    enums,
    Renderer,
    Object3D,
    Buffer,
    Geometry,
    Mesh,
    Sprite,
    MultiSprite,
    ShaderProgram,
    BasicMeshMaterial,
    ComplexMeshMaterial,
    SpriteMaterial,
    MultiSpriteMaterial,
    Scene,
    Texture,
    Raycaster,
    RenderTarget,
    Ray,
    Plane,
    Frustum,
    Box,
    Line3,
    Math: math,
    vec3,
    mat3,
    vec2,
    mat4,
    quat
};

module.exports = dgl;
