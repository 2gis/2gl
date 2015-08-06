import Renderer from './Renderer';
import Object3D from './Object3D';
import PerspectiveCamera from './cameras/PerspectiveCamera';
import OrthographicCamera from './cameras/OrthographicCamera';
import Buffer from './Buffer';
import Geometry from './Geometry';
import MeshProgram from './programs/MeshProgram';
import Mesh from './Mesh';
import Scene from './Scene';
import Texture from './Texture';
import AmbientLight from './lights/AmbientLight';
import DirectionalLight from './lights/DirectionalLight';
import Raycaster from './Raycaster';
import Ray from './math/Ray';
import Plane from './math/Plane';
import Box from './math/Box';
import {vec3, mat3, mat4, glMatrix} from 'gl-matrix';

glMatrix.ARRAY_TYPE = Float64Array;

let dgl = {
    Renderer,
    Object3D,
    PerspectiveCamera,
    OrthographicCamera,
    Buffer,
    Geometry,
    Mesh,
    MeshProgram,
    Scene,
    Texture,
    AmbientLight,
    DirectionalLight,
    Raycaster,
    Ray,
    Plane,
    Box,
    vec3,
    mat3,
    mat4
};

module.exports = dgl;
