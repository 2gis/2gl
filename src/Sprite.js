import Object3D from './Object3D';
import {vec2} from 'gl-matrix';

export default class Sprite extends Object3D {
    constructor(program) {
        super();

        this.program = program;
        this.offset = vec2.create();
    }

    render(state) {
        if (!this.visible) { return this; }

        if (this.worldMatrixNeedsUpdate) {
            this.updateWorldMatrix();
        }

        let gl = state.gl;

        state.object = this;

        this.program.enable(state);

        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);

        this.program.disable(state.gl);

        return this;
    }

    raycast(raycaster, intersects) {}

    typifyForRender(typedObjects) {
        if (!this.visible) { return this; }

        typedObjects.sprites.push(this);

        this.children.forEach(child => child.typifyForRender(typedObjects));

        return this;
    }
}

