import Renderer from './renderer/Renderer';
import Object3D from './Object3D';
import PerspectiveCamera from './cameras/PerspectiveCamera';
import OrthographicCamera from './cameras/OrthographicCamera';
import Buffer from './Buffer';
import Geometry from './Geometry';
import BasicMeshProgram from './programs/BasicMeshProgram';
import ComplexMeshProgram from './programs/ComplexMeshProgram';
import SpriteProgram from './programs/SpriteProgram';
import Mesh from './Mesh';
import Sprite from './Sprite';
import Scene from './Scene';
import Texture from './Texture';
import AmbientLight from './lights/AmbientLight';
import DirectionalLight from './lights/DirectionalLight';
import Raycaster from './Raycaster';
import Ray from './math/Ray';
import Plane from './math/Plane';
import Box from './math/Box';
import * as math from './math/Math';
import Line3 from './math/Line3';
import {vec3, mat3, mat4, quat, glMatrix} from 'gl-matrix';

glMatrix.ARRAY_TYPE = Float64Array;

let dgl = {
    Renderer,
    Object3D,
    PerspectiveCamera,
    OrthographicCamera,
    Buffer,
    Geometry,
    Mesh,
    Sprite,
    BasicMeshProgram,
    ComplexMeshProgram,
    SpriteProgram,
    Scene,
    Texture,
    AmbientLight,
    DirectionalLight,
    Raycaster,
    Ray,
    Plane,
    Box,
    Line3,
    Math: math,
    vec3,
    mat3,
    mat4,
    quat
};

module.exports = dgl;
