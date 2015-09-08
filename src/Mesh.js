import Object3D from './Object3D';
import Renderer from './Renderer';
import {vec3, mat4} from 'gl-matrix';

export default class Mesh extends Object3D {
    constructor(geometry, program) {
        super();

        this.geometry = geometry;
        this.program = program;
    }

    render(state) {
        let gl = state.gl;

        if (!this.visible) { return; }

        if (this.worldMatrixNeedsUpdate) {
            this.updateWorldMatrix();
        }

        if ((this.program.opacity === 1 && state.typeRendering === Renderer.CommonRendering) ||
            (this.program.opacity !== 1 && state.typeRendering === Renderer.TransparentRendering)
        ) {
            state.object = this;
            this.program.enable(state);

            gl.drawArrays(gl.TRIANGLES, 0, this.geometry.getBuffer('position').length);

            this.program.disable(gl);
        }

        this.children.forEach(object => object.render(state));
    }

    raycast(raycaster, intersects) {
        let inverseMatrix = mat4.create();
        mat4.invert(inverseMatrix, this.worldMatrix);

        let ray = raycaster.ray.clone();
        ray.applyMatrix4(inverseMatrix);

        let boundingBox = this.geometry.getBoundingBox();

        if (!ray.intersectBox(boundingBox)) { return; }

        let positionBuffer = this.geometry.buffers.position;

        for (let i = 0; i < positionBuffer.length; i += 3) {
            let triangle = positionBuffer.getTriangle(i);

            let intersectionPoint = ray.intersectTriangle(triangle, false);

            if (!intersectionPoint) { continue; }

            vec3.transformMat4(intersectionPoint, intersectionPoint, this.worldMatrix);

            let distance = vec3.dist(raycaster.ray.origin, intersectionPoint);

            if (distance < raycaster.precision || distance < raycaster.near || distance > raycaster.far) { continue; }

            intersects.push({
                distance: distance,
                point: intersectionPoint,
                object: this
            });
        }
    }
}

