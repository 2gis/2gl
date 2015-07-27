import Renderer from './Renderer';
import Object3D from './Object3D';
import Camera from './Camera';
import Buffer from './Buffer';
import Geometry from './Geometry';
import Program from './programs/Program';
import Mesh from './Mesh';
import Texture from './Texture';

let four = {
    Renderer,
    Object3D,
    Camera,
    Buffer,
    Geometry,
    Program,
    Mesh,
    Texture
};

window.four = four;
