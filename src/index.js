import Renderer from './Renderer';
import Object3D from './Object3D';
import PerspectiveCamera from './cameras/PerspectiveCamera';
import OrthographicCamera from './cameras/OrthographicCamera';
import Buffer from './Buffer';
import Geometry from './Geometry';
import MeshProgram from './programs/MeshProgram';
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
    OrthographicCamera,
    Buffer,
    Geometry,
    MeshProgram,
    Scene,
    Texture,
    AmbientLight,
    DirectionalLight,
    Raycaster,
    Ray,
    Plane,
    Box
};

function expose() {
    var oldDgl = window.dgl;

    dgl.noConflict = function () {
        window.dgl = oldDgl;
        return this;
    };

    window.dgl = dgl;
}

if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = dgl;
} else if (typeof define === 'function' && define.amd) {
    define(dgl);
}

if (typeof window !== 'undefined') {
    expose();
}
