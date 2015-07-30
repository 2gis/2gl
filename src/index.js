import Renderer from './Renderer';
import Object3D from './Object3D';
import Camera from './Camera';
import Buffer from './Buffer';
import Geometry from './Geometry';
import Program from './programs/Program';
import Mesh from './Mesh';
import Scene from './Scene';
import Texture from './Texture';
import AmbientLight from './lights/AmbientLight';
import DirectionalLight from './lights/DirectionalLight';

let dgl = {
    Renderer,
    Object3D,
    Camera,
    Buffer,
    Geometry,
    Program,
    Mesh,
    Scene,
    Texture,
    AmbientLight,
    DirectionalLight
};

window.dgl = dgl;
