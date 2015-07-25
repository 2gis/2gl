import Renderer from './Renderer';
import Object3D from './Object3D';
import Camera from './Camera';
import Buffer from './Buffer';
import Geometry from './Geometry';
import Program from './programs/Program';
import Mesh from './Mesh';

let four = {
    Renderer: Renderer,
    Object3D: Object3D,
    Camera: Camera,
    Buffer: Buffer,
    Geometry: Geometry,
    Program: Program,
    Mesh: Mesh
};

window.four = four;
