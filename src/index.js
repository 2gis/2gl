import Renderer from './Renderer';
import Object3D from './Object3D';
import PerspectiveCamera from './cameras/PerspectiveCamera';
import Buffer from './Buffer';
import Geometry from './Geometry';
import Program from './programs/Program';
import Mesh from './Mesh';
import Scene from './Scene';
import Texture from './Texture';
import AmbientLight from './lights/AmbientLight';
import DirectionalLight from './lights/DirectionalLight';
import Raycaster from './Raycaster';
import Ray from './math/Ray';
import Plane from './math/Plane';
import Box from './math/Box';

let dgl = {
    Renderer,
    Object3D,
    PerspectiveCamera,
    Buffer,
    Geometry,
    Program,
    Mesh,
    Scene,
    Texture,
    AmbientLight,
    DirectionalLight,
    Raycaster,
    Ray,
    Plane,
    Box
};

window.dgl = dgl;
