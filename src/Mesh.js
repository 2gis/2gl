import Object3D from './Object3D';
import {vec3, mat4} from 'gl-matrix';

/**
 * Используется для отрисовки 3D объектов. Каждому мешу необходимо задать программу и геометрию.
 *
 * @extends {Object3D}
 */
class Mesh extends Object3D {
    /**
     * @param {Geometry} geometry Геометрия меша
     * @param {Program} program Программа для отрисовки меша
     */
    constructor(geometry, program) {
        super();

        /**
         * Геометрия меша
         * @type {Geometry}
         */
        this.geometry = geometry;

        /**
         * Программа для отрисовки меша
         * @type {Program}
         */
        this.program = program;
    }

    render(state) {
        let gl = state.gl;

        if (!this.visible) { return this; }

        if (this.worldMatrixNeedsUpdate) {
            this.updateWorldMatrix();
        }

        state.object = this;
        this.program.enable(state);

        gl.drawArrays(gl.TRIANGLES, 0, this.geometry.getBuffer('position').length);

        this.program.disable(gl);

        return this;
    }

    raycast(raycaster, intersects) {
        let inverseMatrix = mat4.create();
        mat4.invert(inverseMatrix, this.worldMatrix);

        let ray = raycaster.ray.clone();
        ray.applyMatrix4(inverseMatrix);

        let boundingBox = this.geometry.getBoundingBox();

        if (!ray.intersectBox(boundingBox)) { return this; }

        let positionBuffer = this.geometry.buffers.position;

        for (let i = 0; i < positionBuffer.length; i += 3) {
            let triangle = positionBuffer.getTriangle(i / 3);

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

        return this;
    }

    /**
     * Вызывается на этапе рендеринга, чтобы определить к какому типу рендера принадлежит объект.
     * Меши разделяются на прозрачные и нет.
     *
     * @param {TypedObjects} typedObjects
     */
    typifyForRender(typedObjects) {
        if (!this.visible) { return this; }

        this.program.typifyForRender(typedObjects, this);

        this.children.forEach(child => child.typifyForRender(typedObjects));

        return this;
    }
}

export default Mesh;
