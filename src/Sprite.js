import Object3D from './Object3D';
import Geometry from './Geometry';
import Buffer from './Buffer';
import {vec3, mat4} from 'gl-matrix';

export default class Sprite extends Object3D {
    constructor(program) {
        super();

        this.geometry = new Geometry();
        this.geometry
            .setBuffer('position', new Buffer([
                -0.5, -0.5, 0,
                0.5, -0.5, 0,
                0.5, 0.5, 0,

                -0.5, -0.5, 0,
                0.5, 0.5, 0,
                -0.5, 0.5, 0
            ], 3))
            .setBuffer('texture', new Buffer([
                0, 0,
                1, 0,
                1, 1,

                0, 0,
                1, 1,
                0, 1
            ], 2));

        this.program = program;
    }

    render(gl, scene, camera, renderTransparent) {
        if (!this.visible) { return; }

        if ((this.program.opacity === 1) === !renderTransparent) {
            this.program.enable(gl, scene, camera, this);

            gl.drawArrays(gl.TRIANGLES, 0, this.geometry.getBuffer('position').length);

            this.program.disable(gl);
        }

        this.childs.forEach(object => object.render(gl, scene, camera, renderTransparent));
    }

    raycast(raycaster, intersects) {}
}

