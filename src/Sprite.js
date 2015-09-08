import Object3D from './Object3D';
import Geometry from './Geometry';
import Renderer from './renderer/Renderer';
import Buffer from './Buffer';
import {vec2} from 'gl-matrix';

export default class Sprite extends Object3D {
    constructor(program) {
        super();

        this.program = program;
        this.offset = vec2.create();
    }

    render(state) {
        if (!this.visible) { return; }

        if (this.worldMatrixNeedsUpdate) {
            this.updateWorldMatrix();
        }

        if (state.typeRendering === Renderer.SpriteRendering) {
            let gl = state.gl;

            state.object = this;

            this.program.enable(state);

            gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

            this.program.disable(state.gl);
        }

        this.children.forEach(object => object.render(state));
    }

    raycast(raycaster, intersects) {}
}

