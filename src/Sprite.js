import Object3D from './Object3D';
import Geometry from './Geometry';
import Renderer from './Renderer';
import Buffer from './Buffer';

let geometry = new Geometry();
geometry
    .setBuffer('position', new Buffer(new Float32Array([
        -0.5, -0.5, 0,
        0.5, -0.5, 0,
        0.5, 0.5, 0,
        -0.5, 0.5, 0
    ]), 3))
    .setBuffer('texture', new Buffer(new Float32Array([
        0, 0,
        1, 0,
        1, 1,
        0, 1
    ]), 2))
    .setBuffer('index', new Buffer(new Uint16Array([
        1, 2, 0,
        3, 0, 2
    ]), 1));


let indexBuffer = geometry.getBuffer('index');
indexBuffer.type = Buffer.ElementArrayBuffer;

export default class Sprite extends Object3D {
    constructor(program) {
        super();

        this.program = program;

        // TODO: remove this.geometry from sprites
        this.geometry = geometry;
    }

    render(gl, scene, camera, state) {
        if (!this.visible) { return; }

        if (this.worldMatrixNeedsUpdate) {
            this.updateWorldMatrix();
        }

        if (state === Renderer.SpriteRendering) {
            this.program.enable(gl, scene, camera, this);

            indexBuffer.bind(gl);

            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

            this.program.disable(gl);
        }

        this.children.forEach(object => object.render(gl, scene, camera, state));
    }

    raycast(raycaster, intersects) {}
}

